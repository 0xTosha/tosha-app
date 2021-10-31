import { govPoolABI } from '../abi';

const beefy = {
  logo: 'stake/beefy/beefyfinance.png',
  logoNight: 'stake/beefy/beefyfinance_night.png',
  background: 'stake/beefy/background.png',
  text: "Beefy Finance is The Multi-Chain Yield Optimizer across many blockchains, enabling users to earn autocompounded yield on their crypto. Did you know also that you can own a piece of Beefy itself? Beefy runs on its governance token, BIFI. The token has a set supply of 80,000 across all chains; no more may be minted, ever! As a holder of BIFI you may create and vote on important DAO proposals, and you become dividend-eligible to earn a share of every compounding harvest on Beefy vaults, hour by hour. Here on Avalanche, you just need to stake BIFI in this reward pool, or in the autocompounding BIFI Maxi vault on the main page. For this pool, AVAX dividends are gathered and sent proportionally to each staker. Stake here, return later to claim the AVAX you've earned.",
  website: 'https://app.tosha.finance',
  social: {
    telegram: 'http://t.me/beefyfinance',
    twitter: 'https://twitter.com/beefyfinance',
  },
};

export const celoStakePools = [
  {
    id: 'bifi-celo',
    name: 'TOSHA',
    logo: 'single-assets/Tosha.png',
    token: 'TOSHA',
    tokenDecimals: 18,
    tokenAddress: '0xE1Ea3fc4413e143AF108973342d76080622E66c4',
    tokenOracle: 'tokens',
    tokenOracleId: 'TOSHA',
    earnedToken: 'CELO',
    earnedTokenDecimals: 18,
    earnedTokenAddress: '0x021F09399fE684135D3eA96506075b175E822967',
    earnContractAddress: '0x021F09399fE684135D3eA96506075b175E822967',
    earnContractAbi: govPoolABI,
    earnedOracle: 'tokens',
    earnedOracleId: 'TOSHALP',
    partnership: false,
    status: 'active',
    fixedStatus: true,
    partners: [beefy],
  },
  // {
  //   id: 'moo_joe-bifi',
  //   name: 'Beefy',
  //   logo: 'single-assets/JOE.png',
  //   token: 'mooJoe',
  //   tokenDecimals: 18,
  //   tokenAddress: '0x282B11E65f0B49363D4505F91c7A44fBEe6bCc0b',
  //   tokenOracle: 'tokens',
  //   tokenOracleId: 'JOE',
  //   earnedToken: 'mooAvalancheBIFI',
  //   earnedTokenDecimals: 18,
  //   earnedTokenAddress: '0xCeefB07Ad37ff165A0b03DC7C808fD2E2fC77683',
  //   earnContractAddress: '0x90e91cAf13F6C06fD04031cF5f398F8b3BAB794B',
  //   earnContractAbi: govPoolABI,
  //   earnedOracle: 'tokens',
  //   earnedOracleId: 'BIFI',
  //   partnership: true,
  //   status: 'active',
  //   isMooStaked: true,
  //   periodFinish: 1633540000,
  //   partners: [beefy],
  // },
];
