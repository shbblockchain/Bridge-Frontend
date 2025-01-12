import type { Chain } from "viem";
import {
  erc20ABI,
  useAccount,
  useNetwork,
  usePublicClient,
  useWalletClient,
} from "wagmi";
import {
  http,
  parseGwei,
  parseUnits,
  getContract,
  zeroAddress,
  createPublicClient,
} from "viem";
import useStore from "@/store";
import config from "@/config";
import { bridgeAmoy } from "@/contracts/bridgeamoy";
import { bridgeHaust } from "@/contracts/bridgehaust";
import { Token } from "@/@types/token";
import { toast } from "react-toastify";

const useWeb3Functions = () => {
  const { chain } = useNetwork();
  const publicClient = usePublicClient();
  const { data: walletClient } = useWalletClient();
  const { address } = useAccount();
  const { maxGasLimit } = useStore();

  const fetchTokenBalance = async (
    tokenAddress: `0x${string}`,
    address: `0x${string}`,
    chain: Chain
  ) => {
    const client = createPublicClient({ chain, transport: http() });

    return tokenAddress === zeroAddress
      ? client.getBalance({ address })
      : client.readContract({
          abi: erc20ABI,
          address: tokenAddress,
          functionName: "balanceOf",
          args: [address],
        });
  };

  const calculateGasFee = async (chain: Chain) => {
    const client = createPublicClient({ chain, transport: http() });
    const gasPrice =
      chain.nativeCurrency.symbol === "haust"
        ? parseGwei("100")
        : await client.getGasPrice();
    const gasFee = Number(gasPrice * BigInt(maxGasLimit)) / 1e18;
    useStore.setState({ transferGasFee: gasFee });
  };

  const getBridgeContract = () => {
    if (!chain || !config.bridge[chain.id]) return null;
  
    const bridgeAbi = chain.id === config.baseChainId ? bridgeHaust : bridgeAmoy;
  
    return getContract({
      abi: bridgeAbi,
      address: config.bridge[chain.id],
      publicClient,
      walletClient: walletClient || undefined,
    });
  };

  const checkAllowance = async (
    tokenAddress: `0x${string}`,
    spender: `0x${string}`,
    amount: bigint
  ) => {
    if (!address || !publicClient || !chain) return false;
    const tokenContract = getContract({
      abi: erc20ABI,
      address: tokenAddress,
      publicClient,
      walletClient: walletClient || undefined,
    });

    const allowance = await tokenContract.read.allowance([address, spender]);

    if (allowance < amount) {
      const hash = await tokenContract.write.approve(
        [spender, 2n ** 256n - 1n],
        {
          gasPrice:
            chain.nativeCurrency.symbol === "haust"
              ? parseGwei("100")
              : undefined,
        }
      );
      await publicClient.waitForTransactionReceipt({ hash });

      toast.success("Spend approved");
    }
  };

  const swap = async (
    amount: string | number,
    token: Token,
    targetChain: Chain
  ) => {
    const bridgeContract = getBridgeContract();
    if (!chain || !bridgeContract || !walletClient || !amount) return;
  
    const value = parseUnits(`${amount}`, 18);
  
    try {
      if (token.contract !== zeroAddress) {
        await checkAllowance(token.contract, bridgeContract.address, value);
      }
  
      const params = [value] as const;
  
      const requestOptions: any = {
        account: walletClient.account,
        ...(token.contract === zeroAddress ? { value } : {}), 
      };

      if (chain.nativeCurrency.symbol === "haust") {
        requestOptions.gasPrice = parseGwei("100");
      }
  
      const { request } = await bridgeContract.simulate.bridge(params, requestOptions);
  
      const hash = await walletClient.writeContract(request);
  
      toast.info("Waiting for confirmation");
  
      const receipt = await publicClient.waitForTransactionReceipt({ hash });
  
      toast.success("Successfully deposited to bridge");
  
      return receipt;
    } catch (e: any) {
      toast.error(
        e?.walk?.()?.shortMessage ||
        e?.walk?.()?.message ||
        e?.message ||
        "Something went wrong"
      );
    }
  };
  
  return { fetchTokenBalance, calculateGasFee, swap };
};

export default useWeb3Functions;
