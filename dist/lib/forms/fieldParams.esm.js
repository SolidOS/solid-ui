import e from "../ns.esm.js";
import { style as t } from "../style.esm.js";
//#region src/lib/forms/fieldParams.ts
var n = {
	[e.ui("ColorField").uri]: {
		size: 9,
		type: "color",
		style: "height: 3em;",
		dt: "color",
		pattern: /^\s*#[0-9a-f][0-9a-f][0-9a-f][0-9a-f][0-9a-f][0-9a-f]([0-9a-f][0-9a-f])?\s*$/
	},
	[e.ui("DateField").uri]: {
		size: 20,
		type: "date",
		dt: "date",
		pattern: /^\s*[0-9][0-9][0-9][0-9](-[0-1]?[0-9]-[0-3]?[0-9])?Z?\s*$/
	},
	[e.ui("DateTimeField").uri]: {
		size: 20,
		type: "datetime-local",
		dt: "dateTime",
		pattern: /^\s*[0-9][0-9][0-9][0-9](-[0-1]?[0-9]-[0-3]?[0-9])?(T[0-2][0-9]:[0-5][0-9](:[0-5][0-9])?)?Z?\s*$/
	},
	[e.ui("TimeField").uri]: {
		size: 10,
		type: "time",
		dt: "time",
		pattern: /^\s*([0-2]?[0-9]:[0-5][0-9](:[0-5][0-9])?)\s*$/
	},
	[e.ui("IntegerField").uri]: {
		size: 12,
		style: "text-align: right;",
		dt: "integer",
		pattern: /^\s*-?[0-9]+\s*$/
	},
	[e.ui("DecimalField").uri]: {
		size: 12,
		style: "text-align: right;",
		dt: "decimal",
		pattern: /^\s*-?[0-9]*(\.[0-9]*)?\s*$/
	},
	[e.ui("FloatField").uri]: {
		size: 12,
		style: "text-align: right;",
		dt: "float",
		pattern: /^\s*-?[0-9]*(\.[0-9]*)?((e|E)-?[0-9]*)?\s*$/
	},
	[e.ui("SingleLineTextField").uri]: {},
	[e.ui("NamedNodeURIField").uri]: { namedNode: !0 },
	[e.ui("TextField").uri]: {},
	[e.ui("PhoneField").uri]: {
		size: 20,
		defaultInputValue: "tel:",
		pattern: /^\+?[\d-]+[\d]*$/
	},
	[e.ui("EmailField").uri]: {
		size: 30,
		defaultInputValue: "mailto:",
		pattern: /^\s*.*@.*\..*\s*$/
	},
	[e.ui("Group").uri]: { style: t.formGroupStyle },
	[e.ui("Comment").uri]: {
		element: "p",
		style: t.commentStyle
	},
	[e.ui("Heading").uri]: {
		element: "h3",
		style: t.formHeadingStyle
	}
};
//#endregion
export { n as fieldParams };

//# sourceMappingURL=fieldParams.esm.js.map