import ns from '../../ns';
import { style } from '../../style';
/**
 * The fieldParams object defines various constants
 * for use in various form fields. Depending on the
 * field in questions, different values may be read
 * from here.
 */
export const fieldParams = {
    /**
     * Text field
     *
     * For possible date popups see e.g. http://www.dynamicdrive.com/dynamicindex7/jasoncalendar.htm
     * or use HTML5: http://www.w3.org/TR/2011/WD-html-markup-20110113/input.date.html
     */
    [ns.ui('ColorField').uri]: {
        size: 9,
        type: 'color',
        style: 'height: 3em;', // around 1.5em is padding
        dt: 'color',
        pattern: /^\s*#[0-9a-f][0-9a-f][0-9a-f][0-9a-f][0-9a-f][0-9a-f]([0-9a-f][0-9a-f])?\s*$/
    }, // https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/color
    [ns.ui('DateField').uri]: {
        size: 20,
        type: 'date',
        dt: 'date',
        pattern: /^\s*[0-9][0-9][0-9][0-9](-[0-1]?[0-9]-[0-3]?[0-9])?Z?\s*$/
    },
    [ns.ui('DateTimeField').uri]: {
        size: 20,
        type: 'datetime-local', // See https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/datetime
        dt: 'dateTime',
        pattern: /^\s*[0-9][0-9][0-9][0-9](-[0-1]?[0-9]-[0-3]?[0-9])?(T[0-2][0-9]:[0-5][0-9](:[0-5][0-9])?)?Z?\s*$/
    },
    [ns.ui('TimeField').uri]: {
        size: 10,
        type: 'time',
        dt: 'time',
        pattern: /^\s*([0-2]?[0-9]:[0-5][0-9](:[0-5][0-9])?)\s*$/
    },
    [ns.ui('IntegerField').uri]: {
        size: 12,
        style: 'text-align: right;',
        dt: 'integer',
        pattern: /^\s*-?[0-9]+\s*$/
    },
    [ns.ui('DecimalField').uri]: {
        size: 12,
        style: 'text-align: right;',
        dt: 'decimal',
        pattern: /^\s*-?[0-9]*(\.[0-9]*)?\s*$/
    },
    [ns.ui('FloatField').uri]: {
        size: 12,
        style: 'text-align: right;',
        dt: 'float',
        pattern: /^\s*-?[0-9]*(\.[0-9]*)?((e|E)-?[0-9]*)?\s*$/
    },
    [ns.ui('SingleLineTextField').uri]: {},
    [ns.ui('NamedNodeURIField').uri]: {
        namedNode: true
    },
    [ns.ui('TextField').uri]: {},
    [ns.ui('PhoneField').uri]: {
        size: 20,
        uriPrefix: 'tel:',
        pattern: /^\+?[\d-]+[\d]*$/
    },
    [ns.ui('EmailField').uri]: {
        size: 30,
        uriPrefix: 'mailto:',
        pattern: /^\s*.*@.*\..*\s*$/ // @@ Get the right regexp here
    },
    [ns.ui('Group').uri]: {
        style: style.formGroupStyle
    },
    /**
     * Non-interactive fields
     */
    [ns.ui('Comment').uri]: {
        element: 'p',
        style: style.commentStyle
    },
    [ns.ui('Heading').uri]: {
        element: 'h3',
        style: style.formHeadingStyle
    }
};
//# sourceMappingURL=fieldParams.js.map