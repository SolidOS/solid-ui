import { solidLogicSingleton } from 'solid-logic';
import { debug } from '../../log';
import { errorMessageBlock } from '../error';
const store = solidLogicSingleton.store;
export const field = {}; // Form field functions by URI of field type.
/**
 * Which class of field is this? Relies on http://www.w3.org/2000/01/rdf-schema#subClassOf and
 * https://linkeddata.github.io/rdflib.js/doc/classes/formula.html#bottomtypeuris
 * to find the most specific RDF type if there are multiple.
 *
 * @param x a form field, e.g. `namedNode('https://timbl.com/timbl/Public/Test/Forms/individualForm.ttl#fullNameField')`
 * @returns the URI of the most specific known class, e.g. `http://www.w3.org/ns/ui#SingleLineTextField`
 */
export function mostSpecificClassURI(x) {
    const kb = store;
    const ft = kb.findTypeURIs(x);
    const bot = kb.bottomTypeURIs(ft); // most specific
    const bots = [];
    for (const b in bot)
        bots.push(b);
    // if (bots.length > 1) throw "Didn't expect "+x+" to have multiple bottom types: "+bots
    return bots[0];
}
/**
 * Returns a function that creates a form widget
 * @param dom unused
 * @param fieldInQuestion the field for which to create a form, e.g. namedNode('https://timbl.com/timbl/Public/Test/Forms/individualForm.ttl#fullNameField')
 */
export function fieldFunction(dom /* unused */, fieldInQuestion) {
    const uri = mostSpecificClassURI(fieldInQuestion); // What type
    // const uri = field.uri
    const fun = field[uri];
    debug('paneUtils: Going to implement field ' + fieldInQuestion + ' of type ' + uri);
    if (!fun) {
        return function (dom2, container) {
            const box = errorMessageBlock(dom2, 'No handler for field ' + fieldInQuestion + ' of type ' + uri);
            if (container)
                container.appendChild(box);
            return box;
        };
    }
    return fun;
}
//# sourceMappingURL=fieldFunction.js.map