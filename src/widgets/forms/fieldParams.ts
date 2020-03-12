import ns from '../../ns'

export const fieldParams = {}

/**
 * Text field
 *
 * For possible date popups see e.g. http://www.dynamicdrive.com/dynamicindex7/jasoncalendar.htm
 * or use HTML5: http://www.w3.org/TR/2011/WD-html-markup-20110113/input.date.html
 */
fieldParams[ns.ui('ColorField').uri] = {
  size: 9,
  type: 'color',
  dt: 'color'
} // https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/color
fieldParams[
  ns.ui('ColorField').uri
].pattern = /^\s*#[0-9a-f][0-9a-f][0-9a-f][0-9a-f][0-9a-f][0-9a-f]([0-9a-f][0-9a-f])?\s*$/

fieldParams[ns.ui('DateField').uri] = {
  size: 20,
  type: 'date',
  dt: 'date'
}
fieldParams[
  ns.ui('DateField').uri
].pattern = /^\s*[0-9][0-9][0-9][0-9](-[0-1]?[0-9]-[0-3]?[0-9])?Z?\s*$/

fieldParams[ns.ui('DateTimeField').uri] = {
  size: 20,
  type: 'date',
  dt: 'dateTime'
}
fieldParams[
  ns.ui('DateTimeField').uri
].pattern = /^\s*[0-9][0-9][0-9][0-9](-[0-1]?[0-9]-[0-3]?[0-9])?(T[0-2][0-9]:[0-5][0-9](:[0-5][0-9])?)?Z?\s*$/

fieldParams[ns.ui('TimeField').uri] = {
  size: 10,
  type: 'time',
  dt: 'time'
}
fieldParams[
  ns.ui('TimeField').uri
].pattern = /^\s*([0-2]?[0-9]:[0-5][0-9](:[0-5][0-9])?)\s*$/

fieldParams[ns.ui('IntegerField').uri] = {
  size: 12,
  style: 'text-align: right',
  dt: 'integer'
}
fieldParams[ns.ui('IntegerField').uri].pattern = /^\s*-?[0-9]+\s*$/

fieldParams[ns.ui('DecimalField').uri] = {
  size: 12,
  style: 'text-align: right',
  dt: 'decimal'
}
fieldParams[
  ns.ui('DecimalField').uri
].pattern = /^\s*-?[0-9]*(\.[0-9]*)?\s*$/

fieldParams[ns.ui('FloatField').uri] = {
  size: 12,
  style: 'text-align: right',
  dt: 'float'
}
fieldParams[
  ns.ui('FloatField').uri
].pattern = /^\s*-?[0-9]*(\.[0-9]*)?((e|E)-?[0-9]*)?\s*$/

fieldParams[ns.ui('SingleLineTextField').uri] = {}
fieldParams[ns.ui('NamedNodeURIField').uri] = { namedNode: true }
fieldParams[ns.ui('TextField').uri] = {}

fieldParams[ns.ui('PhoneField').uri] = { size: 20, uriPrefix: 'tel:' }
fieldParams[ns.ui('PhoneField').uri].pattern = /^\+?[\d-]+[\d]*$/

fieldParams[ns.ui('EmailField').uri] = {
  size: 30,
  uriPrefix: 'mailto:'
}
fieldParams[ns.ui('EmailField').uri].pattern = /^\s*.*@.*\..*\s*$/ // @@ Get the right regexp here
