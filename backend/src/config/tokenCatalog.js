const DEFAULT_TOKENS = [
  {
    name: 'Wrapped Ether',
    symbol: 'WETH',
    address: '0x4200000000000000000000000000000000000006',
    decimals: 18,
    logoURI: 'https://didcmo2jyrnku.cloudfront.net/assets/eth.png',
  },
  {
    name: 'USD Coin',
    symbol: 'USDC',
    address: '0x036CbD53842c5426634e7929541eC2318f3dCF7e',
    decimals: 6,
    logoURI: 'https://assets.coingecko.com/coins/images/6319/small/USD_Coin_icon.png',
  },
  {
    name: 'DAI Stablecoin',
    symbol: 'DAI',
    address: '0x56088390786968846c4fF055375A2451F33F67eE',
    decimals: 18,
    logoURI: 'https://assets.coingecko.com/coins/images/9956/small/4943.png',
  },
  // {
  //   name: 'Chainlink',
  //   symbol: 'LINK',
  //   address: '0xE4a900c3606f8510f2E9F344600298B7500350B4',
  //   decimals: 18,
  //   logoURI: 'https://coingecko.com',
  // },
  {
    name: 'Wrapped BTC',
    symbol: 'WBTC',
    address: '0x34d471569B601362eE8fC3A73087640c49a31828',
    decimals: 8,
    logoURI: 'https://assets.coingecko.com/coins/images/1/small/bitcoin.png',
  },
];

function parseTokensFromEnv() {
  const raw = process.env.BASE_SEPOLIA_TOKENS_JSON;

  if (!raw) {
    return DEFAULT_TOKENS;
  }

  try {
    const parsed = JSON.parse(raw);

    if (!Array.isArray(parsed) || parsed.length === 0) {
      return DEFAULT_TOKENS;
    }

    return parsed;
  } catch (error) {
    console.warn('Invalid BASE_SEPOLIA_TOKENS_JSON, using default token catalog:', error.message);
    return DEFAULT_TOKENS;
  }
}

function getTokenCatalog() {
  return {
    chain: process.env.BASE_SEPOLIA_CHAIN_NAME || 'Base Sepolia',
    chainId: Number(process.env.BASE_SEPOLIA_CHAIN_ID || 84532),
    rpcUrl: process.env.RPC_URL || 'https://sepolia.base.org',
    tokens: parseTokensFromEnv(),
  };
}

module.exports = {
  DEFAULT_TOKENS,
  getTokenCatalog,
};