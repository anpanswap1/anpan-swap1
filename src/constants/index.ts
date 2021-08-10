import { ChainId, JSBI, Percent, Token, WETH } from '@anpanswap-libs/sdk'

export const ROUTER_ADDRESS = '0xc1b49c2197b5f3211ac34323e9934005c6564773'

// a list of tokens by chain
type ChainTokenList = {
  readonly [chainId in ChainId]: Token[]
}

export const ANPAN = new Token(
  ChainId.BSCTESTNET,
  '0x19207575498e375d4673f1954599c84f1a1f812b',
  18,
  'ANPAN',
  'AnpanSwap Token'
)
export const WBNB = new Token(ChainId.BSCTESTNET, '0xae13d989dac2f0debff460ac112a837c89baa7cd', 18, 'WBNB', 'Wrapped BNB')
export const DAI = new Token(ChainId.BSCTESTNET, '0xd3366509b1392d3c818706fed9939e79f14c542a', 18, 'DAI', 'Dai Stablecoin')
export const BUSD = new Token(ChainId.BSCTESTNET, '0x36cbb9149e4f5d5b7168a2f31b03ff8590690378', 18, 'BUSD', 'BUSD Testnet')
export const BTCB = new Token(ChainId.BSCTESTNET, '0x90b64d6b1d0fbb544ab10fb64208e9c8e77170a9', 18, 'BTCB', 'Binance BTC')
export const USDT = new Token(ChainId.BSCTESTNET, '0xcbab40b88b7e4f1e7e2122befd9cc63a2171ee26', 18, 'USDT', 'Tether USD')
export const UST = new Token(
  ChainId.BSCTESTNET,
  '0x7621547aaf524d1b115d1bb058ab88c87adccda2',
  18,
  'UST',
  'Wrapped UST Token'
)
export const ETH = new Token(
  ChainId.BSCTESTNET,
  '0x403b8b708ad9798e497b4224e0e2d7f55ce0976a',
  18,
  'ETH',
  'Binance-Peg Ethereum Token'
)

const WETH_ONLY: ChainTokenList = {
  [ChainId.MAINNET]: [WETH[ChainId.MAINNET]],
  [ChainId.BSCTESTNET]: [WETH[ChainId.BSCTESTNET]],
}

// used to construct intermediary pairs for trading
export const BASES_TO_CHECK_TRADES_AGAINST: ChainTokenList = {
  ...WETH_ONLY,
  [ChainId.BSCTESTNET]: [...WETH_ONLY[ChainId.BSCTESTNET], DAI, BUSD, BTCB, USDT, UST, ETH],
}

/**
 * Some tokens can only be swapped via certain pairs, so we override the list of bases that are considered for these
 * tokens.
 */
export const CUSTOM_BASES: { [chainId in ChainId]?: { [tokenAddress: string]: Token[] } } = {
  [ChainId.BSCTESTNET]: {},
}

// used for display in the default list when adding liquidity
export const SUGGESTED_BASES: ChainTokenList = {
  ...WETH_ONLY,
  [ChainId.BSCTESTNET]: [...WETH_ONLY[ChainId.BSCTESTNET], DAI, BUSD, USDT],
}

// used to construct the list of all pairs we consider by default in the frontend
export const BASES_TO_TRACK_LIQUIDITY_FOR: ChainTokenList = {
  ...WETH_ONLY,
  [ChainId.BSCTESTNET]: [...WETH_ONLY[ChainId.BSCTESTNET], DAI, BUSD, BTCB, USDT],
}

export const PINNED_PAIRS: { readonly [chainId in ChainId]?: [Token, Token][] } = {
  [ChainId.BSCTESTNET]: [
    [ANPAN, WBNB],
    [BUSD, USDT],
    [DAI, USDT],
  ],
}

export const NetworkContextName = 'NETWORK'

// default allowed slippage, in bips
export const INITIAL_ALLOWED_SLIPPAGE = 80
// 20 minutes, denominated in seconds
export const DEFAULT_DEADLINE_FROM_NOW = 60 * 20

// one basis point
export const ONE_BIPS = new Percent(JSBI.BigInt(1), JSBI.BigInt(10000))
export const BIPS_BASE = JSBI.BigInt(10000)
// used for warning states
export const ALLOWED_PRICE_IMPACT_LOW: Percent = new Percent(JSBI.BigInt(100), BIPS_BASE) // 1%
export const ALLOWED_PRICE_IMPACT_MEDIUM: Percent = new Percent(JSBI.BigInt(300), BIPS_BASE) // 3%
export const ALLOWED_PRICE_IMPACT_HIGH: Percent = new Percent(JSBI.BigInt(500), BIPS_BASE) // 5%
// if the price slippage exceeds this number, force the user to type 'confirm' to execute
export const PRICE_IMPACT_WITHOUT_FEE_CONFIRM_MIN: Percent = new Percent(JSBI.BigInt(1000), BIPS_BASE) // 10%
// for non expert mode disable swaps above this
export const BLOCKED_PRICE_IMPACT_NON_EXPERT: Percent = new Percent(JSBI.BigInt(1500), BIPS_BASE) // 15%

// used to ensure the user doesn't send so much ETH so they end up with <.01
export const MIN_ETH: JSBI = JSBI.exponentiate(JSBI.BigInt(10), JSBI.BigInt(16)) // .01 ETH
