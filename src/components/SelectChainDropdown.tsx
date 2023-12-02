import config from "@/config";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { ChevronDownIcon } from "lucide-react";
import { Chain } from "viem";

type Props = {
  label?: string;
  chain?: Chain;
  selectChain: (chain: Chain) => void;
};

export default function SelectChainDropdown({
  label,
  chain,
  selectChain,
}: Props) {
  return (
    <div className="flex items-center text-sm">
      <span className="mr-2">{label || "From:"}</span>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button className="flex items-center font-bold hover:opacity-80">
            {chain?.name || "Select Chain"}
            <ChevronDownIcon className="w-4 h-4 ml-2" />
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="divide-y">
          {config.chains.map((chain) => (
            <DropdownMenuItem
              key={chain.name}
              onClick={() => selectChain(chain)}
              className="flex items-center py-3"
            >
              <img
                src={config.chainImage[chain.id] || "/images/unknown-logo.png"}
                alt={chain.name}
                className="object-contain w-6 h-6 mr-2 rounded-full"
              />
              {chain.name}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
