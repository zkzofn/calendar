const border = '#dadce0 1px solid';

export const styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper,
  },
  gridList: {
    width: 1000,
    height: 800,
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