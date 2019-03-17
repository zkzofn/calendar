import { border } from '../../actions/common'

export const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  appBar: {
    boxShadow: '0 0 0 0',
    borderBottom: border,
  },
  title: {
    flexGrow: 1,
    textAlign: 'left',
  }
});