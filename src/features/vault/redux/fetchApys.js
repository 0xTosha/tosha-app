import {
  VAULT_FETCH_APYS_BEGIN,
  VAULT_FETCH_APYS_FAILURE,
  VAULT_FETCH_APYS_SUCCESS,
} from './constants';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';

import axios from 'axios';
import { getApiCacheBuster } from '../../web3/getApiCacheBuster';
import { useCallback } from 'react';

export function fetchApys() {
  console.log('Fetching APY');
  return dispatch => {
    dispatch({
      type: VAULT_FETCH_APYS_BEGIN,
    });

    return new Promise((resolve, reject) => {
      const cacheBuster = getApiCacheBuster();
      const doRequest = axios.get(`http://localhost:3005/apy/breakdown?_=${cacheBuster}`);

      doRequest.then(
        res => {
          console.log('Fetching APY OK!');
          console.log(res);
          dispatch({
            type: VAULT_FETCH_APYS_SUCCESS,
            data: res.data,
          });
          resolve(res);
        },
        err => {
          dispatch({
            type: VAULT_FETCH_APYS_FAILURE,
            data: { error: err },
          });
          reject(err);
        }
      );
    });
  };
}

export function useFetchApys() {
  const dispatch = useDispatch();

  const { apys, fetchApysPending, fetchApysDone } = useSelector(
    state => ({
      apys: state.vault.apys,
      fetchApysDone: state.vault.fetchApysDone,
      fetchApysPending: state.vault.fetchApysPending,
    }),
    shallowEqual
  );

  const boundAction = useCallback(() => {
    dispatch(fetchApys());
  }, [dispatch]);

  return {
    apys,
    fetchApys: boundAction,
    fetchApysDone,
    fetchApysPending,
  };
}

export function reducer(state, action) {
  console.log('----------------REDUCER-------------------');
  console.log(action);
  switch (action.type) {
    case VAULT_FETCH_APYS_BEGIN:
      return {
        ...state,
        fetchApysPending: true,
      };

    case VAULT_FETCH_APYS_SUCCESS:
      console.log('----------------FETCH API>>>>>>>>>>>-------------------');
      console.log(action.data);
      return {
        ...state,
        apys: action.data,
        fetchApysDone: true,
        fetchApysPending: false,
      };

    case VAULT_FETCH_APYS_FAILURE:
      return {
        ...state,
        fetchApysPending: false,
      };

    default:
      return state;
  }
}
