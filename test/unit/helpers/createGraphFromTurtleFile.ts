import { IndexedFormula } from 'rdflib'
import { getFileContent } from './getFileContent'
import { createGraphFromTurtle } from './createGraphFromTurtle'

export async function createGraphFromTurtleFile (filePath: string, graphUri: string): Promise<IndexedFormula> {
  const turtle = await getFileContent(filePath)
  return createGraphFromTurtle(turtle, graphUri)
}
