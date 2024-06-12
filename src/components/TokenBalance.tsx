import { useCallback, useState } from "react";
import { useConfig } from "wagmi";
import tokenMinter from "../contracts/TokenMinter.json";
import { formatEther } from "viem";
import { readContract } from "wagmi/actions";

const TokenBalance = () => {
  const [address, setAddress] = useState("");
  const [balance, setBalance] = useState<bigint>();

  const config = useConfig();

  const handleFetch = useCallback(async () => {
    try {
      const result = await readContract(config, {
        address: tokenMinter.address as `0x${string}`,
        abi: tokenMinter.abi,
        functionName: "balanceOf",
        args: [address],
      });

      setBalance(result as bigint);
    } catch (err) {
      console.log(err);
      window.alert(err);
    }
  }, [address, config]);

  return (
    <div className="p-4">
      <h2 className="text-lg font-bold mb-4">Check Token Balance</h2>
      <input
        type="text"
        placeholder="Address"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
        className="border p-2 mb-4 w-full"
      />
      <button
        className="bg-blue-500 text-white p-2 rounded"
        onClick={handleFetch}
      >
        Check Balance
      </button>
      {balance != undefined && <p>Balance: {formatEther(balance)}</p>}
    </div>
  );
};

export default TokenBalance;
