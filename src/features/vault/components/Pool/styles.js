const styles = theme => ({
  container: {
    marginBottom: '24px',
    border: '1px solid ' + theme.palette.background.border,
    '&:hover': {
      boxShadow: '0 0 10px #3ae2d1,0 0 5px #3ae2d1 !important',
    },
  },
  accordion: {
    width: '100%',
    backgroundColor: theme.palette.background.primary,
  },
  divider: {
    margin: '0 30px',
  },
});

export default styles;
