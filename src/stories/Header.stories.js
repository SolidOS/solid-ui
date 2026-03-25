import * as UI from '../../src/index'

const headerDecorator = (Story) => {
  setTimeout(() => Story(), 1)
  return '<div>The above <code>div<code> with ID "PageHeader" is replaced by the header component</div>'
}

export default {
  title: 'Header',
}

export const Header = {
  render: () => {
    const options = {}
    UI.initHeader(SolidLogic.store, options)
  },

  name: 'header',
  decorators: [headerDecorator],
}
