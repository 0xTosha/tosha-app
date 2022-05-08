export const networkSettings = {
  1088: {
    chainId: `0x${parseInt(1088, 10).toString(16)}`,
    chainName: 'Metis',
    nativeCurrency: {
      name: 'METIS',
      symbol: 'METIS',
      decimals: 18,
    },
    rpcUrls: ['https://andromeda.metis.io/?owner=1088'],
    blockExplorerUrls: ['https://andromeda-explorer.metis.io/'],
  },
  42220: {
    chainId: `0x${parseInt(42220, 10).toString(16)}`,
    chainName: 'Celo',
    nativeCurrency: {
      name: 'CELO',
      symbol: 'CELO',
      decimals: 18,
    },
    rpcUrls: ['https://forno.celo.org'],
    blockExplorerUrls: ['https://explorer.celo.org/'],
  },
  42262: {
    chainId: `0x${parseInt(42262, 10).toString(16)}`,
    chainName: 'Oasis',
    nativeCurrency: {
      name: 'ROSE',
      symbol: 'ROSE',
      decimals: 18,
    },
    rpcUrls: ['https://emerald.oasis.dev'],
    blockExplorerUrls: ['https://explorer.emerald.oasis.dev'],
  },
};

export const networkSetup = chainId => {
  return new Promise((resolve, reject) => {
    const provider = window.ethereum;
    if (provider) {
      if (networkSettings.hasOwnProperty(chainId)) {
        provider
          .request({
            method: 'wallet_addEthereumChain',
            params: [networkSettings[chainId]],
          })
          .then(resolve)
          .catch(reject);
      } else {
        reject(new Error(`No network settings configured for chainId: '${chainId}'`));
      }
    } else {
      reject(new Error(`window.ethereum is '${typeof provider}'`));
    }
  });
};

export const getRpcUrl = () => {
  const settings = networkSettings[window.REACT_APP_NETWORK_ID];
  return settings.rpcUrls[~~(settings.rpcUrls.length * Math.random())];
};
