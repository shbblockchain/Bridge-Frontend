import { Chain } from "viem";

export * from "viem/chains";

export const nexisTestnet = {
  id: 2370,
  network: "nexis",
  name: "Nexis Testnet",
  nativeCurrency: {
    name: "Nexis",
    symbol: "NZT",
    decimals: 18,
  },
  rpcUrls: {
    default: { http: ["https://evm-test.nexis.network"] },
    public: { http: ["https://evm-test.nexis.network"] },
  },
  blockExplorers: {
    default: {
      name: "Nexis Explorer",
      url: "https://evm-testnet.nexiscan.io",
    },
  },
  testnet: true,
} as Chain;
