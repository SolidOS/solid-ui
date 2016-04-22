


// var aclModule = require('./acl.js')
var nsModule = require('./ns.js')
var widgetModule = require('./widgets.js')
var utilsModule = require('./utils')



////////////////////////////////////// Solid ACL non-UI functions
//

// Take the "defaltForNew" ACL and convert it into the equivlent ACL
// which the resource would have had.  Return it as a new separate store.

aclModule.adoptACLDefault = function(doc, aclDoc, defaultResource, defaultACLdoc) {
    var kb = tabulator.kb;
    var ACL = nsModule.acl;
    var ns = nsModule;
    var isContainer = doc.uri.slice(-1) === '/' // Give default for all directories
    var defaults = kb.each(undefined, ACL('defaultForNew'), defaultResource, defaultACLdoc);
    var proposed = [];
    defaults.map(function(da) {
        proposed = proposed.concat(kb.statementsMatching(da, ACL('agent'), undefined, defaultACLdoc))
        .concat(kb.statementsMatching(da, ACL('agentClass'), undefined, defaultACLdoc))
        .concat(kb.statementsMatching(da, ACL('origin'), undefined, defaultACLdoc))
        .concat(kb.statementsMatching(da, ACL('originClass'), undefined, defaultACLdoc))
            .concat(kb.statementsMatching(da, ACL('mode'), undefined, defaultACLdoc));
        proposed.push($rdf.st(da, ACL('accessTo'), doc, defaultACLdoc)); // Suppose
        if (isContainer){ // By default, make this apply to folder contents too
            proposed.push($rdf.st(da, ACL('defaultForNew'), doc, defaultACLdoc))
        }
    });
    var kb2 = $rdf.graph(); // Potential - derived is kept apart
    proposed.map(function(st){
        var move = function(sym) {
            var y = defaultACLdoc.uri.length; // The default ACL file
            return  $rdf.sym( (sym.uri.slice(0, y) == defaultACLdoc.uri) ?
                 aclDoc.uri + sym.uri.slice(y) : sym.uri );
        }
        kb2.add(move(st.subject), move(st.predicate), move(st.object), $rdf.sym(aclDoc.uri));
    });

    //   @@@@@ ADD TRIPLES TO ACCES CONTROL ACL FILE -- until servers fixed @@@@@
    var ccc = kb2.each(undefined, ACL('accessTo'), doc)
        .filter(function(au){ return  kb2.holds(au, ACL('mode'), ACL('Control'))});
    ccc.map(function(au){
        var au2 = kb2.sym(au.uri + "__ACLACL");
            kb2.add(au2, ns.rdf('type'), ACL('Authorization'), aclDoc);
            kb2.add(au2, ACL('accessTo'), aclDoc, aclDoc);
            kb2.add(au2, ACL('mode'), ACL('Read'), aclDoc);
            kb2.add(au2, ACL('mode'), ACL('Write'), aclDoc);
        kb2.each(au, ACL('agent')).map(function(who){
            kb2.add(au2, ACL('agent'), who, aclDoc);
        });
        kb2.each(au, ACL('agentClass')).map(function(who){
            kb2.add(au2, ACL('agentClass'), who, aclDoc);
        });
    });

    return kb2;
}


// Read and canonicalize the ACL for x in aclDoc
//
// Accumulate the access rights which each agent or class has
//
aclModule.readACL = function(x, aclDoc, kb, getDefaults) {
    var kb = kb || tabulator.kb;
    var ns = nsModule
    var predicate = getDefaults ? ns.acl('defaultForNew') : ns.acl('accessTo')
    var ACL = nsModule.acl;
    var ac = {'agent': [], 'agentClass': [], 'origin': [], 'originClass': []};
    var auths = kb.each(undefined, predicate, x);
    for (var pred in { 'agent': true, 'agentClass': true, 'origin': true, 'originClass': true}) {
        auths.map(function(a){
            kb.each(a,  ACL('mode')).map(function(mode){
                 kb.each(a,  ACL(pred)).map(function(agent){
                    if (!ac[pred][agent.uri]) ac[pred][agent.uri] = [];
                    ac[pred][agent.uri][mode.uri] = a; // could be "true" but leave pointer just in case
                });
            });
        });
    };
    return ac;
}

