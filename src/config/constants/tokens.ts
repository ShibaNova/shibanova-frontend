const tokens = {
  bnb: {
    symbol: 'BNB',
    projectLink: 'https://www.binance.com/',
  },
  nova: {
    symbol: 'NOVA',
    address: {
      56: '0x56E344bE9A7a7A1d27C854628483Efd67c11214F',
      97: '0x7cc3F3945351F1Bc3b57836d90af3D7dCD0bEF9c',
    },
    decimals: 18,
    projectLink: 'https://shibanova.io',
  },
  matic: {
    symbol: 'MATIC',
    address: {
      56: '0xcc42724c6683b7e57334c4e856f4c9965ed682bd',
      97: '',
    },
    decimals: 18,
    projectLink: 'https://shibanova.io',
  },
  ada: {
    symbol: 'ADA',
    address: {
      56: '0x3ee2200efb3400fabb9aacf31297cbdd1d435d47',
      97: '',
    },
    decimals: 18,
    projectLink: 'https://shibanova.io',
  },
  dot: {
    symbol: 'DOT',
    address: {
      56: '0x7083609fce4d1d8dc0c979aab8c869ea2c873402',
      97: '',
    },
    decimals: 18,
    projectLink: 'https://shibanova.io',
  },
  link: {
    symbol: 'LINK',
    address: {
      56: '0xF8A0BF9cF54Bb92F17374d9e9A321E6a111a51bD',
      97: '',
    },
    decimals: 18,
    projectLink: 'https://shibanova.io',
  },
  crude: {
    symbol: 'CRUDE',
    address: {
      56: '0x8db702d9d561921c45be8df38830a653e4bc0299',
      97: '',
    },
    decimals: 18,
    projectLink: 'https://shibanova.io',
  },
  jaws: {
    symbol: 'JAWS',
    address: {
      56: '0xdd97ab35e3c0820215bc85a395e13671d84ccba2',
      97: '',
    },
    decimals: 18,
    projectLink: 'https://shibanova.io',
  },
  btcb: {
    symbol: 'BTCB',
    address: {
      56: '0x7130d2a12b9bcbfae4f2634d864a1ee1ce3ead9c',
      97: '0xE02dF9e3e622DeBdD69fb838bB799E3F168902c5',
    },
    decimals: 18,
    projectLink: 'https://bitcoin.org/',
  },
  wbnb: {
    symbol: 'wBNB',
    address: {
      56: '0xbb4cdb9cbd36b01bd1cbaebf2de08d9173bc095c',
      97: '0xae13d989dac2f0debff460ac112a837c89baa7cd',
    },
    decimals: 18,
    projectLink: 'https://pancakeswap.finance/',
  },
  busd: {
    symbol: 'BUSD',
    address: {
      56: '0xe9e7cea3dedca5984780bafc599bd69add087d56',
      97: '',
    },
    decimals: 18,
    projectLink: 'https://www.paxos.com/busd/',
  },
  eth: {
    symbol: 'ETH',
    address: {
      56: '0x2170ed0880ac9a755fd29b2688956bd959f933f8',
      97: '',
    },
    decimals: 18,
    projectLink: 'https://ethereum.org/en/',
  },
  usdc: {
    symbol: 'USDC',
    address: {
      56: '0x8ac76a51cc950d9822d68b83fe1ad97b32cd580d',
      97: '',
    },
    decimals: 18,
    projectLink: 'https://www.centre.io/usdc',
  },
  cake: {
    symbol: 'CAKE',
    address: {
      56: '0x0e09fabb73bd3ade0a17ecc321fd13a19e81ce82',
      97: '0xa35062141Fa33BCA92Ce69FeD37D0E8908868AAe',
    },
    decimals: 18,
    projectLink: 'https://pancakeswap.finance/',
  },
  usdt: {
    symbol: 'USDT',
    address: {
      97: '0xE02dF9e3e622DeBdD69fb838bB799E3F168902c5',
      56: '0x55d398326f99059ff775485246999027b3197955',
    },
    decimals: 18,
    projectLink: 'https://tether.to/',
  },

  tusd: {
    symbol: 'TUSD',
    address: {
      56: '0x14016e85a25aeb13065688cafb43044c2ef86784',
      97: '',
    },
    decimals: 18,
    projectLink: 'https://www.trueusd.com/',
  },
  ust: {
    symbol: 'UST',
    address: {
      56: '0x23396cf899ca06c4472205fc903bdb4de249d6fc',
      97: '',
    },
    decimals: 18,
    projectLink: 'https://mirror.finance/',
  },
  dai: {
    symbol: 'DAI',
    address: {
      56: '0x1af3f329e8be154074d8769d1ffa4ee058b1dbc3',
      97: '',
    },
    decimals: 18,
    projectLink: 'http://www.makerdao.com/',
  },

  ltc: {
    symbol: 'LTC',
    address: {
      56: '0x4338665cbb7b2485a8855a139b75d5e34ab0db94',
      97: '',
    },
    decimals: 18,
    projectLink: 'https://litecoin.org/',
  },
  xrp: {
    symbol: 'XRP',
    address: {
      56: '0x1d2f0da169ceb9fc7b3144628db156f3f6c60dbe',
      97: '0xE02dF9e3e622DeBdD69fb838bB799E3F168902c5',
    },
    decimals: 18,
    projectLink: 'https://ripple.com/xrp/',
  },
  uni: {
    symbol: 'UNI',
    address: {
      56: '0xbf5140a22578168fd562dccf235e5d43a02ce9b1',
      97: '0xE02dF9e3e622DeBdD69fb838bB799E3F168902c5',
    },
    decimals: 18,
    projectLink: 'https://uniswap.org/',
  },
  vai: {
    symbol: 'VAI',
    address: {
      56: '0x4bd17003473389a42daf6a0a729f6fdb328bbbd7',
      97: '',
    },
    decimals: 18,
    projectLink: 'https://venus.io/',
  },
  doge: {
    symbol: 'DOGE',
    address: {
      56: '0xba2ae424d960c26247dd6c32edc70b295c744c43',
      97: '',
    },
    decimals: 8,
    projectLink: 'https://dogecoin.com/',
  },
  trx: {
    symbol: 'TRX',
    address: {
      56: '0x85eac5ac2f758618dfa09bdbe0cf174e7d574d5b',
      97: '',
    },
    decimals: 18,
    projectLink: 'https://tron.network/',
  },
}

export default tokens
