import { IndexedFormula } from 'rdflib'

export function toContainGraph (received: IndexedFormula, expected: IndexedFormula) {
  const receivedStatements = received.statements.slice()
  const expectedStatements = expected.statements.slice()
  const diffStatements = expectedStatements.filter(st => !received.holds(st.subject, st.predicate, st.object, st.graph))
  return {
    pass: diffStatements.length === 0,
    message: () => `Statements in expected graph is not contained in received graph\n
Found ${receivedStatements.length} statements in received graph:
${receivedStatements.map(st => `- ${st.subject} ${st.predicate} ${st.object} ${st.graph} .\n`).join('')}
The following ${diffStatements.length} statements does not exist in the above graph:
${diffStatements.map(st => `- ${st.subject} ${st.predicate} ${st.object} ${st.graph} .\n`).join('')}`
  }
}

declare global {
  namespace jest {
    interface Matchers<R> {
      toContainGraph (a: IndexedFormula): R;
    }
  }
}
