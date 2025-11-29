import { IndexedFormula } from 'rdflib'

export function toEqualGraph (received: IndexedFormula, expected: IndexedFormula) {
  const receivedStatements = received.statements.slice()
  const expectedStatements = expected.statements.slice()
  if (receivedStatements.length !== expectedStatements.length) {
    return {
      pass: false,
      message: () => `Expected graph does not equal to received graph\n
Found ${receivedStatements.length} statements in received graph:
${receivedStatements.map(st => `- ${st.subject} ${st.predicate} ${st.object} ${st.graph} .\n`).join('')}
Found ${expectedStatements.length} statements in expected graph:
${expectedStatements.map(st => `- ${st.subject} ${st.predicate} ${st.object} ${st.graph} .\n`).join('')}`
    }
  }
  const expDiffRecStatements = expectedStatements.filter(st => !received.holds(st.subject, st.predicate, st.object, st.graph))
  if (expDiffRecStatements.length !== 0) {
    return {
      pass: false,
      message: () => `Expected graph does not equal to received graph\n
Found ${receivedStatements.length} statements in received graph:
${receivedStatements.map(st => `- ${st.subject} ${st.predicate} ${st.object} ${st.graph} .\n`).join('')}
The following ${expDiffRecStatements.length} statements does not exist in the above graph:
${expDiffRecStatements.map(st => `- ${st.subject} ${st.predicate} ${st.object} ${st.graph} .\n`).join('')}`
    }
  }
  const recDiffExpStatements = receivedStatements.filter(st => !expected.holds(st.subject, st.predicate, st.object, st.graph))
  return {
    pass: recDiffExpStatements.length === 0,
    message: () => `Expected graph does not equal to received graph\n
Found ${expectedStatements.length} statements in expected graph:
${expectedStatements.map(st => `- ${st.subject} ${st.predicate} ${st.object} ${st.graph} .\n`).join('')}
The following ${recDiffExpStatements.length} statements does not exist in the above graph:
${recDiffExpStatements.map(st => `- ${st.subject} ${st.predicate} ${st.object} ${st.graph} .\n`).join('')}`
  }
}
