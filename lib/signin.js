//  signin.js     Signing in, signing up, workspace selection, app spawning
//

try {
    var Solid = require('solid.js');
} catch (e) {
   var Solid = require('solid');
}

tabulator.panes.utils.clearElement = function(ele) {
    while (ele.firstChild) {
        ele.removeChild(ele.firstChild);
    }
    return ele;
};


// Look for and load the User who has control over it
tabulator.panes.utils.findOriginOwner = function(doc, callback) {
    var uri = doc.uri || doc;
    var i = uri.indexOf('://');
    if (i<0) return false;
    var j = uri.indexOf('/', i+3);
    if (j <0) return false;
    var orgin = uri.slice(0, j+1); // @@ TBC

}

// Note for a PUT which will not overwrite existing file
// A la  https://tools.ietf.org/html/rfc7232#section-3.2
// Use header   If-None-Match: *

tabulator.panes.utils.webOperation = function(method, uri, options, callback) {
    var xhr = $rdf.Util.XMLHTTPFactory();
    xhr.onreadystatechange = function (){
        if (xhr.readyState == 4){
            var ok = (!xhr.status || (xhr.status >= 200 && xhr.status < 300));
            // @@@ Optionally  options.saveMetadata Save metadata to preseve headers
            callback(uri, ok, xhr.responseText, xhr);
        }
    };
    xhr.open(method, uri, true);
    if (options.contentType) {
        xhr.setRequestHeader('Content-type', options.contentType);
    }
    xhr.send(options.data ? options.data : undefined);
};

tabulator.panes.utils.webCopy = function(here, there, content_type, callback) {
    tabulator.panes.utils.webOperation('GET', here,  {}, function(uri, ok, body, xhr) {
        if (ok) {
            tabulator.panes.utils.webOperation('PUT',
                there, { data: xhr.responseText, contentType: content_type},
                callback);
        } else {
            callback(uri, ok, "(on read) " + body, xhr);
        }
    });
};

tabulator.panes.utils.complain = function(context, err) {
    var ele = context.statusArea || context.div;
    console.log('Complaint: ' + err)
    return ele.appendChild(tabulator.panes.utils.errorMessageBlock(context.dom, err));
}

// Promises versions
//
// These pass a context object which hold various RDF symbols
// as they becaome availale
//
//  me               RDF symbol for the users' webid
//  publicProfile    The user's public pofile, iff loaded
//  preferencesFile  The user's personal preferences file, iff loaded
//  index.public     The user's public type index file
//  index.private     The user's private type index file
//   not RDF symbols:
//  noun              A string in english for the tpe of thing -- like "address book"
//  instance          An array of nodes which are existing instances
//  containers        An array of nodes of containers of instances
//  div               A DOM element where UI can be displayed
//  statusArea        A DOM element (opt) proogress stuff can be displayed, or error messages



tabulator.panes.utils.logInLoadProfile = function(context){
    if (context.publicProfile) return Promise.resolve(context); // already done
    var box = context.div;
    var uri = tabulator.preferences.get('me');
    context.me =  uri ? $rdf.sym(uri) : null;

    return new Promise(function(resolve, reject){
        var gotIDChange = function(me) {
            if (!me) return;
            context.me = me;
            tabulator.preferences.set('me', me.uri)
            tabulator.sf.nowOrWhenFetched(me.doc(), undefined, function(ok, body){
                if (!ok) {
                    var message = "Can't load profile file " + me.doc() + ": " + body;
                    box.appendChild(tabulator.panes.utils.errorMessageBlock(context.dom, message));
                    reject(message);
                } else {
                    context.publicProfile = me.doc();
                    resolve(context)
                }
            });
        };
        box = tabulator.panes.utils.loginStatusBox(context.dom, gotIDChange);
        context.div.appendChild(box);
        if (context.me){
            gotIDChange(context.me); // trigger continuation if already set
        }
    });
}

// Load preferences file
//
// Do this after having done log in and load profile

tabulator.panes.utils.loadPreferences = function(context) {
    if (context.preferencesFile) return Promise.resolve(context); // already done
    var kb = tabulator.kb;
    var preferencesFile = kb.any(context.me, tabulator.ns.space('preferencesFile'));
    var box = context.statusArea || context.div || null;
    return new Promise(function(resolve, reject) {

        var message;
        if (!preferencesFile) {
            message = "Can't find a preferences file for user: " + context.me;
            tabulator.panes.utils.errorMessageBlock(context.dom, message);
            reject(message);
        }
        context.preferencesFile = preferencesFile;
        var pending;
        if (box) {
            pending = tabulator.panes.utils.errorMessageBlock(context.dom,
                "(loading preferences " + preferencesFile+ ")");
            box.appendChild(pending);
        }
        kb.fetcher.load(preferencesFile).then(function(xhr){
            if (pending) {
                pending.parentNode.removeChild(pending);
            }
            resolve(context);
        }).catch(function(err){
            reject("Error loading preferences file" + err)
        });
    });
};


