import { makeDropTarget, makeDraggable, uploadFiles } from '../../../src/widgets/dragAndDrop'

test('makeDropTarget exists', () => {
  expect(makeDropTarget).toBeInstanceOf(Function)
})
