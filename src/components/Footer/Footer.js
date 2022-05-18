import React, { memo } from 'react';

import { makeStyles } from '@material-ui/core/styles';
import styles from './styles';
import { useTranslation } from 'react-i18next';

const useStyles = makeStyles(styles);

const Footer = () => {
  const classes = useStyles();
  const { t } = useTranslation();

  return (
    <div className={classes.root}>
      <div className={classes.column}>
        <a
          href="https://docs.tosha.io"
          target="_blank"
          rel="noopener noreferrer"
          className={classes.link}
        >
          <i className={`fas fa-book ${classes.linkIcon}`} />
          <span>{t('docs')}</span>
        </a>
      </div>
      <div className={classes.column}>
        <a
          href="https://medium.com/0xtosha"
          target="_blank"
          rel="noopener noreferrer"
          className={classes.link}
        >
          <i className={`fab fa-medium ${classes.linkIcon}`}></i>
          <span>{t('blog')}</span>
        </a>
      </div>
      <div className={classes.column}>
        <a
          href="https://github.com/0xtosha"
          target="_blank"
          rel="noopener noreferrer"
          className={classes.link}
        >
          <i className={`fab fa-github ${classes.linkIcon}`} />
          <span>{t('source')}</span>
        </a>
      </div>
      <div className={classes.column}>
        <a
          href="https://twitter.com/toshadao"
          target="_blank"
          rel="noopener noreferrer"
          className={classes.link}
        >
          <i className={`fab fa-twitter ${classes.linkIcon}`} />

          <span>twitter</span>
        </a>
      </div>
      <div className={classes.column}>
        <a
          href="https://t.me/tosha0x"
          target="_blank"
          rel="noopener noreferrer"
          className={classes.link}
        >
          <i className={`fab fa-telegram ${classes.linkIcon}`} />

          <span>telegram</span>
        </a>
      </div>
      <div className={classes.column}>
        <a
          href="https://discord.gg/qXwQ3pqw84"
          target="_blank"
          rel="noopener noreferrer"
          className={classes.link}
        >
          <i className={`fab fa-discord ${classes.linkIcon}`} />
          <span>discord</span>
        </a>
      </div>
    </div>
  );
};

export default memo(Footer);