// See https://github.com/solid/solid/blob/master/proposals/data-discovery.md#discoverability
// Returns a promose the same context, outputting
//
// output: index.public, index.public
//
//
tabulator.panes.utils.loadTypeIndexes = function(context) {
    return new Promise(function(resolve, reject){
        var kb = tabulator.kb, tns = tabulator.ns, me = context.me;
        return tabulator.panes.utils.logInLoadProfile(context)
        .then(tabulator.panes.utils.loadPreferences)
        .then(function(context){
            var ns = tabulator.ns, kb = tabulator.kb, me = context.me;
            context.index = context.index || {}
            context.index.private = kb.each(me, ns.solid('privateTypeIndex'), undefined, context.preferencesFile);
            context.index.public = kb.each(me, ns.solid('publicTypeIndex'), undefined, context.publicProfile);
            var ix = context.index.private.concat(context.index.public);
            if (ix.length === 0) {
                resolve(context);
            } else {
                tabulator.fetcher.load(ix).then(function(xhrs){
                    resolve(context);
                }).catch(function(e){reject(e)});
            }
        }).catch(function(e){
            tabulator.panes.utils.complain(context, e);
            reject("Error loading type indexes: " + e)
        })
    });
}

// See https://github.com/solid/solid/blob/master/proposals/data-discovery.md#discoverability
// Returns a promose the same context, outputting
//
// input: index.private
//         index.public
//
tabulator.panes.utils.ensureTypeIndexes = function(context) {
    return new Promise(function(resolve, reject){
        var kb = tabulator.kb, tns = tabulator.ns, me = context.me;
        return tabulator.panes.utils.loadTypeIndexes(context)
        .then(function(context){
            var ns = tabulator.ns, kb = tabulator.kb, me = context.me;
            var newIndex;

            var makeIndex = function(visibility) {
                var relevant = {'private': context.preferencesFile, 'public': context.publicProfile}[visibility];
                if (context.index[visibility].length == 0) {
                    newIndex = $rdf.sym(context.preferencesFile.dir().uri + '/' + visibility + 'TypeIndex.ttl');
                    console.log("Creating new fresh type index " + newIndex)
                    return kb.fetcher.webOperation('PUT', newIndex, {data: '# Type index'})
                        .then(function(xhr){
                            return new Promise(function(resolve, reject) {
                                var ins = [$rdf.st(context.me, ns.solid(visibility + 'TypeIndex'), newIndex, relevant)];
                                tabulator.updater.update([], ins, function(uri, ok, body){
                                    if (ok) {
                                        context.index[visibility].push(newIndex);
                                        resolve(context);
                                    } else {
                                        reject("Adding link to new index file in " + relevant);
                                    }
                                })
                            });
                        })
                        .catch(function(e){reject("Creating new index file " + e)})
                } else {
                    return Promise.resolve(context.index[visibility][0]); // exists
                }
            }
            var ps = [ makeIndex('private'), makeIndex('public')];
            Promise.all(ps).then(function(privPub){
                resolve(context)
            });
        })
    });
}

// Returns promise of array of symbols
//
tabulator.panes.utils.findAppInstances = function(context, klass) {
    return new Promise(function(resolve, reject){
        var kb = tabulator.kb, ns = tabulator.ns, me = context.me, fetcher = tabulator.fetcher;
        tabulator.panes.utils.loadTypeIndexes(context)
        .then(function(indexes){
            var ix = context.index.private.concat(context.index.public);
            var instances = kb.each(klass, ns.solid('instance'));
            var containers = kb.each(klass, ns.solid('instanceContainer'));
            if (containers.length) {
                fetcher.load(containers).then(function(xhrs){
                    for (var i=0; i<containers.length; i++) {
                        var cont = containers[i];
                        instances = instances.concat(kb.each(cont, ns.ldp('contains')));
                    }
                });
            }
            context.instances = instances;
            context.containers = containers
            resolve(context);
        }).catch(function(e){
            reject("Error looking for instances of " + klass + ": " + e)
        })
    })
}

