import './styles.css';

import React, { useEffect } from 'react';
import { useFetchApys, useFetchBalances, useFetchVaultsData } from 'features/vault/redux/hooks';
import { usePoolsTvl, useUserTvl } from 'features/vault/hooks/usePoolsTvl';

import NetworksToggle from 'components/NetworksToggle/NetworksToggle';
import TVLLoader from '../../features/vault/components/Pools/TVLLoader/TVLLoader';
import { formatGlobalTvl } from 'features/helpers/format';
import { getNetworkFriendlyName } from 'features/helpers/getNetworkData';
import { makeStyles } from '@material-ui/core/styles';
import styles from './styles';
import { useConnectWallet } from 'features/home/redux/hooks';
import { useFetchBifibuyback } from 'features/vault/redux/fetchBifiBuyback';
import { useTheme } from '@material-ui/core';
import { useTranslation } from 'react-i18next';

// import {useFetchVaultsData, useFetchApys } from '../../features/vault/redux/hooks';

const FETCH_INTERVAL_MS = 15 * 1000;
const useStyles = makeStyles(styles);

export function HeaderCards() {
  const { t } = useTranslation();
  const { pools, fetchVaultsData, fetchVaultsDataPending, fetchVaultsDataDone } =
    useFetchVaultsData();
  const { web3, address } = useConnectWallet();
  // const { bifibuyback, fetchBifibuyback, fetchBifibuybackDone } = useFetchBifibuyback();
  const { poolsTvl } = usePoolsTvl(pools);
  const { apys, fetchApys, fetchApysDone } = useFetchApys();
  const { tokens, fetchBalances, fetchBalancesPending, fetchBalancesDone } = useFetchBalances();
  const { userTvl } = useUserTvl(pools, tokens);
  const classes = useStyles();
  const theme = useTheme();
  const isNightMode = theme.palette.type === 'dark';

  useEffect(() => {
    fetchApys();
    const id = setInterval(fetchApys, FETCH_INTERVAL_MS);
    return () => clearInterval(id);
  }, [fetchApys]);

  //   useEffect(() => {
  //     fetchBifibuyback();
  //     const id = setInterval(fetchBifibuyback, FETCH_INTERVAL_MS);
  //     return () => clearInterval(id);
  //   }, [fetchBifibuyback]);

  useEffect(() => {
    const fetch = () => {
      if (address && web3 && !fetchBalancesPending) {
        fetchBalances({ address, web3, tokens });
      }
      if (!fetchVaultsDataPending) {
        fetchVaultsData({ web3, pools });
      }
    };
    fetch();

    const id = setInterval(fetch, FETCH_INTERVAL_MS);
    return () => clearInterval(id);

    // Adding tokens and pools to this dep list, causes an endless loop, DDoSing the api
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [address, web3, fetchBalances, fetchVaultsData]);

  //   const chainNameLowercase = getNetworkFriendlyName().toLowerCase();
  //   const chainBifibuyback =
  //     fetchBifibuybackDone && chainNameLowercase in bifibuyback
  //       ? bifibuyback[chainNameLowercase].buybackUsdAmount
  //       : undefined;

  const activePoolCount = pools.filter(pool => pool.status === 'active').length;

  return (
    <div className="container">
      <div className={classes.subHeader}>
        <div className={` ${isNightMode ? classes.card : classes.cardWhite} dynamic_`}>
          <div className="MuiCardContent-root cards_route">
            <div className="">
              <div className="">TVL</div>
              <div className="">
                <b className="bold_content">
                  <span className="bold_content">
                    {' '}
                    {fetchVaultsDataDone && poolsTvl > 0 ? (
                      formatGlobalTvl(poolsTvl)
                    ) : (
                      <TVLLoader className={classes.titleLoader} />
                    )}
                  </span>
                </b>
              </div>
            </div>
          </div>
        </div>

        <div className={` ${isNightMode ? classes.card : classes.cardWhite} dynamic_`}>
          <div className="MuiCardContent-root cards_route">
            <div className="card_text">
              <div className="headerTop">{t('Vault-Deposited')}</div>
              <div className="content">
                <b className="bold_content">
                  <span>
                    {' '}
                    {fetchVaultsDataDone && fetchBalancesDone ? (
                      formatGlobalTvl(userTvl)
                    ) : (
                      <TVLLoader className={classes.titleLoader} />
                    )}
                  </span>
                </b>
              </div>
            </div>
          </div>
        </div>

        <div className={` ${isNightMode ? classes.card : classes.cardWhite} dynamic_`}>
          <div className="MuiCardContent-root cards_route">
            <div className="card_text">
              <div className="headerTop">{t('Vault-Network')}</div>
              <div className="content">
                <NetworksToggle />
                {fetchVaultsDataDone && activePoolCount && <></>}

                {/* <div className="card_text">{`${activePoolCount} ${t('Vault-MainTitle')}`} */}
                {/* <h6>{t('Vault-AutocompoundingNote')}</h6> */}
                {/* </div>                     */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
