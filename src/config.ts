import { Token } from "./@types/token";
import { nexisTestnet, localhost, sepolia } from "./chains";
import { zeroAddress } from "viem";
const config = {
  chains: [localhost, nexisTestnet],

  chainImage: {
    [localhost.id]: "/images/chains/ETH.png",
    [nexisTestnet.id]: "/images/chains/nexis.svg",
  },

  bridge: {
    [nexisTestnet.id]: "0xFeBDc90574aBE631F3b9A487fFbA9a30c321585f",
    [localhost.id]: "0x88b1a72685521e2260be569abe1a09d39da7f67e",
    // [sepolia.id]: "0x22d26af97b7bb109abac128e59c839f7f3cdfba5",
  } as Record<number, `0x${string}`>,

  tokens: {
    [nexisTestnet.id]: {
      nexis: {
        name: "Nexis",
        symbol: "NZT",
        contract: zeroAddress,
        decimals: 18,
        image: "/images/tokens/NZT.svg",
      },
      ETH: {
        name: "nexis-Peg ETH",
        symbol: "ETH",
        contract: "0xe6420a8e62a9ca34fd07ea1ff0c2b4879dbe8478",
        decimals: 18,
        pegging: true,
        image: "/images/tokens/ETH.png",
      },
      USDT: {
        name: "nexis-Peg USDT",
        symbol: "USDT",
        contract: "0x983307c1d35acf675ed9dc39e251fc0f15078981",
        decimals: 18,
        pegging: true,
        image: "/images/tokens/USDT.png",
      },
      USDC: {
        name: "nexis-Peg USDC",
        symbol: "USDC",
        contract: "0x204e9bcec3c0dde48b873ab60b3eec9cb1cfcede",
        decimals: 18,
        pegging: true,
        image: "/images/tokens/USDC.svg",
      },
    },
    [localhost.id]: {
      nexis: {
        name: "Nexis",
        symbol: "NZT",
        contract: "0xeda7136e9c40faab161d5c92e14804d69e214a30",
        decimals: 18,
        image: "/images/tokens/NZT.svg",
      },
      ETH: {
        name: "Ethereum",
        symbol: "ETH",
        contract: zeroAddress,
        decimals: 18,
        image: "/images/tokens/ETH.png",
      },
      USDT: {
        name: "Tether USD",
        symbol: "USDT",
        contract: "0xe62c92ff8bacc17930b0ba0202d1abbae6c0b770",
        decimals: 6,
        image: "/images/tokens/USDT.png",
      },
      USDC: {
        name: "USD Coin",
        symbol: "USDC",
        contract: "0xd04f6ca8f1d971a03d3b63a6f3ef1ac2aae211fa",
        decimals: 6,
        image: "/images/tokens/USDC.svg",
      },
    },
    // [sepolia.id]: {
    //   ETH: {
    //     name: "nexis-Peg ETH",
    //     symbol: "ETH",
    //     contract: "0xdae8e05b0af602ee02452175614b51ba819143d2",
    //     decimals: 18,
    //     pegging: true,
    //   },
    //   USDT: {
    //     name: "nexis-Peg USDT",
    //     symbol: "USDT",
    //     contract: "0xe45390efa47921b9c611b899e07901f74dce1d0f",
    //     decimals: 18,
    //     pegging: true,
    //   },
    //   USDC: {
    //     name: "nexis-Peg USDC",
    //     symbol: "USDC",
    //     contract: "0xb7596f6a5821c8744b33a840eeb434b99a95cfec",
    //     decimals: 18,
    //     pegging: true,
    //   },
    // },
  } as Record<number, Record<string, Token>>,
};

export default config;
