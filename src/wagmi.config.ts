import { createWeb3Modal, defaultWagmiConfig } from "@web3modal/wagmi/react";
import config from "./config";

const chains = config.chains;

const projectId = import.meta.env.VITE_PROJECT_ID || "";

const metadata = {
  name: "React Starter Template",
  description: "A React starter template with Web3Modal v3 + Wagmi",
  url: "https://web3modal.com",
  icons: ["https://avatars.githubusercontent.com/u/37784886"],
};

export const wagmiConfig = defaultWagmiConfig({ chains, projectId, metadata });

createWeb3Modal({
  wagmiConfig,
  projectId,
  chains,
  defaultChain: config.chains[0],
});