//  UI to control registratin of instance
//

tabulator.panes.utils.registrationControl = function(context, instance, klass) {
    return new Promise(function(resolve, reject){
        var kb = tabulator.kb, ns = tabulator.ns, me = context.me, fetcher = tabulator.fetcher;

        var box = context.dom.createElement('div');
        context.div.appendChild(box);
        return tabulator.panes.utils.ensureTypeIndexes(context)
            .then(function(indexes){
                box.innerHTML = '<table><tbody><tr></tr><tr></tr></tbody></table>'; // tbody will be inserted anyway
                box.setAttribute('style', 'font-size: 120%; text-align: right; padding: 1em; border: solid gray 0.05em;')
                var tbody = box.children[0].children[0];
                var form = kb.bnode();// @@ say for now

                if (context.index.public && context.index.public.length >0) {
                    var index = context.index.public[0];
                    var statement = $rdf.st(klass, ns.solid('instance'), instance, index);
                    tbody.children[0].appendChild(tabulator.panes.utils.buildCheckboxForm(
                        context.dom, tabulator.kb, "Public link to this " + context.noun, null, statement, form, index));
                }

                if (context.index.private && context.index.private.length >0) {
                    var index = context.index.private[0];
                    var statement = $rdf.st(klass, ns.solid('instance'), instance, index);
                    tbody.children[1].appendChild(tabulator.panes.utils.buildCheckboxForm(
                        context.dom, tabulator.kb, "Personal note of this " + context.noun, null, statement, form, index));
                }
                // tabulator.panes.utils.buildCheckboxForm(dom, kb, lab, del, ins, form, store)
                resolve(box);
            }).catch(function(e){reject(e)});
    })
}





//////////////////////// Simple Accesss Control

// This function sets up a simple default ACL for a resoirce, with
// RWC for the owner, and a specified access (default none) for the public.
// In all cases owner has read write control.
// Parameter lists modes allowed to public
// Parameters:
//  me webid of user
//  public = eg [ 'Read', 'Write']

tabulator.panes.utils.setACLUserPublic = function(docURI, me, options, callback) {
    var genACLtext = function(docURI, aclURI, options) {
        options = options || {}
        var public = options.public || [];
        var g = $rdf.graph(), auth = $rdf.Namespace('http://www.w3.org/ns/auth/acl#');
        var a = g.sym(aclURI + '#a1'), acl = g.sym(aclURI), doc = g.sym(docURI);
        g.add(a, tabulator.ns.rdf('type'), auth('Authorization'), acl);
        g.add(a, auth('accessTo'), doc, acl)
        if (options.defaultForNew) {
            g.add(a, auth('defaultForNew'), doc, acl)
        }
        g.add(a, auth('agent'), me, acl);
        g.add(a, auth('mode'), auth('Read'), acl);
        g.add(a, auth('mode'), auth('Write'), acl);
        g.add(a, auth('mode'), auth('Control'), acl);

        if (public.length) {
            a = g.sym(aclURI + '#a2');
            g.add(a, tabulator.ns.rdf('type'), auth('Authorization'), acl);
            g.add(a, auth('accessTo'), doc, acl)
            g.add(a, auth('agentClass'), ns.foaf('Agent'), acl);
            for (var p=0; p<public.length; p++) {
                g.add(a, auth('mode'), auth(public[p]), acl); // Like 'Read' etc
            }
        }
        return $rdf.serialize(acl, g, aclURI, 'text/turtle');
    }
    var kb = tabulator.kb;
    var aclDoc = kb.any(kb.sym(docURI),
        kb.sym('http://www.iana.org/assignments/link-relations/acl')); // @@ check that this get set by web.js
    if (aclDoc) { // Great we already know where it is
        var aclText = genACLtext(docURI, aclDoc.uri, options);
        tabulator.panes.utils.webOperation('PUT', aclDoc.uri, { data: aclText, contentType: 'text/turtle'}, callback);
    } else {

        kb.fetcher.nowOrWhenFetched(docURI, undefined, function(ok, body){
            if (!ok) return callback(ok, "Gettting headers for ACL: " + body);
            var aclDoc = kb.any(kb.sym(docURI),
                kb.sym('http://www.iana.org/assignments/link-relations/acl')); // @@ check that this get set by web.js
            if (!aclDoc) {
                // complainIfBad(false, "No Link rel=ACL header for " + docURI);
                callback(false, "No Link rel=ACL header for " + docURI);
            } else {
                var aclText = genACLtext(docURI, aclDoc.uri, options);
                tabulator.panes.utils.webOperation('PUT', aclDoc.uri, { data: aclText, contentType: 'text/turtle'}, callback);
            }
        })
    }
};


