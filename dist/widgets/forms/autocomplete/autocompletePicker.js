/* Autocomplete Picker: Create and edit data using public data
**
** As the data source is passed as a parameter, all kinds of APIa and query services can be used
**
*/
import * as debug from '../../../debug';
import { style } from '../../../style';
import styleConstants from '../../../styleConstants';
import * as widgets from '../../../widgets';
import { store } from 'solid-logic';
import { queryPublicDataByName, bindingToTerm, AUTOCOMPLETE_LIMIT } from './publicData';
import { filterByLanguage, getPreferredLanguages, defaultPreferredLanguages } from './language';
const AUTOCOMPLETE_THRESHOLD = 4; // don't check until this many characters typed
const AUTOCOMPLETE_ROWS = 20; // 20?
const AUTOCOMPLETE_ROWS_STRETCH = 40;
export function setVisible(element, visible) {
    element.style.display = visible ? '' : 'none'; // Do not use visibility, it holds the real estate
}
// The core of the autocomplete UI
export async function renderAutoComplete(dom, acOptions, decoration, callback) {
    function complain(message) {
        const errorRow = table.appendChild(dom.createElement('tr'));
        debug.log(message);
        const err = new Error(message);
        errorRow.appendChild(widgets.errorMessageBlock(dom, err, 'pink'));
        // errorMessageBlock will log the stack to the console
        style.setStyle(errorRow, 'autocompleteRowStyle');
        errorRow.style.padding = '1em';
    }
    function finish(object, name) {
        debug.log('Auto complete: finish! ' + object);
        if (object.termType === 'Literal' && acOptions.queryParams.objectURIBase) {
            object = store.sym(acOptions.queryParams.objectURIBase.value + object.value);
        }
        // remove(decoration.cancelButton)
        // remove(decoration.acceptButton)
        // remove(div)
        clearList();
        callback(object, name);
    }
    async function gotIt(object, name) {
        if (decoration.acceptButton) {
            decoration.acceptButton.disbaled = false;
            setVisible(decoration.acceptButton, true); // now wait for confirmation
            searchInput.value = name.value; // complete it
            foundName = name;
            foundObject = object;
            debug.log('Auto complete: name: ' + name);
            debug.log('Auto complete: waiting for accept ' + object);
            clearList(); // This may be an option - nice and clean but does not allow change of mind
            return;
        }
        setVisible(decoration.cancelButton, true);
        finish(object, name);
    }
    async function acceptButtonHandler(_event) {
        if (foundName && searchInput.value === foundName.value) { // still
            finish(foundObject, foundName);
        }
    }
    async function cancelButtonHandler(_event) {
        debug.log('Auto complete: Canceled by user! ');
        if (acOptions.permanent) {
            initialize();
        }
        else {
            if (div.parentNode) {
                div.parentNode.removeChild(div);
            }
        }
    }
    function nameMatch(filter, candidate) {
        const parts = filter.split(' '); // Each name part must be somewhere
        for (let j = 0; j < parts.length; j++) {
            const word = parts[j];
            if (candidate.toLowerCase().indexOf(word) < 0)
                return false;
        }
        return true;
    }
    function clearList() {
        while (table.children.length > 1) {
            table.removeChild(table.lastChild);
        }
    }
    async function inputEventHHandler(_event) {
        // console.log('@@ AC inputEventHHandler called')
        setVisible(decoration.cancelButton, true); // only allow cancel when there is something to cancel
        refreshList(); /// @@  debounqce does not work with jest
        /*
        if (runningTimeout) {
          clearTimeout(runningTimeout)
        }
        runningTimeout = setTimeout(refreshList, AUTOCOMPLETE_DEBOUNCE_MS)
        */
    }
    async function loadBindingsAndFilterByLanguage(filter, languagePrefs) {
        // console.log('@@ loadBindingsAndFilterByLanguage ' + filter)
        let bindings;
        try {
            bindings = await queryPublicDataByName(filter, targetClass, languagePrefs || defaultPreferredLanguages, acOptions.queryParams);
        }
        catch (err) {
            complain('Error querying db of organizations: ' + err);
            inputEventHandlerLock = false;
            return;
        }
        loadedEnough = bindings.length < AUTOCOMPLETE_LIMIT;
        if (loadedEnough) {
            lastFilter = filter;
        }
        else {
            lastFilter = undefined;
        }
        clearList();
        const slimmed = filterByLanguage(bindings, languagePrefs);
        return slimmed;
    }
    function filterByName(filter, bindings) {
        return bindings.filter(binding => nameMatch(filter, binding.name.value));
    }
    async function refreshList() {
        // console.log('@@ refreshList called')
        function rowForBinding(binding) {
            const row = dom.createElement('tr');
            style.setStyle(row, 'autocompleteRowStyle');
            row.setAttribute('style', 'padding: 0.3em;');
            row.style.color = allDisplayed ? '#080' : '#088'; // green means 'you should find it here'
            row.textContent = binding.name.value;
            const object = bindingToTerm(binding.subject);
            const nameTerm = bindingToTerm(binding.name);
            row.addEventListener('click', async (_event) => {
                debug.log('       click row textContent: ' + row.textContent);
                debug.log('       click name: ' + nameTerm.value);
                if (object && nameTerm) {
                    gotIt(object, nameTerm);
                }
            });
            return row;
        } // rowForBinding
        function compareBindingsByName(self, other) {
            return other.name.value > self.name.value
                ? 1
                : other.name.name < self.name.value ? -1 : 0;
        }
        if (inputEventHandlerLock) {
            debug.log(`Ignoring "${searchInput.value}" because of lock `);
            return;
        }
        debug.log(`Setting lock at "${searchInput.value}"`);
        inputEventHandlerLock = true;
        const languagePrefs = await getPreferredLanguages();
        const filter = searchInput.value.trim().toLowerCase();
        if (filter.length < AUTOCOMPLETE_THRESHOLD) { // too small
            clearList();
            // candidatesLoaded = false
            numberOfRows = AUTOCOMPLETE_ROWS;
        }
        else {
            if (!allDisplayed || !lastFilter || !filter.startsWith(lastFilter)) {
                debug.log(`   Querying database at "${filter}" cf last "${lastFilter}".`);
                lastBindings = await loadBindingsAndFilterByLanguage(filter, languagePrefs); // freesh query
            }
            // Trim table as search gets tighter:
            const slimmed = filterByName(filter, lastBindings);
            if (loadedEnough && slimmed.length <= AUTOCOMPLETE_ROWS_STRETCH) {
                numberOfRows = slimmed.length; // stretch if it means we get all items
            }
            allDisplayed = loadedEnough && slimmed.length <= numberOfRows;
            debug.log(` Filter:"${filter}" lastBindings: ${lastBindings.length}, slimmed to ${slimmed.length}; rows: ${numberOfRows}, Enough? ${loadedEnough}, All displayed? ${allDisplayed}`);
            const displayable = slimmed.slice(0, numberOfRows);
            displayable.sort(compareBindingsByName);
            clearList();
            for (const binding of displayable) {
                table.appendChild(rowForBinding(binding));
            }
            if (slimmed.length === 1) {
                gotIt(bindingToTerm(slimmed[0].subject), bindingToTerm(slimmed[0].name));
            }
        } // else
        inputEventHandlerLock = false;
    } // refreshList
    function initialize() {
        if (acOptions.currentObject) { // If have existing value then jump into the endgame of the autocomplete
            searchInput.value = acOptions.currentName ? acOptions.currentName.value : '??? wot no name for ' + acOptions.currentObject;
            foundName = acOptions.currentName;
            lastFilter = acOptions.currentName ? acOptions.currentName.value : undefined;
            foundObject = acOptions.currentObject;
        }
        else {
            searchInput.value = '';
            lastFilter = undefined;
            foundObject = undefined;
        }
        if (decoration.deleteButton) {
            setVisible(decoration.deleteButton, !!acOptions.currentObject);
        }
        if (decoration.acceptButton) {
            setVisible(decoration.acceptButton, false); // hide until input complete
        }
        if (decoration.editButton) {
            setVisible(decoration.editButton, true);
        }
        if (decoration.cancelButton) {
            setVisible(decoration.cancelButton, false); // only allow cancel when there is something to cancel
        }
        inputEventHandlerLock = false;
        clearList();
    } // initialiize
    // const queryParams: QueryParameters = acOptions.queryParams
    const targetClass = acOptions.targetClass;
    if (!targetClass)
        throw new Error('renderAutoComplete: missing targetClass');
    // console.log(`renderAutoComplete: targetClass=${targetClass}` )
    if (decoration.acceptButton) {
        decoration.acceptButton.addEventListener('click', acceptButtonHandler, false);
    }
    if (decoration.cancelButton) {
        decoration.cancelButton.addEventListener('click', cancelButtonHandler, false);
    }
    // var candidatesLoaded = false
    let lastBindings;
    let loadedEnough = false;
    let inputEventHandlerLock = false;
    let allDisplayed = false;
    let lastFilter = undefined;
    let numberOfRows = AUTOCOMPLETE_ROWS; // this gets slimmed down
    const div = dom.createElement('div');
    let foundName = undefined; // once found accepted string must match this
    let foundObject = undefined;
    const table = div.appendChild(dom.createElement('table'));
    table.setAttribute('data-testid', 'autocomplete-table');
    table.setAttribute('style', 'max-width: 30em; margin: 0.5em;');
    const head = table.appendChild(dom.createElement('tr'));
    style.setStyle(head, 'autocompleteRowStyle'); // textInputStyle or
    const cell = head.appendChild(dom.createElement('td'));
    const searchInput = cell.appendChild(dom.createElement('input'));
    searchInput.setAttribute('type', 'text');
    initialize();
    const size = acOptions.size || styleConstants.textInputSize || 20;
    searchInput.setAttribute('size', size);
    searchInput.setAttribute('data-testid', 'autocomplete-input');
    const searchInputStyle = style.textInputStyle || // searchInputStyle ?
        'border: 0.1em solid #444; border-radius: 0.5em; width: 100%; font-size: 100%; padding: 0.1em 0.6em'; // @
    searchInput.setAttribute('style', searchInputStyle);
    searchInput.addEventListener('keyup', function (event) {
        if (event.keyCode === 13) {
            acceptButtonHandler(event);
        }
    }, false);
    searchInput.addEventListener('input', inputEventHHandler);
    // console.log('@@ renderAutoComplete returns ' + div.innerHTML)
    return div;
} // renderAutoComplete
// ENDS
//# sourceMappingURL=autocompletePicker.js.map