import { IndexedFormula, NamedNode, parse } from 'rdflib'
import { getFileContent } from './getFileContent'
import { loadTurtleIntoGraph } from './loadTurtleIntoGraph'

export async function loadTurtleFileIntoGraph (serializationPath: string, graphUri: string, graph: IndexedFormula): Promise<void> {
  const rawText = await getFileContent(serializationPath)
  return loadTurtleIntoGraph(rawText, graphUri, graph)
}
