/* eslint-disable import/first */
export const allNetworks = [
  {
    name: 'METIS',
    asset: 'Andromeda',
    id: 1088,
    hash: '/metis',
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
