/**
 * Contains the [[AccessGroups]]
 * and [[AccessGroupsOptions]] classes
 * @packageDocumentation
 */
import { sym } from 'rdflib';
import { ACLbyCombination, readACL } from './acl';
import * as widgets from '../widgets';
import ns from '../ns';
import { AddAgentButtons } from './add-agent-buttons';
import * as debug from '../debug';
import { style } from '../style';
const ACL = ns.acl;
const COLLOQUIAL = {
    13: 'Owners',
    9: 'Owners (write locked)',
    5: 'Editors',
    3: 'Posters',
    2: 'Submitters',
    1: 'Viewers'
};
const RECOMMENDED = {
    13: true,
    5: true,
    3: true,
    2: true,
    1: true
};
const EXPLANATION = {
    13: 'can read, write, and control sharing.',
    9: 'can read and control sharing, currently write-locked.',
    5: 'can read and change information',
    3: 'can add new information, and read but not change existing information',
    2: 'can add new information but not read any',
    1: 'can read but not change information'
};
/**
 * Renders the table of Owners, Editors, Posters, Submitters, Viewers
 * for https://github.com/solidos/userguide/blob/main/views/sharing/userguide.md
 */
export class AccessGroups {
    constructor(doc, aclDoc, controller, store, // @@ was LiveStore
    _options = {}) {
        this.doc = doc;
        this.aclDoc = aclDoc;
        this.controller = controller;
        this._options = _options;
        this.defaults = this._options.defaults || false;
        this._store = store;
        this.aclMap = readACL(doc, aclDoc, store, this.defaults);
        this.byCombo = ACLbyCombination(this.aclMap);
        this.addAgentButton = new AddAgentButtons(this);
        this.rootElement = this.controller.dom.createElement('div');
        this.rootElement.setAttribute('style', style.accessGroupList);
    }
    get store() {
        return this._store;
    }
    set store(store) {
        this._store = store;
        this.aclMap = readACL(this.doc, this.aclDoc, store, this.defaults);
        this.byCombo = ACLbyCombination(this.aclMap);
    }
    render() {
        this.rootElement.innerHTML = '';
        this.renderGroups().forEach(group => this.rootElement.appendChild(group));
        if (this.controller.isEditable) {
            this.rootElement.appendChild(this.addAgentButton.render());
        }
        return this.rootElement;
    }
    renderGroups() {
        const groupElements = [];
        for (let comboIndex = 15; comboIndex > 0; comboIndex--) {
            const combo = kToCombo(comboIndex);
            if ((this.controller.isEditable && RECOMMENDED[comboIndex]) || this.byCombo[combo]) {
                groupElements.push(this.renderGroup(comboIndex, combo));
            }
        }
        return groupElements;
    }
    renderGroup(comboIndex, combo) {
        const groupRow = this.controller.dom.createElement('div');
        groupRow.setAttribute('style', style.accessGroupListItem);
        widgets.makeDropTarget(groupRow, (uris) => this.handleDroppedUris(uris, combo)
            .then(() => this.controller.render())
            .catch(error => this.controller.renderStatus(error)));
        const groupColumns = this.renderGroupElements(comboIndex, combo);
        groupColumns.forEach(column => groupRow.appendChild(column));
        return groupRow;
    }
    renderGroupElements(comboIndex, combo) {
        const groupNameColumn = this.controller.dom.createElement('div');
        groupNameColumn.setAttribute('style', style.group);
        if (this.controller.isEditable) {
            switch (comboIndex) {
                case 1:
                    groupNameColumn.setAttribute('style', style.group1);
                    break;
                case 2:
                    groupNameColumn.setAttribute('style', style.group2);
                    break;
                case 3:
                    groupNameColumn.setAttribute('style', style.group3);
                    break;
                case 5:
                    groupNameColumn.setAttribute('style', style.group5);
                    break;
                case 9:
                    groupNameColumn.setAttribute('style', style.group9);
                    break;
                case 13:
                    groupNameColumn.setAttribute('style', style.group13);
                    break;
                default:
                    groupNameColumn.setAttribute('style', style.group);
            }
        }
        groupNameColumn.innerText = COLLOQUIAL[comboIndex] || ktToList(comboIndex);
        const groupAgentsColumn = this.controller.dom.createElement('div');
        groupAgentsColumn.setAttribute('style', style.group);
        if (this.controller.isEditable) {
            switch (comboIndex) {
                case 1:
                    groupAgentsColumn.setAttribute('style', style.group1);
                    break;
                case 2:
                    groupAgentsColumn.setAttribute('style', style.group2);
                    break;
                case 3:
                    groupAgentsColumn.setAttribute('style', style.group3);
                    break;
                case 5:
                    groupAgentsColumn.setAttribute('style', style.group5);
                    break;
                case 9:
                    groupAgentsColumn.setAttribute('style', style.group9);
                    break;
                case 13:
                    groupAgentsColumn.setAttribute('style', style.group13);
                    break;
                default:
                    groupAgentsColumn.setAttribute('style', style.group);
            }
        }
        const groupAgentsTable = groupAgentsColumn.appendChild(this.controller.dom.createElement('table'));
        const combos = this.byCombo[combo] || [];
        combos
            .map(([pred, obj]) => this.renderAgent(groupAgentsTable, combo, pred, obj))
            .forEach(agentElement => groupAgentsTable.appendChild(agentElement));
        const groupDescriptionElement = this.controller.dom.createElement('div');
        groupDescriptionElement.setAttribute('style', style.group);
        if (this.controller.isEditable) {
            switch (comboIndex) {
                case 1:
                    groupDescriptionElement.setAttribute('style', style.group1);
                    break;
                case 2:
                    groupDescriptionElement.setAttribute('style', style.group2);
                    break;
                case 3:
                    groupDescriptionElement.setAttribute('style', style.group3);
                    break;
                case 5:
                    groupDescriptionElement.setAttribute('style', style.group5);
                    break;
                case 9:
                    groupDescriptionElement.setAttribute('style', style.group9);
                    break;
                case 13:
                    groupDescriptionElement.setAttribute('style', style.group13);
                    break;
                default:
                    groupDescriptionElement.setAttribute('style', style.group);
            }
        }
        groupDescriptionElement.innerText = EXPLANATION[comboIndex] || 'Unusual combination';
        return [groupNameColumn, groupAgentsColumn, groupDescriptionElement];
    }
    renderAgent(groupAgentsTable, combo, pred, obj) {
        const personRow = widgets.personTR(this.controller.dom, ACL(pred), sym(obj), this.controller.isEditable
            ? {
                deleteFunction: () => this.deleteAgent(combo, pred, obj)
                    .then(() => groupAgentsTable.removeChild(personRow))
                    .catch(error => this.controller.renderStatus(error))
            }
            : {});
        return personRow;
    }
    async deleteAgent(combo, pred, obj) {
        const combos = this.byCombo[combo] || [];
        const comboToRemove = combos.find(([comboPred, comboObj]) => comboPred === pred && comboObj === obj);
        if (comboToRemove) {
            combos.splice(combos.indexOf(comboToRemove), 1);
        }
        await this.controller.save();
    }
    async addNewURI(uri) {
        await this.handleDroppedUri(uri, kToCombo(1));
        await this.controller.save();
    }
    async handleDroppedUris(uris, combo) {
        try {
            await Promise.all(uris.map(uri => this.handleDroppedUri(uri, combo)));
            await this.controller.save();
        }
        catch (error) {
            return Promise.reject(error);
        }
    }
    async handleDroppedUri(uri, combo, secondAttempt = false) {
        var _a, _b;
        const agent = findAgent(uri, this.store); // eg 'agent', 'origin', agentClass'
        const thing = sym(uri);
        if (!agent && !secondAttempt) {
            debug.log(`   Not obvious: looking up dropped thing ${thing}`);
            try {
                await ((_b = (_a = this._store) === null || _a === void 0 ? void 0 : _a.fetcher) === null || _b === void 0 ? void 0 : _b.load(thing.doc()));
            }
            catch (error) {
                const message = `Ignore error looking up dropped thing: ${error}`;
                debug.error(message);
                return Promise.reject(new Error(message));
            }
            return this.handleDroppedUri(uri, combo, true);
        }
        else if (!agent) {
            const error = `   Error: Drop fails to drop appropriate thing! ${uri}`;
            debug.error(error);
            return Promise.reject(new Error(error));
        }
        this.setACLCombo(combo, uri, agent, this.controller.subject);
    }
    setACLCombo(combo, uri, res, subject) {
        if (!(combo in this.byCombo)) {
            this.byCombo[combo] = [];
        }
        this.removeAgentFromCombos(uri); // Combos are mutually distinct
        this.byCombo[combo].push([res.pred, res.obj.uri]);
        debug.log(`ACL: setting access to ${subject} by ${res.pred}: ${res.obj}`);
    }
    removeAgentFromCombos(uri) {
        for (let k = 0; k < 16; k++) {
            const combos = this.byCombo[kToCombo(k)];
            if (combos) {
                for (let i = 0; i < combos.length; i++) {
                    while (i < combos.length && combos[i][1] === uri) {
                        combos.splice(i, 1);
                    }
                }
            }
        }
    }
}
function kToCombo(k) {
    const y = ['Read', 'Append', 'Write', 'Control'];
    const combo = [];
    for (let i = 0; i < 4; i++) {
        if (k & (1 << i)) {
            combo.push('http://www.w3.org/ns/auth/acl#' + y[i]);
        }
    }
    combo.sort();
    return combo.join('\n');
}
function ktToList(k) {
    let list = '';
    const y = ['Read', 'Append', 'Write', 'Control'];
    for (let i = 0; i < 4; i++) {
        if (k & (1 << i)) {
            list += y[i];
        }
    }
    return list;
}
function findAgent(uri, kb) {
    const obj = sym(uri);
    const types = kb.findTypeURIs(obj);
    for (const ty in types) {
        debug.log('    drop object type includes: ' + ty);
    }
    // An Origin URI is one like https://fred.github.io eith no trailing slash
    if (uri.startsWith('http') && uri.split('/').length === 3) {
        // there is no third slash
        return { pred: 'origin', obj }; // The only way to know an origin alas
    }
    // @@ This is an almighty kludge needed because drag and drop adds extra slashes to origins
    if (uri.startsWith('http') &&
        uri.split('/').length === 4 &&
        uri.endsWith('/')) {
        // there  IS third slash
        debug.log('Assuming final slash on dragged origin URI was unintended!');
        return { pred: 'origin', obj: sym(uri.slice(0, -1)) }; // Fix a URI where the drag and drop system has added a spurious slash
    }
    if (ns.vcard('WebID').uri in types)
        return { pred: 'agent', obj };
    if (ns.vcard('Group').uri in types) {
        return { pred: 'agentGroup', obj }; // @@ note vcard membership not RDFs
    }
    if (obj.sameTerm(ns.foaf('Agent')) ||
        obj.sameTerm(ns.acl('AuthenticatedAgent')) || // AuthenticatedAgent
        obj.sameTerm(ns.rdf('Resource')) ||
        obj.sameTerm(ns.owl('Thing'))) {
        return { pred: 'agentClass', obj };
    }
    if (ns.vcard('Individual').uri in types ||
        ns.foaf('Person').uri in types ||
        ns.foaf('Agent').uri in types) {
        const pref = kb.any(obj, ns.foaf('preferredURI'));
        if (pref)
            return { pred: 'agent', obj: sym(pref) };
        return { pred: 'agent', obj };
    }
    if (ns.solid('AppProvider').uri in types) {
        return { pred: 'origin', obj };
    }
    if (ns.solid('AppProviderClass').uri in types) {
        return { pred: 'originClass', obj };
    }
    debug.log('    Triage fails for ' + uri);
    return null;
}
//# sourceMappingURL=access-groups.js.map