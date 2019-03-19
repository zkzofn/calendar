import { border } from '../../actions/common'

export const styles = theme => ({
  root: {
    // display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper,
  },
  gridListDays: {
    // flexGrow: 1,
    height: 84,

  },
  gridList: {
    // flexGrow: 1,
    height: window.innerHeight - 64 - 84,
  },
  gridTile: {
    borderRight: border,
    borderBottom: border,
  },
  gridTileTop: {
    borderTop: border,
  },
  gridTileLeft: {
    borderLeft: border,
  },
  headLine: {
    textAlign: 'center',
  },
  divider: {
    float: 'right',
  },
  gridTarget: {
    backgroundColor: '#039BE5',
    borderBottom: 'none'
  },
  targetText: {
    color: 'white',
    marginLeft: 6,
  }
});