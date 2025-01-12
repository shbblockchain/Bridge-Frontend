import { Chain } from "viem";

export * from "viem/chains";

export const Haust = {
  id: 1570754601,
  network: "Haust Network",
  name: "Haust",
  nativeCurrency: {
    name: "Haust",
    symbol: "Haust",
    decimals: 18,
  },
  rpcUrls: {
    default: { http: ["https://rpc-test.haust.network"] },
    public: { http: ["https://rpc-test.haust.network"] },
  },
  blockExplorers: {
    default: {
      name: "Haust Explorer",
      url: "explorer-test.haust.network",
    },
  },
  testnet: true,
}
export const Amoy = {
  id: 80002,
  network: "Amoy",
  name: "Amoy",
  nativeCurrency: {
    name: "Amoy",
    symbol: "POL",
    decimals: 18,
  },
  rpcUrls: {
    default: { http: ["https://rpc.ankr.com/polygon_amoy"] },
    public: { http: ["https://rpc.ankr.com/polygon_amoy"] },
  },
  blockExplorers: {
    default: {
      name: "Amoy Explorer",
      url: "https://amoy.polygonscan.com",
    },
  },
  testnet: true,
} as Chain;
