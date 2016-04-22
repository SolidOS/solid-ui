

// A utility which should prb go elsewhere

tabulator.panes.utils.hashColor = function(who) {
    who = who.uri || who;
    var hash = function(x){return x.split("").reduce(function(a,b){a=((a<<5)-a)+b.charCodeAt(0);return a&a},0); }
    return '#' + ((hash(who) & 0xffffff) | 0xc0c0c0).toString(16); // c0c0c0 or 808080 forces pale
}



// http://stackoverflow.com/questions/879152/how-do-i-make-javascript-beep
// http://www.tsheffler.com/blog/2013/05/14/audiocontext-noteonnoteoff-and-time-units/

if (!tabulator.audioContext) {
    if (typeof AudioContext !== 'undefined') {
        tabulator.audioContext = AudioContext;
    } else if (typeof window !== 'undefined') {
       tabulator.audioContext = window.AudioContext || window.webkitAudioContext;
    }
}
if (tabulator.audioContext) {
    tabulator.panes.utils.beep = (function () {
        var ctx = new(tabulator.audioContext);
        return function (duration, frequency, type, finishedCallback) {

            duration = + (duration | 0.3);

            // Only 0-4 are valid types.
            type = type || 'sine'; // sine, square, sawtooth, triangle

            if (typeof finishedCallback != "function") {
                finishedCallback = function () {};
            }

            var osc = ctx.createOscillator();

            osc.type = type;
            osc.frequency.value = frequency || 256;

            osc.connect(ctx.destination);
            osc.start(0);
            osc.stop(duration);

        };
    })();
} else { // Safari 2015
    tabulator.panes.utils.beep  = function() {};
}

////////////////////////////////////////////////

//   The pad widget
//



