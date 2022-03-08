const styles = theme => ({
  root: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    maxWidth: '40rem',
    margin: '1rem auto',
    '@media (min-width: 769px)': {
      margin: '2rem auto 2rem',
    },
  },
  column: {
    display: 'flex',
    flexDirection: 'column',
  },
  title: {
    color: theme.palette.text.primary,
    fontWeight: 900,
    fontSize: '1.2rem',
    marginBottom: '0.1rem',
  },
  link: {
    margin: '0.5rem 0',
    fontWeight: 400,
    color: theme.palette.text.primary,
    textDecoration: 'none',
    '&:hover': {
      textDecoration: 'underline',
    },
  },
  linkIcon: {
    marginRight: '0.5rem',
    minWidth: '24px',
  },
});

export default styles;
