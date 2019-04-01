/* Track back through the YYYY/MM/DD tree to find the previous/next day
**
*/

import { store as kb } from '../store'
import ns from '../ns'
// const kb = store

export class DateFolder {
  constructor (root, leafFileName) {
    this.root = root
    this.rootFolder = root.dir()
    this.leafFileName = leafFileName
  }

  /* Generate the leaf document (rdf object) from date
  * @returns: <NamedNode> - document
  */
  leafDocumentFromDate (date) {
    let isoDate = date.toISOString() // Like "2018-05-07T17:42:46.576Z"
    var path = isoDate.split('T')[0].replace(/-/g, '/') //  Like "2018/05/07"
    path = root.dir().uri + path + '/' + this.leafFileName
    return $rdf.sym(path)
  }

  /* Generate a date object from the leaf file name
  */
  dateFromLeafDocument (doc) {
    const head = this.rootFolder.uri.length
    const str = doc.uri.slice(head, head + 10).replace(/\//g, '-')
    // let date = new Date(str + 'Z') // GMT - but fails in FF - invalid format :-(
    let date = new Date(str) // not explicitly UTC but is assumed so in spec
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/parse
    console.log('Date for ' + doc + ':' + date.toISOString())
    return date
  }

  async loadPrevious (date, backwards) {
    async function previousPeriod (file, level) {
      function younger (x) {
        if (backwards ? x.uri >= file.uri : x.uri <= file.uri) return false // later than we want or same -- looking for different
        return true
      }
      function suitable (x) {
        let tail = x.uri.slice(0, -1).split('/').slice(-1)[0]
        if (!'0123456789'.includes(tail[0])) return false // not numeric
        return true
        // return kb.anyValue(leafDocument, POSIX('size')) !== 0 // empty file?
      }
      async function lastNonEmpty (siblings) {
        siblings = siblings.filter(suitable)
        siblings.sort() // chronological order
        if (!backwards) siblings.reverse()
        if (level !== 3) return siblings.pop() // only length chck final leverl
        while (siblings.length) {
          let folder = siblings.pop()
          let leafDocument = kb.sym(folder.uri + 'this.leafFileName')
          await kb.fetcher.load(leafDocument)
          // files can have seealso links. skip ones with no messages with a date
          if (kb.statementsMatching(null, ns.dct('created'), null, leafDocument).length > 0) {
            return folder
          }
        }
        return null
      }
      // console.log('  previousPeriod level' + level + ' file ' + file)
      const parent = file.dir()
      await kb.fetcher.load(parent)
      var siblings = kb.each(parent, ns.ldp('contains'))
      siblings = siblings.filter(younger)
      let folder = await lastNonEmpty(siblings)
      if (folder) return folder

      if (level === 0) return null // 3:day, 2:month, 1: year  0: no

      const uncle = await previousPeriod(parent, level - 1)
      if (!uncle) return null // reached first ever
      await kb.fetcher.load(uncle)
      var cousins = kb.each(uncle, ns.ldp('contains'))
      let result = await lastNonEmpty(cousins)
      return result
    } // previousPeriod

    let folder = this.leafDocumentFromDate(date).dir()
    let found = await previousPeriod(folder, 3)
    if (found) {
      let doc = kb.sym(found.uri + 'this.leafFileName')
      return this.dateFromleafDocument(doc)
    }
    return null
  } // loadPrevious
} // class