tabulator.panes.utils.offlineTestID = function() {

    if (tabulator.mode == 'webapp' && typeof document !== 'undefined' &&
        document.location &&  ('' + document.location).slice(0,16) === 'http://localhost') {
        var div = document.getElementById('appTarget');
        if (!div) return null
        var id = div.getAttribute('testID');
        if (!id) return null;
        /* me = kb.any(subject, tabulator.ns.acl('owner')); // when testing on plane with no webid
        */
        console.log("Assuming user is " + id);
        return $rdf.sym(id)
    }
    return null;
};


////////////////////////////////////////// Boostrapping identity
//
//

tabulator.panes.utils.signInOrSignUpBox = function(myDocument, gotOne) {
    var box = myDocument.createElement('div');
    var p = myDocument.createElement('p');
    box.appendChild(p);
    box.className="mildNotice";
    p.innerHTML = ("You need to log in with a Web ID");
    console.log('tabulator.panes.utils.signInOrSignUpBox')


    var but = myDocument.createElement('input');
    box.appendChild(but);
    but.setAttribute('type', 'button');
    but.setAttribute('value', 'Log in');
    but.setAttribute('style', 'padding: 1em; border-radius:0.5em; margin: 2em;')
        but.addEventListener('click', function(e){
        var offline = tabulator.panes.utils.offlineTestID();
        if (offline) return gotOne(offline);
	Solid.auth.login().then(function(uri){
	    console.log('signInOrSignUpBox logged in up '+ uri)
	    gotOne($rdf.sym(uri))
	})
    }, false);

    var but2 = myDocument.createElement('input');
    box.appendChild(but2);
    but2.setAttribute('type', 'button');
    but2.setAttribute('value', 'Sign Up');
    but2.setAttribute('style', 'padding: 1em; border-radius:0.5em; margin: 2em;')
    but2.addEventListener('click', function(e){
	Solid.auth.signup().then(function(uri){
	    console.log('signInOrSignUpBox signed up '+ uri)
	    gotOne($rdf.sym(uri))
	})
    }, false);
    return box;
};

