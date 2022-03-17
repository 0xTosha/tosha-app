import React, { useEffect } from 'react';
import { useFetchApys, useFetchBalances, useFetchVaultsData } from '../../redux/hooks';
import { usePoolsTvl, useUserTvl } from '../../hooks/usePoolsTvl';

import AllInclusiveIcon from '@material-ui/icons/AllInclusive';
import Grid from '@material-ui/core/Grid';
import NetworksToggle from 'components/NetworksToggle/NetworksToggle';
import TVLLoader from './TVLLoader/TVLLoader';
import VisiblePools from '../VisiblePools/VisiblePools';
import { formatGlobalTvl } from 'features/helpers/format';
import { getNetworkFriendlyName } from '../../../helpers/getNetworkData';
import { makeStyles } from '@material-ui/core/styles';
import styles from './styles';
import { useConnectWallet } from 'features/home/redux/hooks';
import { useFetchBifibuyback } from 'features/vault/redux/fetchBifiBuyback';
import { useTranslation } from 'react-i18next';

const FETCH_INTERVAL_MS = 15 * 1000;

const useStyles = makeStyles(styles);

export default function Pools() {
  const { t } = useTranslation();
  const { web3, address } = useConnectWallet();
  const { pools, fetchVaultsData, fetchVaultsDataPending, fetchVaultsDataDone } =
    useFetchVaultsData();
  const { tokens, fetchBalances, fetchBalancesPending, fetchBalancesDone } = useFetchBalances();
  const { apys, fetchApys, fetchApysDone } = useFetchApys();
  const { bifibuyback, fetchBifibuyback, fetchBifibuybackDone } = useFetchBifibuyback();
  const { poolsTvl } = usePoolsTvl(pools);
  const { userTvl } = useUserTvl(pools, tokens);
  const classes = useStyles();

  useEffect(() => {
    fetchApys();
    const id = setInterval(fetchApys, FETCH_INTERVAL_MS);
    return () => clearInterval(id);
  }, [fetchApys]);

  useEffect(() => {
    fetchBifibuyback();
    const id = setInterval(fetchBifibuyback, FETCH_INTERVAL_MS);
    return () => clearInterval(id);
  }, [fetchBifibuyback]);

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

  const chainNameLowercase = getNetworkFriendlyName().toLowerCase();
  const chainBifibuyback =
    fetchBifibuybackDone && chainNameLowercase in bifibuyback
      ? bifibuyback[chainNameLowercase].buybackUsdAmount
      : undefined;

  const activePoolCount = pools.filter(pool => pool.status === 'active').length;

  return (
    <Grid container className={classes.container}>
      <VisiblePools
        pools={pools}
        apys={apys}
        tokens={tokens}
        fetchBalancesDone={fetchBalancesDone}
        fetchApysDone={fetchApysDone}
        fetchVaultsDataDone={fetchVaultsDataDone}
      />
    </Grid>
  );
}
