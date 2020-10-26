"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Person = exports.GroupBuilder = exports.Group = exports.GroupPicker = exports.PeoplePicker = void 0;

var _taggedTemplateLiteral2 = _interopRequireDefault(require("@babel/runtime/helpers/taggedTemplateLiteral"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _escapeHtml = _interopRequireDefault(require("escape-html"));

var _uuid = _interopRequireDefault(require("uuid"));

var rdf = _interopRequireWildcard(require("rdflib"));

var debug = _interopRequireWildcard(require("../debug"));

var _dragAndDrop = require("./dragAndDrop");

var _error = require("./error");

var _iconBase = require("../iconBase");

var _ns = _interopRequireDefault(require("../ns"));

var _store = _interopRequireDefault(require("../store"));

function _templateObject() {
  var data = (0, _taggedTemplateLiteral2["default"])(["\n        To add someone to this group, drag and drop their WebID URL onto the box.\n      "]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

var PeoplePicker = /*#__PURE__*/function () {
  function PeoplePicker(element, typeIndex, groupPickedCb, options) {
    (0, _classCallCheck2["default"])(this, PeoplePicker);
    this.options = options || {};
    this.element = element;
    this.typeIndex = typeIndex;
    this.groupPickedCb = groupPickedCb;
    this.selectedgroup = this.options.selectedgroup; // current selected group if any

    this.onSelectGroup = this.onSelectGroup.bind(this);
  }

  (0, _createClass2["default"])(PeoplePicker, [{
    key: "render",
    value: function render() {
      var _this = this;

      var container = document.createElement('div');
      container.style.maxWidth = '350px';
      container.style.minHeight = '200px';
      container.style.outline = '1px solid black';
      container.style.display = 'flex';

      if (this.selectedgroup) {
        container.style.flexDirection = 'column';
        var selectedGroup = document.createElement('div');
        new Group(selectedGroup, this.selectedgroup).render();
        var changeGroupButton = document.createElement('button');
        changeGroupButton.textContent = (0, _escapeHtml["default"])('Change group');
        changeGroupButton.addEventListener('click', function (_event) {
          _this.selectedgroup = null;

          _this.render();
        });
        container.appendChild(selectedGroup);
        container.appendChild(changeGroupButton);
      } else {
        this.findAddressBook(this.typeIndex).then(function (_ref) {
          var book = _ref.book;
          var chooseExistingGroupButton = document.createElement('button');
          chooseExistingGroupButton.textContent = (0, _escapeHtml["default"])('Pick an existing group');
          chooseExistingGroupButton.style.margin = 'auto';
          chooseExistingGroupButton.addEventListener('click', function (_event) {
            new GroupPicker(container, book, _this.onSelectGroup).render();
          });
          var createNewGroupButton = document.createElement('button');
          createNewGroupButton.textContent = (0, _escapeHtml["default"])('Create a new group');
          createNewGroupButton.style.margin = 'auto';
          createNewGroupButton.addEventListener('click', function (_event) {
            _this.createNewGroup(book, _this.options.defaultNewGroupName).then(function (_ref2) {
              var group = _ref2.group;
              new GroupBuilder(_this.element, book, group, _this.onSelectGroup).render();
            })["catch"](function (errorBody) {
              _this.element.appendChild((0, _error.errorMessageBlock)(document, (0, _escapeHtml["default"])("Error creating a new group. (".concat(errorBody, ")"))));
            });
          });
          container.appendChild(chooseExistingGroupButton);
          container.appendChild(createNewGroupButton);
          _this.element.innerHTML = '';

          _this.element.appendChild(container);
        })["catch"](function (err) {
          _this.element.appendChild((0, _error.errorMessageBlock)(document, (0, _escapeHtml["default"])("Could find your groups. (".concat(err, ")"))));
        });
      }

      this.element.innerHTML = '';
      this.element.appendChild(container);
      return this;
    }
  }, {
    key: "findAddressBook",
    value: function findAddressBook(typeIndex) {
      return new Promise(function (resolve, reject) {
        _store["default"].fetcher.nowOrWhenFetched(typeIndex, function (ok, err) {
          if (!ok) {
            return reject(err);
          }

          var bookRegistration = _store["default"].any(null, _ns["default"].solid('forClass'), _ns["default"].vcard('AddressBook'));

          if (!bookRegistration) {
            return reject(new Error('no address book registered in the solid type index ' + typeIndex));
          }

          var book = _store["default"].any(bookRegistration, _ns["default"].solid('instance'));

          if (!book) {
            return reject(new Error('incomplete address book registration'));
          }

          _store["default"].fetcher.load(book).then(function (_xhr) {
            return resolve({
              book: book
            });
          })["catch"](function (err) {
            return reject(new Error('Could not load address book ' + err));
          });
        });
      });
    }
  }, {
    key: "createNewGroup",
    value: function createNewGroup(book, defaultNewGroupName) {
      var _indexes = indexes(book),
          groupIndex = _indexes.groupIndex,
          groupContainer = _indexes.groupContainer;

      var group = rdf.sym("".concat(groupContainer.uri).concat(_uuid["default"].v4().slice(0, 8), ".ttl#this"));
      var name = defaultNewGroupName || 'Untitled Group'; // NOTE that order matters here.  Unfortunately this type of update is
      // non-atomic in that solid requires us to send two PATCHes, either of which
      // might fail.

      var patchPromises = [group.doc(), groupIndex].map(function (doc) {
        var typeStatement = rdf.st(group, _ns["default"].rdf('type'), _ns["default"].vcard('Group'), doc);
        var nameStatement = rdf.st(group, _ns["default"].vcard('fn'), name, group.doc(), doc);
        var includesGroupStatement = rdf.st(book, _ns["default"].vcard('includesGroup'), group, doc);
        var toIns = doc.equals(groupIndex) ? [typeStatement, nameStatement, includesGroupStatement] : [typeStatement, nameStatement];
        return patch(doc.uri, {
          toIns: toIns
        }).then(function () {
          toIns.forEach(function (st) {
            _store["default"].add(st);
          });
        });
      });
      return Promise.all(patchPromises).then(function () {
        return {
          group: group
        };
      })["catch"](function (err) {
        debug.log('Could not create new group.  PATCH failed ' + err);
        throw new Error("Couldn't create new group.  PATCH failed for (".concat(err.xhr ? err.xhr.responseURL : '', " )"));
      });
    }
  }, {
    key: "onSelectGroup",
    value: function onSelectGroup(group) {
      this.selectedgroup = group;
      this.groupPickedCb(group);
      this.render();
    }
  }]);
  return PeoplePicker;
}();

exports.PeoplePicker = PeoplePicker;

var GroupPicker = /*#__PURE__*/function () {
  function GroupPicker(element, book, onSelectGroup) {
    (0, _classCallCheck2["default"])(this, GroupPicker);
    this.element = element;
    this.book = book;
    this.onSelectGroup = onSelectGroup;
  }

  (0, _createClass2["default"])(GroupPicker, [{
    key: "render",
    value: function render() {
      var _this2 = this;

      this.loadGroups().then(function (groups) {
        // render the groups
        var container = document.createElement('div');
        container.style.display = 'flex';
        container.style.flexDirection = 'column';
        groups.forEach(function (group) {
          var groupButton = document.createElement('button');
          groupButton.addEventListener('click', _this2.handleClickGroup(group));
          new Group(groupButton, group).render();
          container.appendChild(groupButton);
        });
        _this2.element.innerHTML = '';

        _this2.element.appendChild(container);
      })["catch"](function (err) {
        _this2.element.appendChild((0, _error.errorMessageBlock)(document, (0, _escapeHtml["default"])("There was an error loading your groups. (".concat(err, ")"))));
      });
      return this;
    }
  }, {
    key: "loadGroups",
    value: function loadGroups() {
      var _this3 = this;

      return new Promise(function (resolve, reject) {
        var _indexes2 = indexes(_this3.book),
            groupIndex = _indexes2.groupIndex;

        _store["default"].fetcher.nowOrWhenFetched(groupIndex, function (ok, err) {
          if (!ok) {
            return reject(err);
          }

          var groups = _store["default"].each(_this3.book, _ns["default"].vcard('includesGroup'));

          return resolve(groups);
        });
      });
    }
  }, {
    key: "handleClickGroup",
    value: function handleClickGroup(group) {
      var _this4 = this;

      return function (_event) {
        _this4.onSelectGroup(group);
      };
    }
  }]);
  return GroupPicker;
}();

exports.GroupPicker = GroupPicker;

var Group = /*#__PURE__*/function () {
  function Group(element, group) {
    (0, _classCallCheck2["default"])(this, Group);
    this.element = element;
    this.group = group;
  }

  (0, _createClass2["default"])(Group, [{
    key: "render",
    value: function render() {
      var container = document.createElement('div');
      container.textContent = (0, _escapeHtml["default"])( // @@@@@ need to escape??
      getWithDefault(this.group, _ns["default"].vcard('fn'), "[".concat(this.group.value, "]")));
      this.element.innerHTML = '';
      this.element.appendChild(container);
      return this;
    }
  }]);
  return Group;
}();

exports.Group = Group;

var GroupBuilder = /*#__PURE__*/function () {
  function GroupBuilder(element, book, group, doneBuildingCb, groupChangedCb) {
    (0, _classCallCheck2["default"])(this, GroupBuilder);
    this.element = element;
    this.book = book;
    this.group = group;

    this.onGroupChanged = function (err, changeType, agent) {
      if (groupChangedCb) {
        groupChangedCb(err, changeType, agent);
      }
    };

    this.groupChangedCb = groupChangedCb;
    this.doneBuildingCb = doneBuildingCb;
  }

  (0, _createClass2["default"])(GroupBuilder, [{
    key: "refresh",
    value: function refresh() {// TODO: implement
    }
  }, {
    key: "render",
    value: function render() {
      var _this5 = this;

      var dropContainer = document.createElement('div');
      dropContainer.style.maxWidth = '350px';
      dropContainer.style.minHeight = '200px';
      dropContainer.style.outline = '1px solid black';
      dropContainer.style.display = 'flex';
      dropContainer.style.flexDirection = 'column';
      (0, _dragAndDrop.makeDropTarget)(dropContainer, function (uris) {
        uris.map(function (uri) {
          _this5.add(uri)["catch"](function (err) {
            _this5.element.appendChild((0, _error.errorMessageBlock)(document, (0, _escapeHtml["default"])("Could not add the given WebId. (".concat(err, ")"))));
          });
        });
      });
      var groupNameInput = document.createElement('input');
      groupNameInput.type = 'text';
      groupNameInput.value = getWithDefault(this.group, _ns["default"].vcard('fn'), 'Untitled Group');
      groupNameInput.addEventListener('change', function (event) {
        _this5.setGroupName(event.target.value)["catch"](function (err) {
          _this5.element.appendChild((0, _error.errorMessageBlock)(document, "Error changing group name. (".concat(err, ")")));
        });
      });
      var groupNameLabel = document.createElement('label');
      groupNameLabel.textContent = (0, _escapeHtml["default"])('Group Name:');
      groupNameLabel.appendChild(groupNameInput);
      dropContainer.appendChild(groupNameLabel);

      if (_store["default"].any(this.group, _ns["default"].vcard('hasMember'))) {
        _store["default"].match(this.group, _ns["default"].vcard('hasMember')).forEach(function (statement) {
          var webIdNode = statement.object;
          var personDiv = document.createElement('div');
          new Person(personDiv, webIdNode, _this5.handleRemove(webIdNode)).render();
          dropContainer.appendChild(personDiv);
        });
      } else {
        var copy = document.createElement('p');
        copy.textContent = (0, _escapeHtml["default"])(_templateObject());
        dropContainer.appendChild(copy);
      }

      var doneBuildingButton = document.createElement('button');
      doneBuildingButton.textContent = (0, _escapeHtml["default"])('Done');
      doneBuildingButton.addEventListener('click', function (_event) {
        _this5.doneBuildingCb(_this5.group);
      });
      dropContainer.appendChild(doneBuildingButton);
      this.element.innerHTML = '';
      this.element.appendChild(dropContainer);
      return this;
    }
  }, {
    key: "add",
    value: function add(webId) {
      var _this6 = this;

      return new Promise(function (resolve, reject) {
        _store["default"].fetcher.nowOrWhenFetched(webId, function (ok, err) {
          if (!ok) {
            _this6.onGroupChanged(err);

            return reject(err);
          } // make sure it's a valid person, group, or entity (for now just handle
          // webId)


          var webIdNode = rdf.namedNode(webId);

          var rdfClass = _store["default"].any(webIdNode, _ns["default"].rdf('type'));

          if (!rdfClass || !rdfClass.equals(_ns["default"].foaf('Person'))) {
            return reject(new Error("Only people supported right now. (tried to add something of type ".concat(rdfClass.value, ")")));
          }

          return resolve(webIdNode);
        });
      }).then(function (webIdNode) {
        var statement = rdf.st(_this6.group, _ns["default"].vcard('hasMember'), webIdNode);

        if (_store["default"].holdsStatement(statement)) {
          return webIdNode;
        }

        return patch(_this6.group.doc().uri, {
          toIns: [statement]
        }).then(function () {
          statement.why = _this6.group.doc();

          _store["default"].add(statement);

          _this6.onGroupChanged(null, 'added', webIdNode);

          _this6.render();
        });
      });
    }
  }, {
    key: "handleRemove",
    value: function handleRemove(webIdNode) {
      var _this7 = this;

      return function (_event) {
        var statement = rdf.st(_this7.group, _ns["default"].vcard('hasMember'), webIdNode);
        return patch(_this7.group.doc().uri, {
          toDel: [statement]
        }).then(function () {
          _store["default"].remove(statement);

          _this7.onGroupChanged(null, 'removed', webIdNode);

          _this7.render();

          return true;
        })["catch"](function (err) {
          var name = _store["default"].any(webIdNode, _ns["default"].foaf('name'));

          var errorMessage = name && name.value ? "Could not remove ".concat(name.value, ". (").concat(err, ")") : "Could not remove ".concat(webIdNode.value, ". (").concat(err, ")");
          throw new Error(errorMessage);
        });
      };
    }
  }, {
    key: "setGroupName",
    value: function setGroupName(name) {
      var _this8 = this;

      var _indexes3 = indexes(this.book),
          groupIndex = _indexes3.groupIndex;

      var updatePromises = [this.group.doc(), groupIndex].map(function (namedGraph) {
        var oldNameStatements = _store["default"].match(_this8.group, _ns["default"].vcard('fn'), null, namedGraph);

        var newNameStatement = rdf.st(_this8.group, _ns["default"].vcard('fn'), rdf.literal(name));
        return patch(namedGraph.value, {
          toDel: oldNameStatements,
          toIns: [newNameStatement]
        }).then(function (_solidResponse) {
          _store["default"].removeStatements(oldNameStatements);

          newNameStatement.why = namedGraph;

          _store["default"].add(newNameStatement);
        });
      });
      return Promise.all(updatePromises);
    }
  }]);
  return GroupBuilder;
}(); // @ignore exporting this only for the unit test
// @@ TODO maybe I should move this down at end, but for
// now I will leave it where it was


exports.GroupBuilder = GroupBuilder;

var Person = /*#__PURE__*/function () {
  function Person(element, webIdNode, handleRemove) {
    (0, _classCallCheck2["default"])(this, Person);
    this.webIdNode = webIdNode;
    this.element = element;
    this.handleRemove = handleRemove;
  }

  (0, _createClass2["default"])(Person, [{
    key: "render",
    value: function render() {
      var _this9 = this;

      var container = document.createElement('div');
      container.style.display = 'flex'; // TODO: take a look at UI.widgets.setName

      var imgSrc = getWithDefault(this.webIdNode, _ns["default"].foaf('img'), _iconBase.iconBase + 'noun_15059.svg');
      var profileImg = document.createElement('img');
      profileImg.src = (0, _escapeHtml["default"])(imgSrc);
      profileImg.width = '50';
      profileImg.height = '50';
      profileImg.style.margin = '5px'; // TODO: take a look at UI.widgets.setImage

      var name = getWithDefault(this.webIdNode, _ns["default"].foaf('name'), "[".concat(this.webIdNode, "]"));
      var nameSpan = document.createElement('span');
      nameSpan.innerHTML = (0, _escapeHtml["default"])(name);
      nameSpan.style.flexGrow = '1';
      nameSpan.style.margin = 'auto 0';
      var removeButton = document.createElement('button');
      removeButton.textContent = 'Remove';
      removeButton.addEventListener('click', function (_event) {
        return _this9.handleRemove()["catch"](function (err) {
          _this9.element.appendChild((0, _error.errorMessageBlock)(document, (0, _escapeHtml["default"])("".concat(err))));
        });
      });
      removeButton.style.margin = '5px';
      container.appendChild(profileImg);
      container.appendChild(nameSpan);
      container.appendChild(removeButton);
      this.element.innerHTML = '';
      this.element.appendChild(container);
      return this;
    }
  }]);
  return Person;
}();

exports.Person = Person;

function getWithDefault(subject, predicate, defaultValue) {
  var object = _store["default"].any(subject, predicate);

  return object ? object.value : defaultValue;
}

function patch(url, _ref3) {
  var toDel = _ref3.toDel,
      toIns = _ref3.toIns;
  return new Promise(function (resolve, reject) {
    _store["default"].updater.update(toDel, toIns, function (uri, success, errorMessage) {
      if (!success) {
        return reject(new Error("PATCH failed for resource <".concat(uri, ">: ").concat(errorMessage)));
      }

      resolve();
    });
  }); // return webClient.patch(url, toDel, toIns)
  //   .then(solidResponse => {
  //     const status = solidResponse.xhr.status
  //     if (status < 200 || status >= 400) {
  //       const err = new Error(`PATCH failed for resource <${solidResponse.url}>`)
  //       err.solidResponse = solidResponse
  //       throw err
  //     }
  //   })
}

function indexes(book) {
  return {
    // bookIndex: book,
    groupIndex: _store["default"].any(book, _ns["default"].vcard('groupIndex')),
    groupContainer: _store["default"].sym(book.dir().uri + 'Group/')
  };
}
//# sourceMappingURL=peoplePicker.js.map