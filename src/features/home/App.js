import React, { memo, useCallback, useEffect, useMemo, useState } from 'react';
import { StylesProvider, ThemeProvider, makeStyles } from '@material-ui/core/styles';
import { useConnectWallet, useDisconnectWallet } from './redux/hooks';

import Footer from 'components/Footer/Footer';
import Header from 'components/Header/Header';
import HeaderLinks from 'components/HeaderLinks/HeaderLinks';
import { NetworkConnectNotice } from 'components/NetworkConnectNotice/NetworkConnectNotice';
import { Notifier } from 'features/common';
import Pastures from 'components/Pastures/Pastures';
import { SnackbarProvider } from 'notistack';
import appStyle from './jss/appStyle.js';
import createThemeMode from './jss/appTheme';
import { createWeb3Modal } from '../web3';
import { useLocation } from 'react-router';
import useNightMode from './hooks/useNightMode';
import { useTranslation } from 'react-i18next';

const themes = { light: null, dark: null };
const getTheme = mode => {
  return (themes[mode] = themes[mode] || createThemeMode(mode === 'dark'));
};

const ScrollToTop = memo(function () {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
});

export default function App({ children }) {
  const { t } = useTranslation();
  const { connectWallet, web3, address, networkId, connected } = useConnectWallet();
  const { disconnectWallet } = useDisconnectWallet();
  const [web3Modal, setModal] = useState(null);

  const { isNightMode, setNightMode } = useNightMode();
  const theme = useMemo(() => getTheme(isNightMode ? 'dark' : 'light'), [isNightMode]);
  const useStyles = useMemo(() => {
    return makeStyles(appStyle, { defaultTheme: theme });
  }, [theme]);
  const classes = useStyles();

  useEffect(() => {
    setModal(createWeb3Modal(t));
  }, [setModal, t]);

  useEffect(() => {
    if (web3Modal && (web3Modal.cachedProvider || window.ethereum)) {
      connectWallet(web3Modal);
    }
  }, [web3Modal, connectWallet]);

  const connectWalletCallback = useCallback(() => {
    connectWallet(web3Modal);
  }, [web3Modal, connectWallet]);

  const disconnectWalletCallback = useCallback(() => {
    disconnectWallet(web3, web3Modal);
  }, [web3, web3Modal, disconnectWallet]);

  return (
    <StylesProvider injectFirst>
      <ThemeProvider theme={theme}>
        <SnackbarProvider>
          <ScrollToTop />
          <div className={classes.page}>
            <Header
              links={
                <HeaderLinks
                  address={address}
                  connected={connected}
                  connectWallet={connectWalletCallback}
                  disconnectWallet={disconnectWalletCallback}
                  isNightMode={isNightMode}
                  setNightMode={() => setNightMode(!isNightMode)}
                />
              }
              isNightMode={isNightMode}
              setNightMode={() => setNightMode(!isNightMode)}
            />
            <div className={classes.container}>
              <div className={classes.children}>
                <NetworkConnectNotice
                  web3={web3}
                  address={address}
                  connectWallet={connectWalletCallback}
                  disconnectWallet={disconnectWalletCallback}
                  networkId={networkId}
                />
                {networkId === window.REACT_APP_NETWORK_ID ? children : null}
                <Notifier />
              </div>
            </div>
            <Footer />
            <Pastures />
          </div>
        </SnackbarProvider>
      </ThemeProvider>
    </StylesProvider>
  );
}
