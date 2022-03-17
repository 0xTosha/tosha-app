const styles = theme => ({
  container: {
    paddingTop: '4px',
    marginBottom: '24px',
    backgroundColor: '#171722',
    border: '1px solid ' + theme.palette.background.border,
  },
  subHeader: {
    color: '#fafafa',
    transition: 'box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',

    textalign: 'center',
    '@media (min-width: 900px)': {
      margin: '0 -10px -10px',
      flexBasis: '32.3333%',
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'space-between',
    },
  },
  card: {
    boxShadow: '0 0 5px #3ae2d1,0 0 5px #3ae2d1 !important',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.primary,
  },
  cardWhite: {
    boxShadow: '0 0 5px #0677BA,0 0 5px #0677BA !important',
    backgroundColor: theme.palette.text.secondary,
    color: theme.palette.text.primary,
  },
  header: {
    margin: '40px auto 3rem',
    padding: '0 20px',
    maxwidth: '1100px',
  },
  tvl: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-end',
  },
  title: {
    fontSize: '32px',
    letterSpacing: '0',
    lineHeight: '32px',
    fontWeight: '550',
    color: theme.palette.text.primary,
    display: 'flex',
    alignItems: 'center',
  },
  titleLoader: {
    marginLeft: '12px',
  },
  subtitle: {
    letterSpacing: '0',
    lineHeight: '8px',
    [theme.breakpoints.down('xs')]: {
      lineHeight: '16px',
    },
    color: theme.palette.text.secondary,
    marginTop: '0',
  },
  text: {
    fontSize: '24px',
    letterSpacing: '0',
    lineHeight: '32px',
    fontWeight: '550',
    color: theme.palette.text.primary,
    display: 'flex',
    alignItems: 'center',
  },
  infinityIcon: {
    marginBottom: '-6px',
    paddingRight: '5px',
  },
});

export default styles;
