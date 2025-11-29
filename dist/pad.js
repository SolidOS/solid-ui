/** **************
 *   Notepad Widget
 */
/** @module pad
 */
import ns from './ns';
import { Namespace, NamedNode, st } from 'rdflib';
import { newThing, errorMessageBlock } from './widgets';
import { beep } from './utils';
import { log } from './debug';
import { solidLogicSingleton } from 'solid-logic';
import { style } from './style';
export { renderParticipants, participationObject, manageParticipation, recordParticipation } from './participation';
const store = solidLogicSingleton.store;
const PAD = Namespace('http://www.w3.org/ns/pim/pad#');
/**
 * @ignore
 */
class NotepadElement extends HTMLElement {
}
/**
 * @ignore
 */
class NotepadPart extends HTMLElement {
}
/** Figure out a random color from my webid
 *
 * @param {NamedNode} author - The author of text being displayed
 * @returns {String} The CSS color generated, constrained to be light for a background color
 */
export function lightColorHash(author) {
    const hash = function (x) {
        return x.split('').reduce(function (a, b) {
            a = (a << 5) - a + b.charCodeAt(0);
            return a & a;
        }, 0);
    };
    return author && author.uri
        ? '#' + ((hash(author.uri) & 0xffffff) | 0xc0c0c0).toString(16)
        : '#ffffff'; // c0c0c0  forces pale
} // no id -> white
/**  notepad
 *
 * @param {HTMLDocument} dom - the web page of the browser
 * @param {NamedNode} padDoc - the document in which the participation should be shown
 * @param {NamedNode} subject - the thing in which participation is happening
 * @param {NamedNode} me - person who is logged into the pod
 * @param {notepadOptions} options - the options that can be passed in consist of statusArea, exists
 */
