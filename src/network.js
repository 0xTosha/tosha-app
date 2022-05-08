/* eslint-disable import/first */
export const allNetworks = [
  {
    name: 'METIS',
    asset: 'Andromeda',
    id: 1088,
    hash: '/metis',
  },
  {
    name: 'OASIS',
    asset: 'OASIS',
    id: 42262,
    hash: '/oasis',
  },
];

const network = allNetworks.find(n => window.location.hash.startsWith('#' + n.hash));

if (!network) {
  window.location.hash = allNetworks[0].hash;
  window.location.reload();
} else {
  window.REACT_APP_NETWORK_ID = network.id;
}

export default network;