tabulator.panes.utils.signInOrSignUpBox_original = function(myDocument, gotOne) {
    var box = myDocument.createElement('div');
    var p = myDocument.createElement('p');
    box.appendChild(p);
    box.className="mildNotice";
    p.innerHTML = ("Tip:  Do you have <a target='explain' href='http://esw.w3.org/topic/WebID'>" +
        "web ID</a>?<br/><i>  ");
    var but = myDocument.createElement('input');
    box.appendChild(but);
    but.setAttribute('type', 'button');
    but.setAttribute('value', 'Log in or Sign Up');
    var makeOne = function() {
        box.removeChild(box.firstChild); // Tip has been taken up!
        box.removeChild(but); // Button has been pressed now now appropriate (unless cancel)
        var foo = myDocument.createElement('div');
        //main.insertBefore(foo, main.firstChild);
        box.insertBefore(foo, box.firstChild);
        // This is an encoded verion of webid.html
        foo.innerHTML = "\
<div class='task'>\
<p>Do you have <a target=\"explain\" href=\"http://esw.w3.org/topic/WebID\" >\
web ID</a>?<br/>\
</p>\
<ul>\
    <li>\
        <p class=\"answer\"  onclick=\"document.getElementById('WebIdHelp').className='tip'\">\
        What is A Web ID?</p>\
        <div id=\"WebIdHelp\" class=\"unknown\">\
            <p>    A Web ID is a URL for you. \
            It allows you to set up a public profile, with friends, pictures and all kinds of things.\
            </p><p>\
            It works like having an account on a social networking site,\
            but it isn't restricted to just that site.\
            It is very open because the information can connect to other people,\
            organizations and projects and so on, without everyon having to join the same\
            social networking site.\
            All you need is some place on the web where you can save a file to.\
            (<a  target='explain' href=\"http://esw.w3.org/topic/WebID\">More on the wiki</a>) \
            <span onclick=\"document.getElementById('WebIdHelp').className='unknown'\">(close)</span>\
            </p>\
        </div>\
    </li>\
    <li class=\"answer\" onclick=\"document.getElementById('WhetherWebId').className='yes'\">\
    Yes, I have a web ID\
    </li>\
    <li class=\"answer\" onclick=\"document.getElementById('WhetherWebId').className='no'\">\
    No, I would like to make one\
    </li>\
</ul>\
<div id=\"WhetherWebId\" class=\"unknown\">\
    <div class=\"affirmative\">\
        <p>What is your Web ID?</p>\
        <p>\
            <input id='webidField' name=\"webid\" type=\"text\" style='width:100%' value=\"\"/>\
            <br/>\
            <input id='gotOneButton' type=\"button\" value=\"Use this ID\"/>\
        </p>\
    </div>\
    <div class=\"negative\">\
        <p>Ok, Let's make one.  Would you like to use your real name, or make it anonymous?</p>\
        <ul>\
            <li class=\"answer\" onclick=\"document.getElementById('WhetherAnon').className='no'\">\
            I would like to use my real name. (Recommended, for example, for professionals who have\
            and want public visibility).\
            </li>\
            <li class=\"answer\" onclick=\"document.getElementById('WhetherAnon').className='yes'\">\
            I would like to be anonymous. (If you are a child, use this.) \
            </li>\
        </ul>\
\
        <div id=\"WhetherAnon\" class=\"unknown\">\
            <div class=\"affirmative\">\
                <p>Think of a nick name, handle, or screen name by which you would like to be known.\
                Or one by which you are already known online.\
                    <br/>\
                    <input name=\"nick\" type=\"text\" size=\"40\" id=\"nick_input\"/>\
                </p>\
            </div>\
            <div class=\"negative\">\
                <p>What is your name?  (A full name in the normal order in which you prefer it,\
                such as Bill Gates, or Marie-Claire Forgue. Normally people omit \
                prefixes, like Dr., and suffixes, like PhD, but it is up to you.)\
                <br/><input name=\"foafname\" type=\"text\" size=\"40\" id=\"foafname_input\"/>\
                </p>\
                <p>Your initials? (These will be used as part of your web ID)\
                <br/><input name=\"initials\" type=\"text\" size=\"10\" id=\"initials_input\"/>\
                </p>\
            </div>\
            <p>You need the URI of a file which you can write to on the web.\
            (The general public should be able to read it but not change it.\
            The server should support the <em>WebDAV</em> protocol.)<br/>\
            It will typcially look something like:<br/>\
            http://www.example.com/users/gates/foaf.rdf<br/><br/>\
                 <input name=\"fileuri\" type=\"text\" size=\"80\" id=\"fileuri_input\"\
                     value=\"http://your.isp.com/...something.../foaf.nt\"\
                     />\
            <br/>\
            <input id=\"tryFoafButton\" type=\"button\" value=\"Create my new profile\" onclickOFF =\"tryFoaf()\"/>\
            </p>\
        </div>\
\
    </div>\
    <div id=\"saveStatus\" class=\"unknown\">\
    </div>\
</div>\
</div>\
";
        var button = myDocument.getElementById('tryFoafButton');
        button.addEventListener('click', function(){ return tryFoaf()}, false);
        button = myDocument.getElementById('gotOneButton');
        button.addEventListener('click', function(){
            var webid1 = myDocument.getElementById('webidField').value; // @@@
            tabulator.preferences.set('me', webid1);
            return gotOne($rdf.sym(webid1));
        }, false);
    }
    but.addEventListener('click', makeOne, false);
    return box;
};

//  Check user and set 'me' if found

tabulator.panes.utils.checkUserSetMe = function(doc) {
    return tabulator.panes.utils.checkUser(doc, function(uri) {
        var me_uri = tabulator.preferences.get('me');
        if (uri == me_uri) return null;
        var message;
        if (!uri) {
            // message = "(Log in by auth with no URI - ignored)";
            return;
            // This may be happen a http://localhost/ test enviroment
        } else {
            tabulator.preferences.set('me', uri);
            message = "(Logged in as " + uri + " by authentication.)";
        };
        try {  // Ugh
            tabulator.log.alert(message);
        } catch(e) {
            try {
                alert(message);
            } catch (e) {
            };
        }
    });
};

// For a user authenticated using webid (or possibly other methods) it
// is not immedaietly available to the client which person(a) it is.
// The solid standard way is for the server to send the information back as a User: header.

tabulator.panes.utils.userCheckSite = 'https://databox.me/';

