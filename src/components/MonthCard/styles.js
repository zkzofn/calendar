export const styles = theme => ({
  card: {
    minWidth: 120,
    boxShadow: '0 0 0 0',
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px 0 8px',
    transform: 'scale(2.5)',
    color: '#039BE5',

  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
  scheduleText: {
    marginLeft: 5,
  },
  miniCard: {
    textOverflow: 'clip',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    '&:hover': {
      backgroundColor: 'rgba(0, 0, 0, 0.08)',
    }
  },
  cardDate: {
    textAlign: 'center',
  }
});