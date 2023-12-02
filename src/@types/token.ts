export type Token = {
  name: string;
  symbol: string;
  contract: `0x${string}`;
  decimals: number;
  pegging?: boolean;
  image?: string;
};