tabulator.panes.utils.checkUser = function(doc, setIt) {
    var userMirror = tabulator.kb.any(doc, tabulator.ns.link('userMirror'));
    if (!userMirror) userMirror = doc;
    var kb = tabulator.kb
    kb.fetcher.nowOrWhenFetched(userMirror.uri, undefined, function(ok, body) {
        var done = false;
        if (ok) {
            kb.each(undefined, tabulator.ns.link('requestedURI'), $rdf.uri.docpart(userMirror.uri))
            .map(function(request){

                var response = kb.any(request, tabulator.ns.link('response'));
                if (response !== undefined) {
        		    var userHeaders = kb.each(response, tabulator.ns.httph('user'));
        		    if (userHeaders.length === 0) {
        			console.log("CheckUser: non-solid server: trying "
        			    + tabulator.panes.utils.userCheckSite);
        			tabulator.panes.utils.checkUser(
        			    kb.sym(tabulator.panes.utils.userCheckSite), setIt)
        		    } else {
        			userHeaders.map(function(userHeader){
        			    var username = userHeader.value.trim();
        			    if (username.slice(0,4) !== 'dns:') { // dns: are pseudo-usernames from rww.io and don't count
        				setIt(username);
        				done = true;
			    }
			});
		    }
                }
            });
        } else {
            var message = "checkUser: Unable to load " + userMirror.uri + ": " + body;
            try {  // Ugh
                console.log(message);
                tabulator.log.alert(message);
            } catch(e) {
                try {
                    alert(message);
                } catch (e) {
                };
            }
        }
    });
};

// What ID does the user use to log into the given target?
tabulator.panes.utils.checkUserForTarget = function(context) {
    return new Promise(function(resolve, reject){
        var kb = tabulator.kb
        kb.fetcher.load(conext.target).then(function(xhr) {
            kb.each(undefined, tabulator.ns.link('requestedURI'), $rdf.uri.docpart(userMirror.uri))
            .map(function(request){
                var response = kb.any(request, tabulator.ns.link('response'));
                if (response) {
                    var userHeaders = kb.each(response, tabulator.ns.httph('user'));
                    if (userHeaders.length === 0) {
                    console.log("CheckUser: non-solid server: trying "
                        + tabulator.panes.utils.userCheckSite);
                    tabulator.panes.utils.checkUser(
                        kb.sym(tabulator.panes.utils.userCheckSite), setIt)
                    } else {
                        userHeaders.map(function(userHeader){
                            var username = userHeader.value.trim();
                            if (username.slice(0,4) !== 'dns:') { // dns: are pseudo-usernames from rww.io and don't count
                            context.me = $rdf.sym(username);
                            tabulator.preferences.set('me', username);
                            resolve(context)
                            }
                        });
                    }
                }
                resolve(context);
            });
        }).catch(e)(function(e){reject(e)});
    });
}


//              Login status box
//
//   Shows
tabulator.panes.utils.loginStatusBox = function(myDocument, listener) {
    var me_uri = tabulator.preferences.get('me');
    var me = me_uri && tabulator.kb.sym(me_uri);

    var box = myDocument.createElement('div');

    var logoutButton = function(me) {
        var logoutLabel = 'Web ID logout';
        if (me) {
            var nick = tabulator.kb.any(me, tabulator.ns.foaf('nick')) ||
                tabulator.kb.any(me, tabulator.ns.foaf('name'));
            if (nick) {
                logoutLabel = 'Logout ' + nick.value;
            };
        };
        var signOutButton = myDocument.createElement('input');
        signOutButton.className = 'WebIDCancelButton';
        signOutButton.setAttribute('type', 'button');
        signOutButton.setAttribute('value', logoutLabel);
        signOutButton.addEventListener('click', zapIt, false);
        return signOutButton;
    };

    var setIt = function(newid) {
        tabulator.preferences.set('me',newid);
        me_uri = newid;
        me = me_uri && tabulator.kb.sym(me_uri)
        var message = 'Your Web ID is now ' + me +' .';
        try {
            tabulator.log.alert(message);
        } catch(e) {
            try {
                alert(message);
            } catch (e) {
            };
        }
        box.refresh();
        if (listener) listener(newid);
    };

    var sisu = tabulator.panes.utils.signInOrSignUpBox(myDocument, setIt);

    var zapIt = function() {
        tabulator.preferences.set('me','');
        var message = 'Your Web ID was ' + me + '. It has been forgotten.';
        me_uri = '';
        me = null
        try {
            tabulator.log.alert(message);
        } catch(e) {
            try {
                alert(message);
            } catch (e) {
            };
        }
        box.refresh();
        if (listener) listener(undefined);
    }

    box.refresh = function() {
        var me_uri = tabulator.preferences.get('me') || '';
        var me = me_uri ? tabulator.kb.sym(me_uri) : null;
        if (box.me !== me_uri) {
            tabulator.panes.utils.clearElement(box);
            if (me) {
                box.appendChild(logoutButton(me));
            } else {
                box.appendChild(tabulator.panes.utils.signInOrSignUpBox(myDocument, listener));
            };
        }
        box.me = me_uri;
    }

    box.me = '99999';  // Force refresh
    box.refresh();

    return box;
}