// Compare two ACLs
aclModule.sameACL = function(a, b) {
    var contains = function(a, b) {
        for (var pred in { 'agent': true, 'agentClass': true, 'origin': true, 'originClass': true}) {
            if (a[pred]) {
                for (var agent in a[pred]) {
                    for (var mode in a[pred][agent]) {
                        if (!b[pred][agent] || !b[pred][agent][mode]) {
                            return false;
                        }
                    }
                }
            };
        };
        return true;
    }
    return contains(a, b) && contains(b,a);
}

// Union N ACLs
aclModule.ACLunion = function(list) {
    var b = list[0], a, ag;
    for (var k=1; k < list.length; k++) {
        ['agent', 'agentClass', 'origin', 'originClass'].map(function(pred){
            a = list[k];
            if (a[pred]) {
                for (ag in a[pred]) {
                    for (var mode in a[pred][ag]) {
                        if (!b[pred][ag]) b[pred][ag] = [];
                        b[pred][ag][mode] = true;
                    }
                }
            };
        });
    }
    return b;
}


// Merge ACLs lists from things to form union

aclModule.loadUnionACL = function(subjectList, callback) {
    var aclList = [];
    var doList = function(list) {
        if (list.length) {
            doc = list.shift().doc();
            tabulator.panes.utils.getACLorDefault(doc, function(ok, p2, targetDoc, targetACLDoc, defaultHolder, defaultACLDoc){
                var defa = !p2;
                if (!ok) return callback(ok, targetACLDoc);
                aclList.push((defa) ? tabulator.panes.utils.readACL(defaultHolder, defaultACLDoc) :
                    tabulator.panes.utils.readACL(targetDoc, targetACLDoc));
                doList(list.slice(1));
            });
        } else { // all gone
            callback(true, tabulator.panes.utils.ACLunion(aclList))
        }
    }
    doList(subjectList);
}

// Represents these as a RDF graph by combination of modes
//
// Each agent can only be in one place in this model, one combination of modes.
// Combos are like full control, read append, read only etc.
//
aclModule.ACLbyCombination = function(ac) {
    var byCombo = [];
    ['agent', 'agentClass', 'origin', 'originClass'].map(function(pred){
        for (var agent in ac[pred]) {
            var combo = [];
            for (var mode in ac[pred][agent]) {
                combo.push(mode)
            }
            combo.sort()
            combo = combo.join('\n');
            if (!byCombo[combo]) byCombo[combo] = [];
            byCombo[combo].push([pred, agent])
        }
    });
    return byCombo;
}

//    Write ACL graph to store from AC
//
aclModule.makeACLGraph = function(kb, x, ac, aclDoc) {
    var byCombo = aclModule.ACLbyCombination(ac);
    return aclModule.makeACLGraphbyCombo(kb, x, byCombo, aclDoc);
}

//    Write ACL graph to store from combo
//
aclModule.makeACLGraphbyCombo = function(kb, x, byCombo, aclDoc, main, defa) {
    var ACL = nsModule.acl;
    for (combo in byCombo) {
        var modeURIs = combo.split('\n');
        var short = modeURIs.map(function(u){return u.split('#')[1]}).join('');
        if (defa && !main) short += 'Default'; // don't muddle authorizations
        var a = kb.sym(aclDoc.uri + '#' + short);
        kb.add(a, nsModule.rdf('type'), ACL('Authorization'), aclDoc);
        if (main){
          kb.add(a, ACL('accessTo'), x, aclDoc);
        }
        if (defa){
          kb.add(a, ACL('defaultForNew'), x, aclDoc);
        }
        for (var i=0; i < modeURIs.length; i++) {
            kb.add(a, ACL('mode'), kb.sym(modeURIs[i]), aclDoc);
        }
        var pairs = byCombo[combo];
        for (i=0; i< pairs.length; i++) {
            var pred = pairs[i][0], ag = pairs[i][1];
            kb.add(a, ACL(pred), kb.sym(ag), aclDoc);
        }
    }
}

//    Debugguing short strings for dumping ACL
//  and who knows maybe in the UI
//
aclModule.ACLToString = function(ac) {
  return tabulator.panes.utils.comboToString(
    tabulator.panes.utils.ACLbyCombination(ac))
}
aclModule.comboToString = function(byCombo) {
    str = ''
    for (combo in byCombo) {
        var modeURIs = combo.split('\n')
        var initials = modeURIs.map(function(u){return u.split('#')[1][0]}).join('')
        str += initials + ':'
        var pairs = byCombo[combo];
        for (i=0; i< pairs.length; i++) {
            var pred = pairs[i][0], ag = $rdf.sym(pairs[i][1]);
            str += (pred === 'agent') ? '@' : ''
            str += (ag.sameTerm(nsModule.foaf('Agent')) ? '*'
                :  tabulator.Util.label(ag))
            if (i < pairs.length -1 ) str += ','
        }
        str += ';'
    }
    return '{' + str.slice(0, -1) + '}' // drop extra semicolon
}

