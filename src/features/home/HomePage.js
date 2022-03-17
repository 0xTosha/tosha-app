import Disclaimer from 'components/Disclaimer/Disclaimer';
import Pools from 'features/vault/components/Pools/Pools';
import React from 'react';

export default function HomePage() {
  return (
    <>
      <Pools fromPage="home" />
      <Disclaimer />
    </>
  );
}
