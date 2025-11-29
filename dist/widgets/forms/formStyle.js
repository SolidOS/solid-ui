import ns from '../../ns';
import { store } from 'solid-logic';
import { fieldParams } from './fieldParams';
import { mostSpecificClassURI } from './fieldFunction';
const STYLE_URI_PREFIX = 'https://www.w3.org/ns/css#';
export function setFieldStyle(ele, field) {
    const classUri = mostSpecificClassURI(field);
    const params = fieldParams[classUri] || {};
    const style = store.any(field, ns.ui('style'));
    if (!style) {
        if (params.style) {
            ele.setAttribute('style', params.style);
        }
        return;
    }
    if (style.termType === 'Literal') {
        if (style)
            ele.setAttribute('style', style.value);
    }
    else {
        const sts = store.statementsMatching(style, null, null, field.doc());
        sts.forEach(st => {
            if (st.predicate.uri && st.predicate.uri.startsWith(STYLE_URI_PREFIX)) {
                const cssAttribute = st.predicate.uri.slice(STYLE_URI_PREFIX.length);
                try {
                    ele.style[cssAttribute] = st.object.value;
                }
                catch (_err) {
                    console.warn(`setFieldStyle: Error setting element style ${cssAttribute} to "${st.object.value}"`);
                    console.warn(`setFieldStyle:   ... Element tagName was "${ele.tagName || '???'}"`);
                }
            }
        });
    }
}
//# sourceMappingURL=formStyle.js.map