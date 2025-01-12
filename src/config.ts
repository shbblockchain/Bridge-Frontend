import { Token } from "./@types/token";
import { Haust, Amoy } from "./chains";

const config = {
  chains: [Haust, Amoy],

  chainImage: {
    [Amoy.id]: "/images/chains/pol.png",
    [Haust.id]: "/images/chains/haust.png",
  },

  bridge: {
    [Haust.id]: "0x1261ADa2D961928505d599EF440673A515a24039",
    [Amoy.id]: "0x2E41905d6fd2792bC0DD887c7570981CD5df6Dd9",
  } as Record<number, `0x${string}`>,

  baseChainId: Haust.id, 

  tokens: {
    [Haust.id]: {
      USDT: {
        name: "Tether USD",
        symbol: "USDT",
        contract: "0x08fFb781EFe1626560cde3036a439B3e2C1D113F",
        decimals: 18,
        pegging: true,
        image: "/images/tokens/USDT.png",
      },
    },
    [Amoy.id]: {
      USDT: {
        name: "Tether USD",
        symbol: "USDT",
        contract: "0x3ea9912f3a54f8e409d1daea3fb7b48fee84cf22",
        decimals: 6,
        image: "/images/tokens/USDT.png",
      },
    },
  } as Record<number, Record<string, Token>>,
};

export default config;