tabulator.panes.utils.notepad  = function (dom, padDoc, subject, me, options) {
    options = options || {}
    var exists = options.exists;
    var table = dom.createElement('table');
    var kb = tabulator.kb;
    // var mainRow = table.appendChild(dom.createElement('tr'));

    var fetcher = tabulator.sf;
    var ns = tabulator.ns;

    tabulator.updater = tabulator.updater || new tabulator.rdf.UpdateManager(kb);
    var updater = tabulator.updater;

    var waitingForLogin = false;

    var PAD = $rdf.Namespace('http://www.w3.org/ns/pim/pad#');

    var currentNode, currentOffset;

    table.setAttribute('style', 'padding: 1em; width:100%;');

    var upstreamStatus = null, downstreamStatus = null;

    if (options.statusArea) {
        var t = options.statusArea.appendChild(dom.createElement('table'));
        var tr = t.appendChild(dom.createElement('tr'));
        upstreamStatus = tr.appendChild(dom.createElement('td'));
        downstreamStatus = tr.appendChild(dom.createElement('td'));
        upstreamStatus.setAttribute('style', 'width:50%');
        downstreamStatus.setAttribute('style', 'width:50%');
    }

    var complain = function(message, upstream) {
        console.log(message);
        if (options.statusArea) {
        (upstream ? upstreamStatus : downstreamStatus).appendChild(
            tabulator.panes.utils.errorMessageBlock(dom, message, 'pink'));
        }
    }

    var clearStatus = function(upsteam) {
        if (options.statusArea) {
            options.statusArea.innerHTML = '';
        }
    };


    var setPartStyle = function(part, colors, pending) {
        var chunk = part.subject;
        colors = colors || '';
        var baseStyle = 'font-size: 100%; font-family: monospace; width: 100%; border: none;'; //  font-weight:
        var headingCore = 'font-family: sans-serif; font-weight: bold;  border: none;'
        var headingStyle = [ 'font-size: 110%;  padding-top: 0.5em; padding-bottom: 0.5em; width: 100%;' ,
            'font-size: 120%; padding-top: 1em; padding-bottom: 1em; width: 100%;' ,
            'font-size: 150%; padding-top: 1em; padding-bottom: 1em; width: 100%;' ];

        var author = kb.any(chunk, ns.dc('author'));
        if (!colors && author) { // Hash the user webid for now -- later allow user selection!
            var hash = function(x){return x.split("").reduce(function(a,b){a=((a<<5)-a)+b.charCodeAt(0);return a&a},0); }
            var bgcolor = '#' + ((hash(author.uri) & 0xffffff) | 0xc0c0c0).toString(16); // c0c0c0  forces pale
            colors = 'color: ' + (pending ? '#888' : 'black') +'; background-color: ' + bgcolor + ';'
        }

        var indent = kb.any(chunk, PAD('indent'));

        indent = indent ? indent.value : 0;
        var style =  (indent >= 0) ? //
            // baseStyle + 'padding-left: ' + (indent * 3) + 'em;'
            baseStyle + 'text-indent: ' + (indent * 3) + 'em;'
            :   headingCore + headingStyle[ -1 - indent ];
        part.setAttribute('style', style + colors);
    }


    var removePart = function(part) {
        var chunk = part.subject;
        if (!chunk) throw "No chunk for line to be deleted!"; // just in case
        var prev = kb.any(undefined, PAD('next'), chunk);
        var next = kb.any(chunk, PAD('next'));
        if (prev.sameTerm(subject) && next.sameTerm(subject)) { // Last one
            console.log("You can't delete the only line.")
            return;
        }

        var del = kb.statementsMatching(chunk, undefined, undefined, padDoc)
                .concat(kb.statementsMatching(undefined, undefined, chunk, padDoc));
        var ins = [ $rdf.st(prev, PAD('next'), next, padDoc) ];
        var label = chunk.uri.slice(-4);
        console.log("Deleting line " + label)

        updater.update(del, ins, function(uri, ok, error_body, xhr){
            if (ok) {
                var row = part.parentNode;
                var before = row.previousSibling;
                row.parentNode.removeChild(row);
                console.log("    deleted line " + label + " ok " + part.value);
                if (before && before.firstChild) {
                    before.firstChild.focus();
                }
            } else if (xhr.status === 409) { // Conflict
                setPartStyle(part,'color: black;  background-color: #ffd;'); // yellow
                part.state = 0; // Needs downstream refresh
                tabulator.panes.utils.beep(0.5, 512); // Ooops clash with other person
                setTimeout(function(){
                    updater.requestDownstreamAction(padDoc, reloadAndSync);
                }, 1000);
            } else {
                console.log("    removePart FAILED " + chunk + ": " + error_body);
                console.log("    removePart was deleteing :'" + del);
                setPartStyle(part, 'color: black;  background-color: #fdd;');// failed
                complain("Error "+xhr.status+" saving changes: "+ error_body. true); // upstream,
                // updater.requestDownstreamAction(padDoc, reloadAndSync);
            };
        })
    }// removePart

    var changeIndent = function(part, chunk, delta) {
        var del = kb.statementsMatching(chunk, PAD('indent'));
        var current =  del.length? Number(del[0].object.value) : 0;
        if (current + delta < -3) return; //  limit negative indent
        var newIndent = current + delta;
        var ins = $rdf.st(chunk, PAD('indent'), newIndent, padDoc);
        updater.update(del, ins, function(uri, ok, error_body){
            if (!ok) {
                console.log("Indent change FAILED '" + newIndent + "' for "+padDoc+": " + error_body);
                setPartStyle(part, 'color: black;  background-color: #fdd;'); // failed
                updater.requestDownstreamAction(padDoc, reloadAndSync);
            } else {
                setPartStyle(part); // Implement the indent
            }
        });
    }

    // Use this sort of code to split the line when return pressed in the middle @@
    var doGetCaretPosition =function doGetCaretPosition (oField) {
        var iCaretPos = 0;

        // IE Support
        if (document.selection) {

            // Set focus on the element to avoid IE bug
            oField.focus ();

            // To get cursor position, get empty selection range
            var oSel = document.selection.createRange ();

            // Move selection start to 0 position
            oSel.moveStart ('character', -oField.value.length);

            // The caret position is selection length
            iCaretPos = oSel.text.length;
        }

        // Firefox support
        else if (oField.selectionStart || oField.selectionStart == '0')
        iCaretPos = oField.selectionStart;

        // Return results
        return (iCaretPos);
    }


    var addListeners = function(part, chunk) {

        part.addEventListener('keydown', function(event){
            //  up 38; down 40; left 37; right 39     tab 9; shift 16; escape 27
            switch(event.keyCode) {
            case 13:                    // Return
                var before = event.shiftKey;
                console.log("enter");   // Shift-return inserts before -- only way to add to top of pad.
                if (before) {
                    queue =  kb.any(undefined, PAD('next'), chunk);
                    queueProperty = 'newlinesAfter';
                } else {
                    queue = kb.any(chunk, PAD('next'));
                    queueProperty = 'newlinesBefore';
                }
                queue[queueProperty] = queue[queueProperty]  || 0
                queue[queueProperty]  += 1;
                if (queue[queueProperty]  > 1) {
                    console.log("    queueing newline queue = " + queue[queueProperty]);
                    return;
                }
                console.log("    go ahead line before " + queue[queueProperty]);
                newChunk(part, before); // was document.activeElement
                break;

            case 8: // Delete
                if (part.value.length === 0 ) {
                    console.log("Delete key line " + chunk.uri.slice(-4) + " state " + part.state)

                    switch (part.state) {
                    case 1: // contents being sent
                    case 2: // contents need to be sent again
                        part.state = 4; // delete me
                        return;
                    case 3: // being deleted already
                    case 4: // already deleme state
                        return;
                    case undefined:
                    case 0:
                        part.state = 3; // being deleted
                        removePart(part);
                        event.preventDefault();
                        break; // continue
                    default:
                        throw "Unexpected state "+part.state
                    }
                }
                break;
            case 9: // Tab
                var delta = event.shiftKey ? -1 : 1;
                changeIndent(part, chunk, delta);
                event.preventDefault(); // default is to highlight next field
                break;
            case 27:  // ESC
                console.log('escape')
                updater.requestDownstreamAction(padDoc, reloadAndSync);
                event.preventDefault();
                break;

            case 38: // Up
                if (part.parentNode.previousSibling) {
                    part.parentNode.previousSibling.firstChild.focus();
                    event.preventDefault();
                }
                break;

            case 40: // Down
                if (part.parentNode.nextSibling) {
                    part.parentNode.nextSibling.firstChild.focus();
                    event.preventDefault();
                }
                break;

            default:
            }
        });

        var updateStore = function(part) {
            var chunk = part.subject;
            setPartStyle(part, undefined, true);
            var old = kb.any(chunk, ns.sioc('content')).value, color;
            del = [ $rdf.st(chunk, ns.sioc('content'), old, padDoc)];
            ins = [ $rdf.st(chunk, ns.sioc('content'), part.value, padDoc)];
            var newOne = part.value;

            // DEBUGGING ONLY
            if (part.lastSent) {
                if (old != part.lastSent)  {
                    throw "Out of order, last sent expected '"+old+"' but found '"+part.lastSent+"'";
                }
            }
            part.lastSent = newOne;


            console.log(" Patch proposed to " + chunk.uri.slice(-4) + " '"  + old + "' -> '" + newOne + "' ");
            updater.update(del, ins, function(uri, ok, error_body, xhr){
                if (!ok) {
                    // alert("clash " + error_body);
                    console.log("    patch FAILED " + xhr.status + " for '" + old + "' -> '" + newOne + "': " + error_body);
                    if (xhr.status === 409) { // Conflict -  @@ we assume someone else
                        setPartStyle(part,'color: black;  background-color: #fdd;');
                        part.state = 0; // Needs downstream refresh
                        tabulator.panes.utils.beep(0.5, 512); // Ooops clash with other person
                        setTimeout(function(){
                            updater.requestDownstreamAction(padDoc, reloadAndSync);
                        }, 1000);

                    } else {
                        setPartStyle(part,'color: black;  background-color: #fdd;'); // failed pink
                        part.state = 0;
                        complain("    Error " + xhr.status + " sending data: " + error_body, true);
                        tabulator.panes.utils.beep(1.0, 128); // Other
                        // @@@   Do soemthing more serious with other errors eg auth, etc
                    }
                } else {
                    clearStatus(true);// upstream
                    setPartStyle(part); // synced
                    console.log("    Patch ok '"  + old + "' -> '" + newOne + "' ");

                    if (part.state === 4) { //  delete me
                        part.state = 3;
                        removePart(part);
                    } else if (part.state === 3) { // being deleted
                        // pass
                    } else if (part.state === 2) {
                        part.state = 1;  // pending: lock
                        updateStore(part)
                    } else {
                        part.state = 0; // clear lock
                    }
                }
            });
        }

        part.addEventListener('input', function inputChangeListener(event) {
            // console.log("input changed "+part.value);
            setPartStyle(part, undefined, true); // grey out - not synced
            console.log("Input event state " + part.state + " value '" + part.value + "'");
            switch (part.state) {
            case 3: // being deleted
                return;
            case 4: // needs to be deleted
                return;
            case 2: // needs content updating, we know
                return;
            case 1:
                part.state = 2; // lag we need another patch
                return;
            case 0:
            case undefined:
                part.state = 1; // being upadted
                updateStore(part);
            }
        }); // listener

    } // addlisteners


    var newPartAfter = function(tr1, chunk, before) { // @@ take chunk and add listeners
        var text = kb.any(chunk, ns.sioc('content'));
        text = text ? text.value : '';
        var tr = dom.createElement('tr');
        if (before) {
            table.insertBefore(tr, tr1);
        } else { // after
            if (tr1 && tr1.nextSibling) {
                table.insertBefore(tr, tr1.nextSibling);
            } else {
                table.appendChild(tr);
            }
        }
        var part = tr.appendChild(dom.createElement('input'));
        part.subject = chunk;
        part.setAttribute('type', 'text')
        setPartStyle(part, '');
        part.value = text;
        addListeners(part, chunk);
        return part
    };



    var newChunk = function(ele, before) { // element of chunk being split
        var kb = tabulator.kb, tr1;

        var here, prev, next, queue, indent = 0, queueProperty = null;
        if (ele) {
            if (ele.tagName.toLowerCase() !== 'input') {
                console.log("return pressed when current document is: " + ele.tagName)
            }
            here = ele.subject;
            indent = kb.any(here, PAD('indent'));
            indent = indent? Number(indent.value)  : 0;
            if (before) {
                prev =  kb.any(undefined, PAD('next'), here);
                next = here;
                queue = prev;
                queueProperty = 'newlinesAfter';
            } else {
                prev = here;
                next =  kb.any(here, PAD('next'));
                queue = next;
                queueProperty = 'newlinesBefore';
            }
            tr1 = ele.parentNode;

        } else {
            prev = subject
            next = subject;
            tr1 = undefined;
        }

        var chunk = tabulator.panes.utils.newThing(padDoc);
        var label = chunk.uri.slice(-4)

        del = [ $rdf.st(prev, PAD('next'), next, padDoc)];
        ins = [ $rdf.st(prev, PAD('next'), chunk, padDoc),
                $rdf.st(chunk, PAD('next'), next, padDoc),
                $rdf.st(chunk, ns.dc('author'), me, padDoc),
                $rdf.st(chunk, ns.sioc('content'), '', padDoc)];
        if (indent > 0) { // Do not inherit
            ins.push($rdf.st(chunk, PAD('indent'), indent, padDoc));
        }

        console.log("    Fresh chunk " + label + " proposed");
        updater.update(del, ins, function(uri, ok, error_body, xhr){
            if (!ok) {
                //alert("Error writing new line " + label + ": " + error_body);
                console.log("    ERROR writing new line " + label + ": " + error_body);
            } else {
                var newPart = newPartAfter(tr1, chunk, before);
                setPartStyle(newPart);
                newPart.focus(); // Note this is delayed
                if (queueProperty) {
                    console.log("    Fresh chunk " + label + " updated, queue = " + queue[queueProperty]);
                    queue[queueProperty] -= 1;
                    if (queue[queueProperty]  > 0) {
                        console.log("    Implementing queued newlines = " + next.newLinesBefore);
                        newChunk(newPart, before);
                    }
                }
            }
        });
    };

    var consistencyCheck = function() {
        var found = [], failed =0;
        var  complain2 = function(msg) {
            complain(msg);
            failed++;
        }

        if (!kb.the(subject, PAD('next'))) {
            complain2("No initial next pointer");
            return false; // can't do linked list
        }
        for (var chunk = kb.the(subject, PAD('next'));
            !chunk.sameTerm(subject);
            chunk = kb.the(chunk, PAD('next'))) {
            var label = chunk.uri.split('#')[1];
            if (found[chunk.uri]) {
                complain2("Loop!");
                return false;
            }

            found[chunk.uri] = true;
            var k = kb.each(chunk, PAD('next')).length
            if (k !== 1) complain2("Should be 1 not "+k+" next pointer for " + label);

            var k = kb.each(chunk, PAD('indent')).length
            if (k > 1) complain2("Should be 0 or 1 not "+k+" indent for " + label);

            var k = kb.each(chunk, ns.sioc('content')).length
            if (k !== 1) complain2("Should be 1 not "+k+" contents for " + label);

            var k = kb.each(chunk, ns.dc('author')).length
            if (k !== 1) complain2("Should be 1 not "+k+" author for " + label);

            var sts = kb.statementsMatching(undefined, ns.sioc('contents'));
            sts.map(function(st){ if (!found[st.subject.uri]) {
                    complain2("Loose chunk! " + st.subject.uri);
            }});
        }
        return !failed;
    }

    // Ensure that the display matches the current state of the
    var sync = function() {
        var first = kb.the(subject, PAD('next'));
        if (kb.each(subject, PAD('next')).length !== 1) {
            var msg = "Pad: Inconsistent data - NEXT pointers: "
                + (kb.each(subject, PAD('next')).length);
            console.log(msg);
            if (options.statusAra) {
                options.statusArea.textContent += msg;
            }
            return
        }
        var last = kb.the(undefined, PAD('previous'), subject);
        var chunk = first; //  = kb.the(subject, PAD('next'));
        var row;

        // First see which of the logical chunks have existing physical manifestations
        var manif = [];
        // Find which lines correspond to existing chunks
        for (var chunk = kb.the(subject, PAD('next'));
            !chunk.sameTerm(subject);
            chunk = kb.the(chunk, PAD('next'))) {
            for (var i=0; i< table.children.length; i++) {
                var tr = table.children[i];
                if (tr.firstChild.subject.sameTerm(chunk)) {
                    manif[chunk.uri] = tr.firstChild;
                }
            }
        }

        // Remove any deleted lines
        for (var i = table.children.length -1; i >= 0 ; i--) {
            row = table.children[i];
            if (!manif[row.firstChild.subject.uri]) {
                table.removeChild(row);
            }
        }
        // Insert any new lines and update old ones
        row = table.firstChild; // might be null
        for (var chunk = kb.the(subject, PAD('next'));
            !chunk.sameTerm(subject);
            chunk = kb.the(chunk, PAD('next'))) {
            var text = kb.any(chunk, ns.sioc('content')).value;
            // superstitious -- don't mess with unchanged input fields
            // which may be selected by the user
            if (row && manif[chunk.uri]) {
                var part = row.firstChild;
                if (text !== part.value) {
                    part.value = text;
                }
                setPartStyle(part);
                part.state = 0; // Clear the state machine
                delete part.lastSent; // DEBUG ONLY
                row = row.nextSibling
            } else {
                newPartAfter(row, chunk, true); // actually before
            }
        };
    };


    // Refresh the DOM tree

    var refreshTree = function(root) {
        if (root.refresh) {
            root.refresh();
            return;
        }
        for (var i=0; i < root.children.length; i++) {
            refreshTree(root.children[i]);
        }
    }

    var reloading = false;

    var checkAndSync = function() {
        console.log("    reloaded OK")
        clearStatus();
        if (!consistencyCheck()) {
            console.log("CONSITENCY CHECK FAILED");// Turn whole table pink??
        } else {
            refreshTree(table);
        }
    };

    var reloadAndSync = function() {
        if (reloading) {
            console.log("   Already reloading - stop")
            return; // once only needed
        }
        reloading = true;
        var retryTimeout = 1000; // ms
        var tryReload = function() {
            console.log("try reload - timeout = " + retryTimeout);
            updater.reload(kb, padDoc, function (ok, message, xhr) {
                reloading = false;
                if (ok) {
                    checkAndSync();
                } else {
                    if  (xhr.status === 0) {
                        complain("Network error refreshing the pad. Retrying in "
                                            + retryTimeout/1000);
                        reloading = true;
                        retryTimeout = retryTimeout * 2;
                        setTimeout(tryReload, retryTimeout)
                    } else {
                        complain("Error " + xhr.status + "refreshing the pad:" +
                            message + ". Stopped");
                        console.log("Error " + xhr.status + "refreshing the pad:" +
                            message + ". Stopped" + padDoc);
                    }
                }
            });
        }
        tryReload();
    }

    table.refresh = sync; // Catch downward propagating refresh events
    table.reloadAndSync = reloadAndSync;

    if (exists) {
        console.log("Existing pad.");
        if (consistencyCheck()) {
            sync();
            if (kb.holds(subject, PAD('next'), subject)) { //Empty list untenable
                newChunk(); // require at least one line
            }
        } else {
            console.log(table.textContent = "Inconsistent data. Abort");
        }
    } else { // Make new pad
        console.log("No pad exists - making new one.");
        var insertables = [
            $rdf.st(subject, ns.rdf('type'), PAD('Notepad'), padDoc),
            $rdf.st(subject, ns.dc('author'), me, padDoc),
            $rdf.st(subject, ns.dc('created'), new Date(), padDoc),
            $rdf.st(subject, PAD('next'), subject, padDoc)];

        updater.update([], insertables, function(uri,ok,error_body){
            if (!ok) {
                complainIfBad(ok, error_body);
            } else {
                console.log("Initial pad created");
                newChunk(); // Add a first chunck
                // getResults();
            }
        });
    }
    return table;
}
