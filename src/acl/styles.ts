/**
 * Contains CSS styles for the Sharing pane,
 * see https://github.com/solid/userguide/blob/master/views/sharing/userguide.md
 * @packageDocumentation
 */
export const styles = {
  aclControlBoxContainer: {
    margin: '1em'
  },
  aclControlBoxHeader: {
    fontSize: '120%',
    margin: '0 0 1rem'
  },
  aclControlBoxStatus: {
    display: 'none',
    margin: '1rem 0'
  },
  aclControlBoxStatusRevealed: {
    display: 'block'
  },
  aclGroupContent: {
    maxWidth: 650
  },
  accessGroupList: {
    display: 'grid',
    gridTemplateColumns: '1fr',
    margin: '1em',
    width: '100%'
  },
  accessGroupListItem: {
    display: 'grid',
    gridTemplateColumns: '100px auto 30%'
  },
  defaultsController: {
    display: 'flex'
  },
  defaultsControllerNotice: {
    color: '#888',
    flexGrow: 1,
    fontSize: '80%'
  },
  bigButton: {
    backgroundColor: 'white',
    border: '0.1em solid #888',
    borderRadius: '0.3em',
    maxWidth: '50%',
    paddingBottom: '1em',
    paddingTop: '1em'
  },
  group: {
    color: '#888'
  },
  'group-1': {
    color: 'green'
  },
  'group-2': {
    color: '#cc0'
  },
  'group-3': {
    color: 'orange'
  },
  'group-5': {
    color: 'red'
  },
  'group-9': {
    color: 'blue'
  },
  'group-13': {
    color: 'purple'
  },
  trustedAppAddApplicationsTable: {
    backgroundColor: '#eee'
  },
  trustedAppCancelButton: {
    float: 'right' as 'right' // @@ a little hack - https://stackoverflow.com/questions/52781251/using-typescript-jss-with-react-throws-type-is-unassignable-for-some-css-prop
  },
  trustedAppControllerI: {
    borderColor: 'orange',
    borderRadius: '1em',
    borderWidth: '0.1em'
  },
  temporaryStatusInit: {
    background: 'green'
  },
  temporaryStatusEnd: {
    background: 'transparent',
    transition: 'background 5s linear'
  }
}
