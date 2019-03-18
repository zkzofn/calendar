import { border } from '../../actions/common'


export const styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper,
  },
  gridList: {
    flexGrow: 1,
    width: 1100,
    height: window.innerHeight - 64,
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
});