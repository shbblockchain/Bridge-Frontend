import { Token } from "@/@types/token";
import { create } from "zustand";
import type { Chain } from "viem";
import config from "@/config";

type StoreStateType = {
  fromChain: Chain;
  toChain?: Chain;
  tokens: Token[];
  tokenBalance: Record<string, number>;
  maxGasLimit: number;
  pricesInUSD: Record<string, number>;
  transferGasFee: number;
};

const initialState: StoreStateType = {
  fromChain: config.chains[0],
  toChain: config.chains[1],
  tokens: [],
  tokenBalance: {},
  maxGasLimit: 1e5,
  pricesInUSD: {},
  transferGasFee: 0,
};

const useStore = create<StoreStateType>(() => ({
  ...initialState,
}));

export default useStore;
