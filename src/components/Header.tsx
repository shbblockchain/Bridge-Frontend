import { useAccount, useBalance, useNetwork } from "wagmi";
import { Button } from "./ui/button";
import { useWeb3Modal } from "@web3modal/wagmi/react";
import { cn } from "@/lib/utils";
import config from "@/config";

const links = [
  { name: "Router", link: "#", active: true },
  { name: "Pool", link: "#" },
  { name: "Wrap", link: "#" },
  { name: "Dex", link: "#" },
];

export default function Header() {
  const { isConnected, address } = useAccount();
  const { open } = useWeb3Modal();
  const { chain } = useNetwork();
  const { data } = useBalance({ address });
  // const chainName =
  //   chain && chain.name.split(" ")?.length > 1
  //     ? chain?.name
  //         .split(" ")
  //         .map((word) => word[0])
  //         .join("")
  //     : chain?.name;

  return (
    <div className="py-6">
      <div className="container flex items-center justify-between">
      <a href="/">
  <img src="/logo.png" alt="logo" className="h-[100px] w-[140px]" />
</a>

        <div className="items-center hidden gap-3 lg:flex">

        </div>

        <div className="flex gap-4">
          {isConnected && chain ? (
            <>
              <Button
                variant={"secondary"}
                onClick={() => open({ view: "Networks" })}
                className="h-auto font-bold"
              >
                <img
                  src={
                    config.chainImage[chain.id] || `/images/unknown-logo.png`
                  }
                  alt={chain.name}
                  className="object-contain w-6 h-6 mr-2 rounded-full"
                  onError={(e) =>
                    (e.currentTarget.src = "/images/unknown-logo.png")
                  }
                />

                {chain.name}
              </Button>
              <div className="bg-[#393838] rounded-xl py-1 pr-1 flex items-center">
                <span className="px-3 text-sm font-bold text-white">
                  {Number(data?.formatted).toLocaleString()} {data?.symbol}
                </span>
                <Button
                  variant={"secondary"}
                  className="font-bold"
                  onClick={() => open()}
                >
                  {address?.slice(0, 6)}...{address?.slice(-4)}
                </Button>
              </div>
            </>
          ) : (
            <Button onClick={() => open()}>Connect Wallet</Button>
          )}
        </div>
      </div>
    </div>
  );
}
