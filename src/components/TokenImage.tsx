import { Token } from "@/@types/token";
import config from "@/config";
import { cn } from "@/lib/utils";
import { zeroAddress } from "viem";

type Props = {
  chainId?: number;
  token?: Token | null;
  className?: string;
};

export default function TokenImage({ token, chainId, className }: Props) {
  return (
    <div className={cn("relative", className)}>
      <img
        src={token?.image || "/images/unknown-logo.png"}
        alt={token?.symbol || "Unknown"}
        className="object-contain w-6 h-6"
      />
      {chainId && token && token?.contract !== zeroAddress && (
        <img
          src={config.chainImage[chainId]}
          alt={`${chainId} Logo`}
          className="absolute object-contain w-4 h-4 rounded-full -bottom-1 -left-1"
        />
      )}
    </div>
  );
}
