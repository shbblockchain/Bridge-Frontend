import { useState, useEffect, useMemo } from "react";
import Header from "./components/Header";
import { Button } from "./components/ui/button";
import { Card, CardContent } from "./components/ui/card";
import config from "./config";

import SelectChainDropdown from "./components/SelectChainDropdown";
import SelectTokenModal from "./components/SelectTokenModal";
import ValueInput from "./components/ValueInput";
import { useAccount, useNetwork, useSwitchNetwork } from "wagmi";
import { Token } from "./@types/token";
import useWeb3Functions from "./hooks/useWeb3Functions";
import useStore from "./store";
import { valuesOf } from "./lib/utils";
import { formatUnits } from "viem";
import { ArrowDownIcon, Loader2Icon } from "lucide-react";
import { useDebounce } from "react-use";
import { useWeb3Modal } from "@web3modal/wagmi/react";
import { fetchInfo } from "./lib/fetch";

export default function App() {
  const { swap, fetchTokenBalance, calculateGasFee } = useWeb3Functions();
  const { switchNetwork } = useSwitchNetwork();
  const { chain } = useNetwork();
  const { address, isConnected } = useAccount();
  const { open } = useWeb3Modal();

  const { fromChain, toChain, tokens, pricesInUSD, transferGasFee } =
    useStore();

  const [loading, setLoading] = useState(false);
  const [amount, setAmount] = useState<number | string>("");
  const [receviedAmount, setReceviedAmount] = useState<number | string>("");
  const [token, setToken] = useState<Token | null>(tokens[0]);
  const [tokenBalance, setTokenBalance] = useState("");
  const [bridgeBalance, setBridgeBalance] = useState<string | undefined>(
    undefined
  );

  const fetchCurrentTokenBalance = async () => {
    if (token && fromChain && address) {
      fetchTokenBalance(token.contract, address, fromChain).then((balance) => {
        setTokenBalance(formatUnits(balance, token.decimals));
      });
    }
  };

  const fee = useMemo(() => {
    if (!toChain || !token) return 0;
    const ethPrice = pricesInUSD[toChain.nativeCurrency.symbol] || 0;
    const tokenPrice = pricesInUSD[token.symbol];
    return (transferGasFee * ethPrice) / tokenPrice;
  }, [token, toChain, pricesInUSD, transferGasFee]);

  const submit = async () => {
    if (!fromChain || !toChain || !token || !amount) return;
    setLoading(true);
    const recepit = await swap(amount, token, toChain);
    if (recepit?.transactionHash) {
      setAmount("");
      fetchCurrentTokenBalance();
    }
    setLoading(false);
  };

  useEffect(() => {
    if (amount && token) {
      const value = Number(amount) - fee;
      setReceviedAmount(value > 0 ? value : 0);
    } else setReceviedAmount("");
  }, [token, amount, fee]);

  useEffect(() => {
    if (toChain) {
      calculateGasFee(toChain);
    }
  }, [toChain]);

  useDebounce(
    () => {
      if (!toChain || !token) return () => {};

      const bridgeAddress = config.bridge[toChain.id];
      const toToken = config.tokens[toChain.id]?.[token.symbol];

      if (!bridgeAddress || !toToken) return () => {};

      if (toToken.pegging) {
        setBridgeBalance(undefined);
      } else {
        fetchTokenBalance(toToken.contract, bridgeAddress, toChain).then(
          (balance) => {
            setBridgeBalance(formatUnits(balance, toToken.decimals));
          }
        );
      }
    },
    500,
    [toChain, token]
  );

  useDebounce(
    () => {
      fetchCurrentTokenBalance();
    },
    500,
    [fromChain, token]
  );

  useEffect(() => {
    if (chain && !chain.unsupported) {
      if (toChain?.id === chain.id) {
        useStore.setState({
          toChain: fromChain,
        });
      }

      const tokens = valuesOf(config.tokens[chain.id] || []);
      useStore.setState({
        fromChain: chain,
        tokens,
      });
      setToken(tokens[0]);
      setAmount("");
    } else {
      switchNetwork?.(config.chains[0].id);
    }
  }, [chain]);

  useEffect(() => {
    fetchInfo().then((data) =>
      useStore.setState({
        pricesInUSD: data.prices,
        maxGasLimit: data.maxGasLimit,
      })
    );
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex flex-col items-center justify-center flex-1">
        <div className="w-full max-w-xl mx-auto">
          <div className="flex items-center justify-between gap-4 mb-8">
            <h2 className="text-xl font-bold lg:text-4xl">Bridge</h2>
            {/* <p>
              <span className="text-sm text-[#637592] mr-1">(0)</span>
              <span className="font-bold">Recent Transactions</span>
            </p> */}
          </div>
          <Card>
            <CardContent className="p-10">
              <div className="flex items-center justify-between mb-2">
                <SelectTokenModal
                  chain={fromChain}
                  token={token}
                  selectToken={(token) => setToken(token)}
                />
                <SelectChainDropdown
                  label="From:"
                  chain={fromChain}
                  selectChain={(chain) => switchNetwork?.(chain.id)}
                />
              </div>
              <div className="mb-4">
                <ValueInput
                  value={amount}
                  setValue={setAmount}
                  balance={tokenBalance}
                  invalid={+tokenBalance < +amount}
                  invalidMessage="Insufficient balance"
                />
              </div>
              <div className="flex justify-center mb-4">
                <Button
                  type="button"
                  size={"icon"}
                  className="rounded-full"
                  onClick={() =>
                    fromChain && toChain && switchNetwork?.(toChain.id)
                  }
                >
                  <ArrowDownIcon size={20} />
                </Button>
              </div>
              <div className="flex items-center justify-end mb-2">
                <SelectChainDropdown
                  label="To:"
                  chain={toChain}
                  selectChain={(chain) => useStore.setState({ toChain: chain })}
                />
              </div>
              <div className="mb-4">
                <ValueInput
                  readOnly
                  value={receviedAmount}
                  description={
                    fee && +amount > 0
                      ? `Network fee ≈ ${+fee.toFixed(6)} ${token?.symbol}`
                      : undefined
                  }
                  invalid={amount && fee ? +amount < +fee : false}
                  invalidMessage="Network fee is higher than the received amount"
                />
              </div>
              {bridgeBalance && +bridgeBalance < +amount && (
                <p className="text-sm font-bold text-red-500">
                  Sorry, there is not enough balance in the bridge
                </p>
              )}
              {isConnected ? (
                <Button
                  className="w-full h-auto p-4 mt-8 font-bold"
                  onClick={() => submit()}
                  disabled={
                    loading ||
                    +tokenBalance < +amount ||
                    (amount && fee ? +amount < +fee : false) ||
                    (bridgeBalance !== undefined
                      ? +bridgeBalance < +amount
                      : false)
                  }
                >
                  {loading && (
                    <Loader2Icon className="mr-2 animate-spin" size={20} />
                  )}
                  Confirm swap
                </Button>
              ) : (
                <Button
                  className="w-full h-auto p-4 mt-8 font-bold"
                  onClick={() => open()}
                >
                  Connect Wallet
                </Button>
              )}
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