//    Write ACL graph to string
//
aclModule.makeACLString = function(x, ac, aclDoc) {
    var kb = $rdf.graph();
    tabulator.panes.utils.makeACLGraph(kb, x, ac, aclDoc);
    return $rdf.serialize(aclDoc,  kb, aclDoc.uri, 'text/turtle');
}

//    Write ACL graph to web
//
aclModule.putACLObject = function(kb, x, ac, aclDoc, callback) {
    var byCombo = tabulator.panes.utils.ACLbyCombination(ac);
    return tabulator.panes.utils.putACLbyCombo(kb, x, byCombo, aclDoc, callback);
}


//    Write ACL graph to web from combo
//
aclModule.putACLbyCombo = function(kb, x, byCombo, aclDoc, callback) {
    var kb2 = $rdf.graph();
    tabulator.panes.utils.makeACLGraphbyCombo(kb2, x, byCombo, aclDoc, true);

    //var str = tabulator.panes.utils.makeACLString = function(x, ac, aclDoc);
    tabulator.updater =  tabulator.updater || new tabulator.rdf.UpdateManager(kb);
    tabulator.updater.put(aclDoc, kb2.statementsMatching(undefined, undefined, undefined, aclDoc),
        'text/turtle', function(uri, ok, message){
        if (!ok) {
            callback(ok, message);
        } else {
            kb.fetcher.unload(aclDoc);
            tabulator.panes.utils.makeACLGraphbyCombo(kb, x, byCombo, aclDoc, true);
            kb.fetcher.requested[aclDoc.uri] = 'done'; // missing: save headers
            callback(ok)
        }
    });
}




// Fix the ACl for an individual card as a function of the groups it is in
//
// All group files must be loaded first
//

aclModule.fixIndividualCardACL = function(person, log, callback)  {
    var groups =  tabulator.kb.each(undefined, nsModule.vcard('hasMember'), person);
    var doc = person.doc();
    if (groups) {
        tabulator.panes.utils.fixIndividualACL(person, groups, log, callback);
    } else {
        log("This card is in no groups");
        callback(true); // fine, no requirements to access. default should be ok
    }
    // @@ if no groups, then use default for People container or the book top container.?
}

aclModule.fixIndividualACL = function(item, subjects, log, callback)  {
    log = log || console.log;
    var doc = item.doc();
    tabulator.panes.utils.getACLorDefault(doc, function(ok, exists, targetDoc, targetACLDoc, defaultHolder, defaultACLDoc){
        if (!ok) return callback(false, targetACLDoc); // ie message
        var ac = (exists) ? tabulator.panes.utils.readACL(targetDoc, targetACLDoc) : tabulator.panes.utils.readACL(defaultHolder, defaultACLDoc) ;
        tabulator.panes.utils.loadUnionACL(subjects, function(ok, union){
            if (!ok) return callback(false, union);
            if (tabulator.panes.utils.sameACL(union, ac)) {
                log("Nice - same ACL. no change " +tabulator.Util.label(item) + " " + doc);
            } else {
                log("Group ACLs differ for " + tabulator.Util.label(item) + " " + doc);

                // log("Group ACLs: " + tabulator.panes.utils.makeACLString(targetDoc, union, targetACLDoc));
                // log((exists ? "Previous set" : "Default") + " ACLs: " +
                    // tabulator.panes.utils.makeACLString(targetDoc, ac, targetACLDoc));

                tabulator.panes.utils.putACLObject(tabulator.kb, targetDoc, union, targetACLDoc, callback);
            }
        });
    })
}



aclModule.setACL = function(docURI, aclText, callback) {
    var aclDoc = kb.any(kb.sym(docURI),
        kb.sym('http://www.iana.org/assignments/link-relations/acl')); // @@ check that this get set by web.js
    if (aclDoc) { // Great we already know where it is
        webOperation('PUT', aclDoc.uri, { data: aclText, contentType: 'text/turtle'}, callback);
    } else {

        fetcher.nowOrWhenFetched(docURI, undefined, function(ok, body){
            if (!ok) return callback(ok, "Gettting headers for ACL: " + body);
            var aclDoc = kb.any(kb.sym(docURI),
                kb.sym('http://www.iana.org/assignments/link-relations/acl')); // @@ check that this get set by web.js
            if (!aclDoc) {
                // complainIfBad(false, "No Link rel=ACL header for " + docURI);
                callback(false, "No Link rel=ACL header for " + docURI);
            } else {
                webOperation('PUT', aclDoc.uri, { data: aclText, contentType: 'text/turtle'}, callback);
            }
        })
    }
};


