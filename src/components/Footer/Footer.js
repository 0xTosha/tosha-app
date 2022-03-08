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
        <div className={classes.title}>TOSHA</div>
        <a
          href="https://docs.tosha.io"
          target="_blank"
          rel="noopener noreferrer"
          className={classes.link}
        >
          <i className={`fas fa-book ${classes.linkIcon}`} />
          <span>{t('docs')}</span>
        </a>

        <a
          href="https://medium.com/0xtosha"
          target="_blank"
          rel="noopener noreferrer"
          className={classes.link}
        >
          <i className={`fab fa-medium ${classes.linkIcon}`}></i>
          <span>{t('blog')}</span>
        </a>

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
        <div className={classes.title}>{t('products')}</div>
        <a
          href="https://gov.tosha.io"
          target="_blank"
          rel="noopener noreferrer"
          className={classes.link}
        >
          <i className={`fas fa-landmark ${classes.linkIcon}`} />
          <span>{t('gov')}</span>
        </a>

        <a
          href="https://vote.tosha.io"
          target="_blank"
          rel="noopener noreferrer"
          className={classes.link}
        >
          <i className={`fas fa-vote-yea ${classes.linkIcon}`} />
          <span>{t('vote')}</span>
        </a>

        <a
          href="https://app.tosha.io"
          target="_blank"
          rel="noopener noreferrer"
          className={classes.link}
        >
          <i className={`fas fa-hand-holding-usd ${classes.linkIcon}`} />
          <span>{t('app')}</span>
        </a>
      </div>

      <div className={classes.column}>
        <div className={classes.title}>{t('socials')}</div>
        <a
          href="https://twitter.com/0xtosha"
          target="_blank"
          rel="noopener noreferrer"
          className={classes.link}
        >
          <i className={`fab fa-twitter ${classes.linkIcon}`} />

          <span>twitter</span>
        </a>
        <a
          href="https://t.me/tosha0x"
          target="_blank"
          rel="noopener noreferrer"
          className={classes.link}
        >
          <i className={`fab fa-telegram ${classes.linkIcon}`} />

          <span>telegram</span>
        </a>
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