//######################################################
//
//       Workspace selection etc
//

// Returns a UI object which, if it selects a workspace,
// will callback(workspace).
// If necessary, will get an account, preferences file, etc.
// In sequence
//  - If not logged in, log in.
//  - Load preferences file
//  - Prompt user for workspaces
//  - Allows the user to just type in a URI by hand
//
//  Callsback with the ws and the base URI
//
//
tabulator.panes.utils.selectWorkspace = function(dom, appDetails, callbackWS) {
    var noun = appDetails.noun;
    var appPathSegment = appDetails.appPathSegment;

    var me_uri = tabulator.preferences.get('me');
    var me = me_uri && tabulator.kb.sym(me_uri);
    var kb = tabulator.kb;
    var box = dom.createElement('div');
    var context = { me: me, dom:dom, div:box}

    var say = function(s) {box.appendChild(tabulator.panes.utils.errorMessageBlock(dom, s))};


    var figureOutBase = function(ws) {
        var newBase = kb.any(ws, tabulator.ns.space('uriPrefix'));
        if (!newBase) {
            newBase = ws.uri.split('#')[0];
        } else {
            newBase = newBase.value;
	    }
        if (newBase.slice(-1) !== '/') {
            console.log(appPathSegment + ": No / at end of uriPrefix " + newBase ); // @@ paramater?
            newBase = newBase + '/';
        }
        var now = new Date();
        newBase += appPathSegment + '/id'+ now.getTime() + '/'; // unique id

        callbackWS(ws, newBase);
    }



    var displayOptions = function(context){
        var status = '';
        var id = context.me, preferencesFile = context.preferencesFile;

        // A workspace specifically defined in the private preferences file:
        var w = kb.statementsMatching(id, tabulator.ns.space('workspace'), // Only trust prefs file here
            undefined, preferencesFile).map(function(st){return st.object;});

        // A workspace in a storage in the public profile:
        var storages = kb.each(id, tabulator.ns.space('storage'));  // @@ No provenance requirement at the moment
        storages.map(function(s){
            w = w.concat(kb.each(s, tabulator.ns.ldp('contains')));
        });

        // if (pending !== undefined) pending.parentNode.removeChild(pending);
        if (w.length == 1) {

            say( "Workspace used: " + w[0].uri);  // @@ allow user to see URI
            figureOutBase(w[0]);

        } else if (w.length == 0 ) {
            say("You don't seem to have any workspaces. You have "+storages.length +" storages.");
            say("@@ code me: create new workspace.")
        } else {

            // Prompt for ws selection or creation
            // say( w.length + " workspaces for " + id + "Chose one.");
            var table = dom.createElement('table');
            table.setAttribute('style', 'border-collapse:separate; border-spacing: 0.5em;')

            // var popup = window.open(undefined, '_blank', { height: 300, width:400 }, false)
            box.appendChild(table);

            //  Add a field for directly adding the URI yourself

            var hr = box.appendChild(dom.createElement('hr')); // @@

            var p = box.appendChild(dom.createElement('p'));
            p.textContent = "Where would you like to store the data for the " + noun + "?  " +
            "Give the URL of the directory where you would like the data stored.";
            var baseField = box.appendChild(dom.createElement('input'));
            baseField.setAttribute("type", "text");
            baseField.size = 80; // really a string
            baseField.label = "base URL";
            baseField.autocomplete = "on";

            context.baseField = baseField;

            box.appendChild(dom.createElement('br')); // @@

            var button = box.appendChild(dom.createElement('button'));
            button.textContent = "Start new " + noun + " at this URI";
            button.addEventListener('click', function(e){
                var newBase = baseField.value;
                if (newBase.slice(-1) !== '/') {
                    newBase += '/';
                }
                callbackWS(null, newBase);
            });

            // Now go set up the table of spaces

            var row = 0;
            w = w.filter(function(x){ return !(kb.holds(x, tabulator.ns.rdf('type'), // Ignore master workspaces
                    tabulator.ns.space('MasterWorkspace')) ) });
            var col1, col2, col3, tr, ws, style, comment;
            var cellStyle = 'height: 3em; margin: 1em; padding: 1em white; border-radius: 0.3em;';
            var deselectedStyle = cellStyle + 'border: 0px;'
            var selectedStyle = cellStyle + 'border: 1px solid black;'
            for (var i = 0; i< w.length; i++) {
                ws = w[i];
                tr = dom.createElement('tr');
                if (i == 0) {
                    col1 = dom.createElement('td');
                    col1.setAttribute('rowspan', ''+w.length + 1);
                    tr.appendChild(col1);
                }
                col2 = dom.createElement('td');
                style = kb.any(ws, tabulator.ns.ui('style'));
		if (style) {
		    style = style.value;
		} else { // Otherise make up arbitrary colour
		    var hash = function(x){return x.split("").reduce(function(a,b){a=((a<<5)-a)+b.charCodeAt(0);return a&a},0); }
		    var bgcolor = '#' + ((hash(ws.uri) & 0xffffff) | 0xc0c0c0).toString(16); // c0c0c0  forces pale
		    style = 'color: black ; background-color: ' + bgcolor + ';'
		}
                col2.setAttribute('style', deselectedStyle + style);
                tr.target = ws.uri;
                var label = kb.any(ws, tabulator.ns.rdfs('label'))
		if (!label) {
		    label = ws.uri.split('/').slice(-1)[0] || ws.uri.split('/').slice(-2)[0]
		}
                col2.textContent = label || "???";
                tr.appendChild(col2);
                if (i == 0) {
                    col3 = dom.createElement('td');
                    col3.setAttribute('rowspan', ''+w.length + 1);
                    // col3.textContent = '@@@@@ remove';
                    col3.setAttribute('style', 'width:50%;');
                    tr.appendChild(col3);
                }
                table.appendChild(tr);



                var addMyListener = function (container, detail,  style, ws1) {
                    container.addEventListener('click', function(e){
                        col3.textContent = detail;
                        col3.setAttribute('style', style);
                        col3.appendChild(addContinueButton(ws1));
                    }, true); // capture vs bubble
                    return;
                };

                var addContinueButton = function (selectedWorkspace) {
                    var button = dom.createElement('button');
                    button.textContent = "Continue";
                    // button.setAttribute('style', style);
                    button.addEventListener('click', function(e){
                        button.disabled = true;
                        figureOutBase(selectedWorkspace);
                        button.textContent = '---->';
                    }, true); // capture vs bubble
                    return button;
                };

                var comment = kb.any(ws, tabulator.ns.rdfs('comment'));
                comment = comment ? comment.value : "Use this workspace";
                addMyListener(col2, comment? comment.value : '',
                                 deselectedStyle + style, ws);
            };

            col1.textContent = "Chose a workspace for this:";
            col1.setAttribute('style', 'vertical-align:middle;')

            // last line with "Make new workspace"
            tr_last = dom.createElement('tr');
            col2 = dom.createElement('td')
            col2.setAttribute('style', cellStyle);
            col2.textContent = "+ Make a new workspace";
            addMyListener(col2, "Set up a new workspace", '');
            tr_last.appendChild(col2);
            table.appendChild(tr_last);

        };
    };

    tabulator.panes.utils.logInLoadProfile(context)
    .then(tabulator.panes.utils.loadPreferences)
    .then(displayOptions);
    return box;
}; // selectWorkspace


//////////////////// Create a new instance of an app
//
//  An instance of an app could be e.g. an issue tracker for a given project,
// or a chess game, or calendar, or a health/fitness record for a person.
//

// Returns a div with a button in it for making a new app instance

tabulator.panes.utils.newAppInstance = function(dom, appDetails, callback) {
    var gotWS = function(ws, base) {
        //$rdf.log.debug("newAppInstance: Selected workspace = " + (ws? ws.uri : 'none'))
        callback(ws, base);
    };
    var div = dom.createElement('div');
    var b = dom.createElement('button');
    b.setAttribute('type', 'button');
    div.appendChild(b)
    b.innerHTML = "Make new " + appDetails.noun;
    // b.setAttribute('style', 'float: right; margin: 0.5em 1em;'); // Caller should set
    b.addEventListener('click', function(e) {
        div.appendChild(tabulator.panes.utils.selectWorkspace(dom, appDetails, gotWS))}, false);
    div.appendChild(b);
    return div;
};


// ends
