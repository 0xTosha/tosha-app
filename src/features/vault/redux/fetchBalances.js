import { useCallback } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import {
  VAULT_FETCH_BALANCES_BEGIN,
  VAULT_FETCH_BALANCES_SUCCESS,
  VAULT_FETCH_BALANCES_FAILURE,
} from './constants';
import { MultiCall } from 'eth-multicall';
import { erc20ABI, multicallABI, uniswapV2PairABI } from 'features/configure';
import { byDecimals } from 'features/helpers/bignumber';
import { getNetworkMulticall } from 'features/helpers/getNetworkData';

export function fetchBalances({ address, web3, tokens }) {
  return dispatch => {
    if (!(address && web3)) return;

    dispatch({
      type: VAULT_FETCH_BALANCES_BEGIN,
    });
    console.log('FETCHBALANCES:');
    console.log(tokens);
    let tokenAddress = '0xE1Ea3fc4413e143AF108973342d76080622E66c4';
    //  let spender = "0x021F09399fE684135D3eA96506075b175E822967";
    let contract = new web3.eth.Contract(erc20ABI, tokenAddress);
    contract.methods
      .balanceOf(address)
      .call()
      .then(response => {
        console.log('allowabce');
        console.log(response);
        console.log('>>>>>>>>>>>>');
      })
      .catch(error => {
        console.log('Allowance FETCH ERROR');
        console.log(error);
        console.log('<<<<<<<<<');
      });

    const promise = new Promise((resolve, reject) => {
      const multicall = new MultiCall(web3, getNetworkMulticall());
      // console.log('MULTICALL');
      // console.log(multicall);
      // console.log('WEB3');
      // console.log(web3);

      const balanceCalls = [];
      const allowanceCalls = [];

      Object.entries(tokens).forEach(([symbol, token]) => {
        // console.log('TOKEN');
        // console.log(token);
        // console.log(symbol);
        // console.log(token.allowance);
        if (!token.tokenAddress) {
          console.log(`!token.tokenAddress ${symbol} -- ${address}`);
          const multicallContract = new web3.eth.Contract(multicallABI, multicall.contract);
          balanceCalls.push({
            balance: multicallContract.methods.getEthBalance(address),
            symbol: symbol,
          });
        } else {
          console.log(`tokenContract.tokenAddress ${symbol} --${token.tokenAddress} -- ${address}`);
          // token.tokenAddress = '0xceddAA2cB6F36C238ddb5B31E469B48F898F4D13';
          // console.log(token.tokenAddress);
          const tokenContract = new web3.eth.Contract(erc20ABI, token.tokenAddress);
          // console.log(tokenContract);
          balanceCalls.push({
            balance: tokenContract.methods.balanceOf(address),
            symbol: symbol,
          });
          Object.entries(token.allowance).forEach(([spender]) => {
            console.log('Spender');
            console.log(spender);
            allowanceCalls.push({
              allowance: tokenContract.methods.allowance(address, spender),
              spender: spender,
              symbol: symbol,
            });
          });
        }
      });
      console.log('Calling Multicall');
      console.log(balanceCalls);
      console.log(allowanceCalls);
      multicall
        .all([balanceCalls])
        .then(([balanceResults]) => {
          const newTokens = {};
          console.log('Multicall');

          balanceResults.forEach(balanceResult => {
            newTokens[balanceResult.symbol] = {
              ...tokens[balanceResult.symbol],
              tokenBalance: balanceResult.balance,
            };
          });

          // allowanceResults.forEach(allowanceResult => {
          //   newTokens[allowanceResult.symbol] = {
          //     ...newTokens[allowanceResult.symbol],
          //     allowance: {
          //       ...newTokens[allowanceResult.symbol].allowance,
          //       [allowanceResult.spender]: allowanceResult.allowance,
          //     },
          //   };
          // });

          dispatch({
            type: VAULT_FETCH_BALANCES_SUCCESS,
            data: newTokens,
          });
          resolve();
        })
        .catch(error => {
          console.log('FETCH ERROR');
          console.log(error);
          dispatch({
            type: VAULT_FETCH_BALANCES_FAILURE,
          });
          return reject(error.message || error);
        });
    });

    return promise;
  };
}

export function fetchPairReverves({ web3, pairToken }) {
  return dispatch => {
    if (!web3) return;

    dispatch({
      type: VAULT_FETCH_BALANCES_BEGIN,
    });

    const promise = new Promise((resolve, reject) => {
      const multicall = new MultiCall(web3, getNetworkMulticall());
      const tokenContract = new web3.eth.Contract(uniswapV2PairABI, pairToken.tokenAddress);
      multicall
        .all([
          [
            {
              totalSupply: tokenContract.methods.totalSupply(),
              token0: tokenContract.methods.token0(),
              token1: tokenContract.methods.token1(),
              reserves: tokenContract.methods.getReserves(),
            },
          ],
        ])
        .then(([[result]]) => {
          const newPairToken = {
            [pairToken.symbol]: {
              ...pairToken,
              ...result,
            },
          };

          dispatch({
            type: VAULT_FETCH_BALANCES_SUCCESS,
            data: newPairToken,
          });
          resolve();
        })
        .catch(error => {
          dispatch({
            type: VAULT_FETCH_BALANCES_FAILURE,
          });
          return reject(error.message || error);
        });
    });

    return promise;
  };
}

export function useFetchBalances() {
  const dispatch = useDispatch();
  // console.log('Use Fetch Balances')
  const { tokens, fetchBalancesPending, fetchBalancesDone } = useSelector(
    state => ({
      tokens: state.vault.tokens,
      fetchBalancesDone: state.vault.fetchBalancesDone,
      fetchBalancesPending: state.vault.fetchBalancesPending,
    }),
    shallowEqual
  );
  // console.log('Use Fetch Balances OK!')
  const boundAction = useCallback(
    data => {
      return dispatch(fetchBalances(data));
    },
    [dispatch]
  );

  const tokenBalance = tokenSymbol => {
    return byDecimals(tokens[tokenSymbol]?.tokenBalance || 0, tokens[tokenSymbol].decimals);
  };

  const boundPairReverves = useCallback(
    data => {
      return dispatch(fetchPairReverves(data));
    },
    [dispatch]
  );

  return {
    tokens,
    tokenBalance: tokenBalance,
    fetchBalances: boundAction,
    fetchPairReverves: boundPairReverves,
    fetchBalancesDone,
    fetchBalancesPending,
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case VAULT_FETCH_BALANCES_BEGIN:
      return {
        ...state,
        fetchBalancesPending: true,
      };

    case VAULT_FETCH_BALANCES_SUCCESS:
      const newAndUpdatedTokens = {};
      Object.entries(action.data).forEach(([symbol, token]) => {
        newAndUpdatedTokens[symbol] = {
          ...state.tokens[symbol],
          ...token,
          allowance: {
            ...state.tokens[symbol]?.allowance,
            ...token.allowance,
          },
        };
      });

      return {
        ...state,
        tokens: {
          ...state.tokens,
          ...newAndUpdatedTokens,
        },
        fetchBalancesDone: true,
        fetchBalancesPending: false,
      };

    case VAULT_FETCH_BALANCES_FAILURE:
      return {
        ...state,
        fetchBalancesPending: false,
      };

    default:
      return state;
  }
}