//  Get ACL file or default if necessary
//
// callback(true, true, doc, aclDoc)   The ACL did exist
// callback(true, false, doc, aclDoc, defaultHolder, defaultACLDoc)   ACL file did not exist but a default did
// callback(false, false, status, message)  error getting original
// callback(false, true, status, message)  error getting defualt

aclModule.getACLorDefault = function(doc, callback) {

    tabulator.panes.utils.getACL(doc, function(ok, status, aclDoc, message) {
        var i, row, left, right, a;
        var kb = tabulator.kb;
        var ACL = nsModule.acl;
        if (!ok) return callback(false, false, status, message);

        // Recursively search for the ACL file which gives default access
        var tryParent = function(uri) {
            if (uri.slice(-1) === '/') {
                uri = uri.slice(0, -1);
            }
            var right = uri.lastIndexOf('/');
            var left = uri.indexOf('/', uri.indexOf('//') + 2);
            uri = uri.slice(0, right + 1);
            var doc2 = $rdf.sym(uri);
            tabulator.panes.utils.getACL(doc2, function(ok, status, defaultACLDoc) {

                if (!ok) {
                    return callback(false, true, status, "( No ACL pointer " + uri + ' ' + status + ")" + defaultACLDoc)
                } else if (status === 403) {
                    return callback(false, true, status,"( default ACL file FORBIDDEN. Stop." + uri + ")");
                } else if (status === 404) {
                    if (left >= right) {
                        return callback(false, true, 499, "Nothing to hold a default");
                    } else {
                        tryParent(uri);
                    }
                } else if (status !== 200) {
                        return callback(false, true, status, "Error status '"+status+"' searching for default for " + doc2);
                } else { // 200
                    //statusBlock.textContent += (" ACCESS set at " + uri + ". End search.");
                    var defaults = kb.each(undefined, ACL('defaultForNew'), kb.sym(uri), defaultACLDoc);
                    if (!defaults.length) {
                        tryParent(uri);       // Keep searching
                    } else {
                        var defaultHolder = kb.sym(uri);
                        callback(true, false, doc, aclDoc, defaultHolder, defaultACLDoc)
                    }
                }
            });
        }; // tryParent

        if (!ok) {
            return callback(false, false, status ,
                "Error accessing Access Control information for " + doc +") " + message);
        } else if (status === 404) {
            tryParent(doc.uri);   //  @@ construct default one - the server should do that
        } else  if (status === 403) {
            return callback(false, false, status, "(Sharing not available to you)" + message);
        } else  if (status !== 200) {
            return callback(false, false, status, "Error " + status +
                " accessing Access Control information for " + doc + ": " + message);
        } else { // 200
            return callback(true, true, doc, aclDoc);
        }
    }); // Call to getACL
} // getACLorDefault


//    Calls back (ok, status, acldoc, message)
//
//   (false, 900, errormessage)        no link header
//   (true, 403, documentSymbol, fileaccesserror) not authorized
//   (true, 404, documentSymbol, fileaccesserror) if does not exist
//   (true, 200, documentSymbol)   if file exitss and read OK
//
aclModule.getACL = function(doc, callback) {
    tabulator.sf.nowOrWhenFetched(doc, undefined, function(ok, body){
        if (!ok) return callback(ok, "Can't get headers to find ACL for " + doc + ": " + body);
        var kb = tabulator.kb;
        var aclDoc = kb.any(doc,
            kb.sym('http://www.iana.org/assignments/link-relations/acl')); // @@ check that this get set by web.js
        if (!aclDoc) {
            callback(false, 900, "No Link rel=ACL header for " + doc);
        } else {
            if (tabulator.sf.nonexistant[aclDoc.uri]) {
                return callback(true, 404, aclDoc, "ACL file " + aclDoc + " does not exist.");
            }
            tabulator.sf.nowOrWhenFetched(aclDoc, undefined, function(ok, message, xhr){
                if (!ok) {
                    callback(true, xhr.status, aclDoc, "Can't read Access Control File " + aclDoc + ": " + message);
                } else {
                    callback(true, 200, aclDoc);
                }
            });
        }
    });
};




///////////////////////////////////////////  End of ACL stuff
