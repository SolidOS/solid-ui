import { graph, IndexedFormula, parse } from 'rdflib'

export async function createGraphFromTurtle (turtle: string, graphUri: string): Promise<IndexedFormula> {
  const store = graph()
  return new Promise((resolve, reject) => parse(turtle, store, graphUri, 'text/turtle', error => {
    if (error) reject(error)
    resolve(store)
  }))
}