export function notepad(dom, padDoc, subject, me, options) {
    options = options || {};
    const exists = options.exists;
    const table = dom.createElement('table');
    const kb = store;
    if (me && !me.uri)
        throw new Error('UI.pad.notepad:  Invalid userid');
    const updater = store.updater;
    const PAD = Namespace('http://www.w3.org/ns/pim/pad#');
    table.setAttribute('style', style.notepadStyle);
    let upstreamStatus = null;
    let downstreamStatus = null;
    if (options.statusArea) {
        const t = options.statusArea.appendChild(dom.createElement('table'));
        const tr = t.appendChild(dom.createElement('tr'));
        upstreamStatus = tr.appendChild(dom.createElement('td'));
        downstreamStatus = tr.appendChild(dom.createElement('td'));
        if (upstreamStatus) {
            upstreamStatus.setAttribute('style', style.upstreamStatus);
        }
        if (downstreamStatus) {
            downstreamStatus.setAttribute('style', style.downstreamStatus);
        }
    }
    /* @@ TODO want to look into this, it seems upstream should be a boolean and default to false ?
    *
    */
    const complain = function (message, upstream = false) {
        log(message);
        if (options.statusArea) {
            ;
            (upstream ? upstreamStatus : downstreamStatus).appendChild(errorMessageBlock(dom, message, 'pink'));
        }
    };
    // @@ TODO need to refactor so that we don't have to type cast
    const clearStatus = function (_upsteam) {
        if (options.statusArea) {
            options.statusArea.innerHTML = '';
        }
    };
    const setPartStyle = function (part, colors, pending) {
        const chunk = part.subject;
        colors = colors || '';
        const baseStyle = style.baseStyle;
        const headingCore = style.headingCore;
        const headingStyle = style.headingStyle;
        const author = kb.any(chunk, ns.dc('author'));
        if (!colors && author) {
            // Hash the user webid for now -- later allow user selection!
            const bgcolor = lightColorHash(author);
            colors =
                'color: ' +
                    (pending ? '#888' : 'black') +
                    '; background-color: ' +
                    bgcolor +
                    ';';
        }
        // @@ TODO Need to research when this can be an object with the indent stored in value
        // and when the indent is stored as a Number itself, not in an object.
        let indent = kb.any(chunk, PAD('indent'));
        indent = indent ? indent.value : 0;
        const localStyle = indent >= 0
            ? baseStyle + 'text-indent: ' + indent * 3 + 'em;'
            : headingCore + headingStyle[-1 - indent];
        // ? baseStyle + 'padding-left: ' + (indent * 3) + 'em;'
        part.setAttribute('style', localStyle + colors);
    };
    const removePart = function (part) {
        const chunk = part.subject;
        if (!chunk)
            throw new Error('No chunk for line to be deleted!'); // just in case
        const prev = kb.any(undefined, PAD('next'), chunk);
        const next = kb.any(chunk, PAD('next'));
        if (prev.sameTerm(subject) && next.sameTerm(subject)) {
            // Last one
            log('You can\'t delete the only line.');
            return;
        }
        const del = kb
            .statementsMatching(chunk, undefined, undefined, padDoc)
            .concat(kb.statementsMatching(undefined, undefined, chunk, padDoc));
        const ins = [st(prev, PAD('next'), next, padDoc)];
        // @@ TODO what should we do if chunk is not a NamedNode should we
        // assume then it is a string?
        if (chunk instanceof NamedNode) {
            const label = chunk.uri.slice(-4);
            log('Deleting line ' + label);
        }
        if (!updater) {
            throw new Error('have no updater');
        }
        // @@ TODO below you can see that before is redefined and not a boolean
        updater.update(del, ins, function (uri, ok, errorMessage, response) {
            if (ok) {
                const row = part.parentNode;
                if (row) {
                    const before = row.previousSibling;
                    if (row.parentNode) {
                        row.parentNode.removeChild(row);
                    }
                    // console.log('    deleted line ' + label + ' ok ' + part.value)
                    if (before && before.firstChild) {
                        // @@ TODO IMPORTANT FOCUS ISN'T A PROPERTY ON A CHILDNODE
                        before.firstChild.focus();
                    }
                }
            }
            else if (response && response.status === 409) {
                // Conflict
                setPartStyle(part, 'color: black;  background-color: #ffd;'); // yellow
                part.state = 0; // Needs downstream refresh
                beep(0.5, 512); // Ooops clash with other person
                setTimeout(function () {
                    // Ideally, beep! @@
                    reloadAndSync(); // Throw away our changes and
                    // updater.requestDownstreamAction(padDoc, reloadAndSync)
                }, 1000);
            }
            else {
                log('    removePart FAILED ' + chunk + ': ' + errorMessage);
                log('    removePart was deleteing :\'' + del);
                setPartStyle(part, 'color: black;  background-color: #fdd;'); // failed
                const res = response ? response.status : ' [no response field] ';
                complain('Error ' + res + ' saving changes: ' + errorMessage.true); // upstream,
                // updater.requestDownstreamAction(padDoc, reloadAndSync);
            }
        });
    }; // removePart
    const changeIndent = function (part, chunk, delta) {
        const del = kb.statementsMatching(chunk, PAD('indent'));
        const current = del.length ? Number(del[0].object.value) : 0;
        if (current + delta < -3)
            return; //  limit negative indent
        const newIndent = current + delta;
        const ins = st(chunk, PAD('indent'), newIndent, padDoc);
        if (!updater) {
            throw new Error('no updater');
        }
        updater.update(del, ins, function (uri, ok, errorBody) {
            if (!ok) {
                log('Indent change FAILED \'' +
                    newIndent +
                    '\' for ' +
                    padDoc +
                    ': ' +
                    errorBody);
                setPartStyle(part, 'color: black;  background-color: #fdd;'); // failed
                updater.requestDownstreamAction(padDoc, reloadAndSync);
            }
            else {
                setPartStyle(part); // Implement the indent
            }
        });
    };
    const addListeners = function (part, chunk) {
        part.addEventListener('keydown', function (event) {
            if (!updater) {
                throw new Error('no updater');
            }
            let queueProperty, queue;
            //  up 38; down 40; left 37; right 39     tab 9; shift 16; escape 27
            switch (event.keyCode) {
                case 13: // Return
                    {
                        const before = event.shiftKey;
                        log('enter'); // Shift-return inserts before -- only way to add to top of pad.
                        if (before) {
                            queue = kb.any(undefined, PAD('next'), chunk);
                            queueProperty = 'newlinesAfter';
                        }
                        else {
                            queue = kb.any(chunk, PAD('next'));
                            queueProperty = 'newlinesBefore';
                        }
                        queue[queueProperty] = queue[queueProperty] || 0;
                        queue[queueProperty] += 1;
                        if (queue[queueProperty] > 1) {
                            log('    queueing newline queue = ' + queue[queueProperty]);
                            return;
                        }
                        log('    go ahead line before ' + queue[queueProperty]);
                        newChunk(part, before); // was document.activeElement
                        break;
                    }
                case 8: // Delete
                    if (part.value.length === 0) {
                        log('Delete key line ' + chunk.uri.slice(-4) + ' state ' + part.state);
                        switch (part.state) {
                            case 1: // contents being sent
                            case 2: // contents need to be sent again
                                part.state = 4; // delete me
                                return;
                            case 3: // already being deleted
                            case 4: // already deleted state
                                return;
                            case undefined:
                            case 0:
                                part.state = 3; // being deleted
                                removePart(part);
                                event.preventDefault();
                                break; // continue
                            default:
                                throw new Error('pad: Unexpected state ' + part);
                        }
                    }
                    break;
                case 9: // Tab
                    {
                        const delta = event.shiftKey ? -1 : 1;
                        changeIndent(part, chunk, delta);
                        event.preventDefault(); // default is to highlight next field
                        break;
                    }
                case 27: // ESC
                    log('escape');
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
        const updateStore = function (part) {
            const chunk = part.subject;
            setPartStyle(part, undefined, true);
            const old = kb.any(chunk, ns.sioc('content')).value;
            const del = [st(chunk, ns.sioc('content'), old, padDoc)];
            let ins;
            if (part.value) {
                ins = [st(chunk, ns.sioc('content'), part.value, padDoc)];
            }
            const newOne = part.value;
            // DEBUGGING ONLY
            if (part.lastSent) {
                if (old !== part.lastSent) {
                    throw new Error('Out of order, last sent expected \'' +
                        old +
                        '\' but found \'' +
                        part.lastSent +
                        '\'');
                }
            }
            part.lastSent = newOne;
            /* console.log(
              ' Patch proposed to ' +
              chunk.uri.slice(-4) +
              " '" +
              old +
              "' -> '" +
              newOne +
              "' "
            ) */
            if (!updater) {
                throw new Error('no updater');
            }
            updater.update(del, ins, function (uri, ok, errorBody, xhr) {
                if (!ok) {
                    // alert("clash " + errorBody);
                    log('    patch FAILED ' +
                        xhr.status +
                        ' for \'' +
                        old +
                        '\' -> \'' +
                        newOne +
                        '\': ' +
                        errorBody);
                    if (xhr.status === 409) {
                        // Conflict -  @@ we assume someone else
                        setPartStyle(part, 'color: black;  background-color: #fdd;');
                        part.state = 0; // Needs downstream refresh
                        beep(0.5, 512); // Ooops clash with other person
                        setTimeout(function () {
                            updater.requestDownstreamAction(padDoc, reloadAndSync);
                        }, 1000);
                    }
                    else {
                        setPartStyle(part, 'color: black;  background-color: #fdd;'); // failed pink
                        part.state = 0;
                        complain('    Error ' + xhr.status + ' sending data: ' + errorBody, true);
                        beep(1.0, 128); // Other
                        // @@@   Do soemthing more serious with other errors eg auth, etc
                    }
                }
                else {
                    clearStatus(true); // upstream
                    setPartStyle(part); // synced
                    log('    Patch ok \'' + old + '\' -> \'' + newOne + '\' ');
                    if (part.state === 4) {
                        //  delete me
                        part.state = 3;
                        removePart(part);
                    }
                    else if (part.state === 3) {
                        // being deleted
                        // pass
                    }
                    else if (part.state === 2) {
                        part.state = 1; // pending: lock
                        updateStore(part);
                    }
                    else {
                        part.state = 0; // clear lock
                    }
                }
            });
        };
        part.addEventListener('input', function inputChangeListener(_event) {
            // debug.log("input changed "+part.value);
            setPartStyle(part, undefined, true); // grey out - not synced
            log('Input event state ' + part.state + ' value \'' + part.value + '\'');
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
    }; // addlisteners
    // @@ TODO Need to research before as it appears to be used as an Element and a boolean
    const newPartAfter = function (tr1, chunk, before) {
        // @@ take chunk and add listeners
        let text = kb.any(chunk, ns.sioc('content'));
        text = text ? text.value : '';
        const tr = dom.createElement('tr');
        if (before) {
            table.insertBefore(tr, tr1);
        }
        else {
            // after
            if (tr1 && tr1.nextSibling) {
                table.insertBefore(tr, tr1.nextSibling);
            }
            else {
                table.appendChild(tr);
            }
        }
        const part = tr.appendChild(dom.createElement('input'));
        part.subject = chunk;
        part.setAttribute('type', 'text');
        part.value = text;
        if (me) {
            setPartStyle(part, '');
            addListeners(part, chunk);
        }
        else {
            setPartStyle(part, 'color: #222; background-color: #fff');
            log('Note can\'t add listeners - not logged in');
        }
        return part;
    };
    /* @@ TODO we need to look at indent, it can be a Number or an Object this doesn't seem correct.
    */
    const newChunk = function (ele, before) {
        // element of chunk being split
        const kb = store;
        let indent = 0;
        let queueProperty = null;
        let here, prev, next, queue, tr1;
        if (ele) {
            if (ele.tagName.toLowerCase() !== 'input') {
                log('return pressed when current document is: ' + ele.tagName);
            }
            here = ele.subject;
            indent = kb.any(here, PAD('indent'));
            indent = indent ? Number(indent.value) : 0;
            if (before) {
                prev = kb.any(undefined, PAD('next'), here);
                next = here;
                queue = prev;
                queueProperty = 'newlinesAfter';
            }
            else {
                prev = here;
                next = kb.any(here, PAD('next'));
                queue = next;
                queueProperty = 'newlinesBefore';
            }
            tr1 = ele.parentNode;
        }
        else {
            prev = subject;
            next = subject;
            tr1 = undefined;
        }
        const chunk = newThing(padDoc);
        const label = chunk.uri.slice(-4);
        const del = [st(prev, PAD('next'), next, padDoc)];
        const ins = [
            st(prev, PAD('next'), chunk, padDoc),
            st(chunk, PAD('next'), next, padDoc),
            st(chunk, ns.dc('author'), me, padDoc),
            st(chunk, ns.sioc('content'), '', padDoc)
        ];
        if (indent > 0) {
            // Do not inherit
            ins.push(st(chunk, PAD('indent'), indent, padDoc));
        }
        log('    Fresh chunk ' + label + ' proposed');
        if (!updater) {
            throw new Error('no updater');
        }
        updater.update(del, ins, function (uri, ok, errorBody, _xhr) {
            if (!ok) {
                // alert("Error writing new line " + label + ": " + errorBody);
                log('    ERROR writing new line ' + label + ': ' + errorBody);
            }
            else {
                const newPart = newPartAfter(tr1, chunk, before);
                setPartStyle(newPart);
                newPart.focus(); // Note this is delayed
                if (queueProperty) {
                    log('    Fresh chunk ' +
                        label +
                        ' updated, queue = ' +
                        queue[queueProperty]);
                    queue[queueProperty] -= 1;
                    if (queue[queueProperty] > 0) {
                        log('    Implementing queued newlines = ' + next.newLinesBefore);
                        newChunk(newPart, before);
                    }
                }
            }
        });
    };
    const consistencyCheck = function () {
        const found = {};
        let failed = 0;
        function complain2(msg) {
            complain(msg);
            failed++;
        }
        if (!kb.the(subject, PAD('next'))) {
            complain2('No initial next pointer');
            return false; // can't do linked list
        }
        // var chunk = kb.the(subject, PAD('next'))
        let prev = subject;
        let chunk;
        for (;;) {
            chunk = kb.the(prev, PAD('next'));
            if (!chunk) {
                complain2('No next pointer from ' + prev);
            }
            if (chunk.sameTerm(subject)) {
                break;
            }
            prev = chunk;
            const label = chunk.uri.split('#')[1];
            if (found[chunk.uri]) {
                complain2('Loop!');
                return false;
            }
            found[chunk.uri] = true;
            let k = kb.each(chunk, PAD('next')).length;
            if (k !== 1) {
                complain2('Should be 1 not ' + k + ' next pointer for ' + label);
            }
            k = kb.each(chunk, PAD('indent')).length;
            if (k > 1) {
                complain2('Should be 0 or 1 not ' + k + ' indent for ' + label);
            }
            k = kb.each(chunk, ns.sioc('content')).length;
            if (k !== 1) {
                complain2('Should be 1 not ' + k + ' contents for ' + label);
            }
            k = kb.each(chunk, ns.dc('author')).length;
            if (k !== 1) {
                complain2('Should be 1 not ' + k + ' author for ' + label);
            }
            const sts = kb.statementsMatching(undefined, ns.sioc('contents'));
            sts.forEach(function (st) {
                if (!found[st.subject.value]) {
                    complain2('Loose chunk! ' + st.subject.value);
                }
            });
        }
        return !failed;
    };
    // Ensure that the display matches the current state of the
    // @@ TODO really need to refactor this so that we don't need to cast types
    const sync = function () {
        // var first = kb.the(subject, PAD('next'))
        if (kb.each(subject, PAD('next')).length !== 1) {
            const msg = 'Pad: Inconsistent data - NEXT pointers: ' +
                kb.each(subject, PAD('next')).length;
            log(msg);
            if (options.statusArea) {
                options.statusArea.textContent += msg;
            }
            return;
        }
        let row;
        // First see which of the logical chunks have existing physical manifestations
        const manif = [];
        // Find which lines correspond to existing chunks
        for (let chunk = kb.the(subject, PAD('next')); !chunk.sameTerm(subject); chunk = kb.the(chunk, PAD('next'))) {
            for (let i = 0; i < table.children.length; i++) {
                const tr = table.children[i];
                if (tr.firstChild) {
                    if (tr.firstChild.subject.sameTerm(chunk)) {
                        manif[chunk.uri] = tr.firstChild;
                    }
                }
            }
        }
        // Remove any deleted lines
        for (let i = table.children.length - 1; i >= 0; i--) {
            row = table.children[i];
            if (!manif[row.firstChild.subject.uri]) {
                table.removeChild(row);
            }
        }
        // Insert any new lines and update old ones
        row = table.firstChild; // might be null
        for (let chunk = kb.the(subject, PAD('next')); !chunk.sameTerm(subject); chunk = kb.the(chunk, PAD('next'))) {
            const text = kb.any(chunk, ns.sioc('content')).value;
            // superstitious -- don't mess with unchanged input fields
            // which may be selected by the user
            if (row && manif[chunk.uri]) {
                const part = row.firstChild;
                if (text !== part.value) {
                    part.value = text;
                }
                setPartStyle(part);
                part.state = 0; // Clear the state machine
                delete part.lastSent; // DEBUG ONLY
                row = row.nextSibling;
            }
            else {
                newPartAfter(row, chunk, true); // actually before
            }
        }
    };
    // Refresh the DOM tree
    const refreshTree = function (root) {
        if (root.refresh) {
            root.refresh();
            return;
        }
        for (let i = 0; i < root.children.length; i++) {
            refreshTree(root.children[i]);
        }
    };
    let reloading = false;
    const checkAndSync = function () {
        log('    reloaded OK');
        clearStatus();
        if (!consistencyCheck()) {
            complain('CONSISTENCY CHECK FAILED');
        }
        else {
            refreshTree(table);
        }
    };
    const reloadAndSync = function () {
        if (reloading) {
            log('   Already reloading - stop');
            return; // once only needed
        }
        reloading = true;
        let retryTimeout = 1000; // ms
        const tryReload = function () {
            log('try reload - timeout = ' + retryTimeout);
            if (!updater) {
                throw new Error('no updater');
            }
            updater.reload(updater.store, padDoc, function (ok, message, xhr) {
                reloading = false;
                if (ok) {
                    checkAndSync();
                }
                else {
                    if (xhr.status === 0) {
                        complain('Network error refreshing the pad. Retrying in ' +
                            retryTimeout / 1000);
                        reloading = true;
                        retryTimeout = retryTimeout * 2;
                        setTimeout(tryReload, retryTimeout);
                    }
                    else {
                        complain('Error ' +
                            xhr.status +
                            'refreshing the pad:' +
                            message +
                            '. Stopped. ' +
                            padDoc);
                    }
                }
            });
        };
        tryReload();
    };
    table.refresh = sync; // Catch downward propagating refresh events
    table.reloadAndSync = reloadAndSync;
    if (!me)
        log('Warning: must be logged in for pad to be edited');
    if (exists) {
        log('Existing pad.');
        if (consistencyCheck()) {
            sync();
            if (kb.holds(subject, PAD('next'), subject)) {
                // Empty list untenable
                newChunk(); // require at least one line
            }
        }
        else {
            log((table.textContent = 'Inconsistent data. Abort'));
        }
    }
    else {
        // Make new pad
        log('No pad exists - making new one.');
        const insertables = [
            st(subject, ns.rdf('type'), PAD('Notepad'), padDoc),
            st(subject, ns.dc('author'), me, padDoc),
            st(subject, ns.dc('created'), new Date(), padDoc),
            st(subject, PAD('next'), subject, padDoc)
        ];
        if (!updater) {
            throw new Error('no updater');
        }
        updater.update([], insertables, function (uri, ok, errorBody) {
            if (!ok) {
                complain(errorBody || '');
            }
            else {
                log('Initial pad created');
                newChunk(); // Add a first chunck
                // getResults();
            }
        });
    }
    return table;
}
/**
 * Get the chunks of the notepad
 * They are stored in a RDF linked list
 */
// @ignore exporting this only for the unit test
export function getChunks(subject, kb) {
    const chunks = [];
    for (let chunk = kb.the(subject, PAD('next')); !chunk.sameTerm(subject); chunk = kb.the(chunk, PAD('next'))) {
        chunks.push(chunk);
    }
    return chunks;
}
/**
 *  Encode content to be put in XML or HTML elements
 */
// @ignore exporting this only for the unit test
export function xmlEncode(str) {
    return str.replace('&', '&amp;').replace('<', '&lt;').replace('>', '&gt;');
}
/**
 * Convert a notepad to HTML
 *   @param { } pad - the notepad
 *   @param {store} pad - the data store
 */
export function notepadToHTML(pad, kb) {
    const chunks = getChunks(pad, kb);
    let html = '<html>\n  <head>\n';
    const title = kb.anyValue(pad, ns.dct('title'));
    if (title) {
        html += `    <title>${xmlEncode(title)}</title>\n`;
    }
    html += '  </head>\n  <body>\n';
    let level = 0;
    function increaseLevel(indent) {
        for (; level < indent; level++) {
            html += '<ul>\n';
        }
    }
    function decreaseLevel(indent) {
        for (; level > indent; level--) {
            html += '</ul>\n';
        }
    }
    chunks.forEach(chunk => {
        const indent = kb.anyJS(chunk, PAD('indent'));
        const rawContent = kb.anyJS(chunk, ns.sioc('content'));
        if (!rawContent)
            return; // seed chunk is dummy
        const content = xmlEncode(rawContent);
        if (indent < 0) { // negative indent levels represent heading levels
            decreaseLevel(0);
            const h = indent >= -3 ? 4 + indent : 1; // -1 -> h4, -2 -> h3
            html += `\n<h${h}>${content}</h${h}>\n`;
        }
        else { // >= 0
            if (indent > 0) { // Lists
                decreaseLevel(indent);
                increaseLevel(indent);
                html += `<li>${content}</li>\n`;
            }
            else { // indent 0
                decreaseLevel(indent);
                html += `<p>${content}</p>\n`;
            }
        }
    }); // foreach chunk
    // At the end decreaseLevel any open ULs
    decreaseLevel(0);
    html += '  </body>\n</html>\n';
    return html;
}
//# sourceMappingURL=pad.js.map