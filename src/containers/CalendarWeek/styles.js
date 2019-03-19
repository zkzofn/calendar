import { border } from '../../actions/common'

export const styles = theme => ({
  root: {
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper,
  },
  gridListDays: {
    height: 84,

  },
  gridList: {
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
  gridTargetLast: {
    borderBottom: `${border} !important`
  },
  targetText: {
    color: 'white',
    marginLeft: 6,
  }
});