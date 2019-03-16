const border = '#dadce0 1px solid';

export const styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper,
  },
  icon: {
    paddingBottom: 11,
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
  defaultMargin: {
    margin: theme.spacing.unit,
  },
  schedule: {
    backgroundColor: '#F0F3F4',
  },
  scheduleDate: {
    width: 122,
    borderBottom: null
  },
  scheduleTime: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    // width: 110,

  },
  menu: {
    width: 300,
    height: 400,
    paddingRight: 0,
  },
  bridge: {
    display: 'inline-flex',
    marginTop: 16,
    paddingTop: 3,
  },
  errorMessage: {
    color: 'red',
    marginLeft: 24,
    marginTop: 10,
  }
});