import config from "@/config";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Button } from "./ui/button";
import { ChevronDownIcon } from "lucide-react";
import { Chain } from "viem";
import { useMemo, useState } from "react";
import { valuesOf } from "@/lib/utils";
import { Token } from "@/@types/token";
import TokenImage from "./TokenImage";

type Props = {
  chain: Chain;
  token: Token | null;
  selectToken: (token: Token) => void;
};

export default function SelectTokenModal({ token, chain, selectToken }: Props) {
  const [open, setOpen] = useState(false);
  const tokens = useMemo(
    () => valuesOf(config.tokens[chain.id] || {}),
    [chain]
  );
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant={"accent"}
          className="gap-2 font-bold shadow-none"
          onClick={() => setOpen(true)}
        >
          <TokenImage token={token} chainId={chain.id} />
          {token?.symbol || "Select Token"}
          <ChevronDownIcon className="w-4 h-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:rounded-3xl max-h-[30rem] px-0 pb-0">
        <DialogHeader className="px-4">
          <DialogTitle>Select Token</DialogTitle>
        </DialogHeader>
        <div className="grid h-full py-4 overflow-auto divide-y">
          {tokens.map((item) => (
            <button
              key={item.contract}
              className="flex items-center gap-2 px-4 py-3 transition-colors hover:bg-gray-100"
              onClick={() => {
                selectToken(item);
                setOpen(false);
              }}
            >
              <TokenImage token={item} chainId={chain.id} />
              {item.name} <span className="text-gray-400">({item.symbol})</span>
            </button>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
}
