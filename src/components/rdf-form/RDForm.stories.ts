import { html } from 'lit'
import { defineStoryRender } from '../../storybook'
import './RDFForm'

const meta = {
  title: 'Design System/RDF Form',
  args: {
    formUrl: 'https://solidos.solidcommunity.net/public/2021/solidUiFormTestData/dummyFormTestFile.ttl', // we need a working URL
    subjectUrl: 'https://solidos.solidcommunity.net/public/2021/alice.ttl#me'
  },

  argTypes: {
    formUrl: { control: 'text' },
    subjectUrl: { control: 'text' }
  },
} as const

const render = defineStoryRender<typeof meta.argTypes>(({ formUrl, subjectUrl }) => {
  return html`
      <solid-ui-rdf-form
        formUrl=${formUrl}
        .subjectUrl=${new URL(subjectUrl)}>
      </solid-ui-rdf-form>
    `
})

export default meta

export const Primary = { render }
