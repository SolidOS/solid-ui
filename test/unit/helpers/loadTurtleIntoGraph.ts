import { IndexedFormula, parse } from 'rdflib'

export async function loadTurtleIntoGraph (rawText: string, graphUri: string, graph: IndexedFormula): Promise<void> {
  return new Promise((resolve, reject) => parse(rawText, graph, graphUri, 'text/turtle', error => {
    if (error) return reject(error)
    resolve()
  }))
}
