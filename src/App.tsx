import { useState, useEffect, useMemo, SVGProps } from "react";
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
import { ethers } from "ethers";

import { JSX } from "react/jsx-runtime";

export default function App() {
  const { swap, fetchTokenBalance, calculateGasFee } = useWeb3Functions();
  const { switchNetwork } = useSwitchNetwork();
  const { chain } = useNetwork();
  const { address, isConnected } = useAccount();
  const { open } = useWeb3Modal();

  const { fromChain, toChain, tokens, pricesInUSD, transferGasFee } =
    useStore();

    const footerNavigation = {
      solutions: [
        { name: 'Hosting', href: '#' },
        { name: 'Data Services', href: '#' },
        { name: 'Uptime Monitoring', href: '#' },
        { name: 'Enterprise Services', href: '#' },
      ],
      support: [
        { name: 'Pricing', href: '#' },
        { name: 'Documentation', href: '#' },
        { name: 'Guides', href: '#' },
        { name: 'API Reference', href: '#' },
      ],
      company: [
        { name: 'About', href: '#' },
        { name: 'Blog', href: '#' },
        { name: 'Jobs', href: '#' },
        { name: 'Press', href: '#' },
        { name: 'Partners', href: '#' },
      ],
      legal: [
        { name: 'Claim', href: '#' },
        { name: 'Privacy', href: '#' },
        { name: 'Terms', href: '#' },
      ],
      social: [
        {
          name: 'Discord',
          href: 'https://discord.gg/q8Kf8z7ttF',
          icon: (props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) => (
          <svg fill="currentColor" viewBox="0 0 24 20" {...props}>
            <path d="M20.348 1.5554C23.0585 5.56881 24.3971 10.0958 23.8967 15.3075C23.8946 15.3295 23.8832 15.3498 23.8652 15.3631C21.8126 16.8809 19.8239 17.8021 17.8631 18.413C17.8478 18.4177 17.8315 18.4174 17.8164 18.4123C17.8012 18.4071 17.7881 18.3973 17.7788 18.3843C17.3258 17.7495 16.9142 17.0803 16.5536 16.3776C16.5329 16.3362 16.5518 16.2863 16.5944 16.27C17.2481 16.022 17.8697 15.7247 18.4676 15.3727C18.5147 15.3449 18.5177 15.2769 18.4742 15.2443C18.3473 15.1495 18.2216 15.0498 18.1013 14.9501C18.0788 14.9316 18.0485 14.928 18.023 14.9404C14.1413 16.7456 9.88909 16.7456 5.9615 14.9404C5.936 14.9289 5.9057 14.9328 5.8838 14.951C5.7638 15.0507 5.6378 15.1495 5.5121 15.2443C5.4686 15.2769 5.4722 15.3449 5.5196 15.3727C6.1175 15.718 6.7391 16.022 7.3919 16.2712C7.4342 16.2876 7.4543 16.3362 7.4333 16.3776C7.0805 17.0812 6.6689 17.7504 6.2075 18.3852C6.1874 18.4109 6.1544 18.4227 6.1232 18.413C4.1717 17.8021 2.18301 16.8809 0.130411 15.3631C0.113311 15.3498 0.101011 15.3286 0.0992107 15.3066C-0.318989 10.7986 0.53331 6.23408 3.6446 1.55449C3.6521 1.5421 3.6635 1.53244 3.6767 1.5267C5.2076 0.819122 6.8477 0.298563 8.5619 0.00127361C8.5931 -0.00356037 8.6243 0.0109416 8.6405 0.0387369C8.8523 0.416392 9.0944 0.900696 9.2582 1.29648C11.0651 1.01852 12.9002 1.01852 14.7449 1.29648C14.9087 0.909155 15.1424 0.416392 15.3533 0.0387369C15.3608 0.024948 15.3724 0.013901 15.3866 0.0071731C15.4007 0.000445245 15.4165 -0.00161951 15.4319 0.00127361C17.147 0.29947 18.7871 0.820029 20.3168 1.5267C20.3303 1.53244 20.3414 1.5421 20.348 1.5554V1.5554ZM10.1768 10.1266C10.1957 8.79398 9.2309 7.69123 8.0198 7.69123C6.8186 7.69123 5.8631 8.78431 5.8631 10.1266C5.8631 11.4687 6.8375 12.5618 8.0198 12.5618C9.2213 12.5618 10.1768 11.4687 10.1768 10.1266V10.1266ZM18.1514 10.1266C18.1703 8.79398 17.2055 7.69123 15.9947 7.69123C14.7932 7.69123 13.8377 8.78431 13.8377 10.1266C13.8377 11.4687 14.8121 12.5618 15.9947 12.5618C17.2055 12.5618 18.1514 11.4687 18.1514 10.1266V10.1266Z"/>
          </svg>
          ),
        },
        {
          name: 'Twitter',
          href: '#',
          icon: (props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) => (
            <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
              <path
              fillRule="evenodd"
              d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
            </svg>
          ),
        },
        {
          name: 'GitHub',
          href: 'https://github.com/shbblockchain/Bridge-Frontend',
          icon: (props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) => (
            <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
              <path
                fillRule="evenodd"
                d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                clipRule="evenodd"
              />
            </svg>
          ),
        },
      ],
    }
    
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
        try {
            const balance = await fetchTokenBalance(token.contract, address, fromChain);
            setTokenBalance(formatUnits(balance, 18)); // using 18 decimals
        } catch (error) {
            console.error("Error fetching token balance:", error);
        }
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
      const fee = Number(amount) * 0.005; // 0.5% fee
      const received = Number(amount) - fee;
      setReceviedAmount(received > 0 ? received.toFixed(3) : "0");
    } else {
      setReceviedAmount("");
    }
  }, [token, amount]);  

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
          <div className="rounded-xl bg-gray-900/5 p-2 center ring-1 shadow-2xl ring-inset ring-gray-900/10 lg:-m-4 lg:rounded-2xl lg:p-4">
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
              {isConnected ? (
                <Button
                  className="w-full h-auto p-4 mt-8 font-bold"
                  onClick={() => submit()}
                >
                  {loading && (
                    <Loader2Icon className="mr-2 animate-spin" size={20} />
                  )}
                  Confirm Bridge
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
        </div>
        <footer aria-labelledby="footer-heading" className="relative">
        <div className="mx-auto max-w-7xl px-4 pb-8 pt-4 lg:px-4 items-center">
          <div className="border-t border-white/10 pt-8 ml:4 md:flex items-center md:items-center md:justify-between">
            <div className="flex space-x-3 ml-6">
              {footerNavigation.social.map((item) => (
                <a key={item.name} href={item.href} className="text-gray-500 hover:text-gray-400">
                  <span className="sr-only">{item.name}</span>
                  <item.icon className="h-6 w-6" aria-hidden="true" />
                </a>
              ))}
            </div>
          </div>
          <div className="mt-5 items-center">
        <p className="text-xs text-gray-400">
              &copy; 2025 Sahabat Blockchain. All rights reserved.
        </p>
        </div>
        </div>
      </footer>
      </main>
    </div>
  );
}
