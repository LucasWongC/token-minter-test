import { useCallback, useState } from "react";
import { useAccount, useConfig, useWriteContract } from "wagmi";
import tokenMinter from "../contracts/TokenMinter.json";
import { isAddress, parseEther } from "viem";
import { waitForTransactionReceipt } from "wagmi/actions";

const TokenMinter = () => {
  const [address, setAddress] = useState("");
  const [amount, setAmount] = useState(0);

  const config = useConfig();
  const { isConnected } = useAccount();
  const { writeContractAsync } = useWriteContract();

  const handleMint = useCallback(async () => {
    try {
      if (!isAddress(address)) {
        throw new Error("Invalid address");
      }

      if (Number.isNaN(amount)) {
        throw new Error("Invalid amount");
      }

      const hash = await writeContractAsync({
        address: tokenMinter.address as `0x${string}`,
        abi: tokenMinter.abi,
        functionName: "mint",
        args: [address, parseEther(amount.toString())],
      });

      // wait until transaction to be confirmed
      const receipt = await waitForTransactionReceipt(config, { hash });
      // handle receipt
    } catch (err) {
      console.log(err);
      // error alert here
      window.alert(err);
    }
  }, [address, amount, config, writeContractAsync]);

  return (
    <div className="p-4">
      <h2 className="text-lg font-bold mb-4">Mint Tokens</h2>
      <input
        type="text"
        placeholder="Recipient Address"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
        className="border p-2 mb-4 w-full"
      />
      <input
        type="number"
        placeholder="Amount"
        value={amount}
        onChange={(e) => setAmount(Number(e.target.value))}
        className="border p-2 mb-4 w-full"
      />
      <button
        onClick={handleMint}
        className="bg-blue-500 text-white p-2 rounded"
        disabled={!isConnected}
      >
        Mint Tokens
      </button>
    </div>
  );
};

export default TokenMinter;
