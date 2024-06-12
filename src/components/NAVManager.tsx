import { useState, useCallback } from "react";
import {
  useAccount,
  useConfig,
  useReadContract,
  useWriteContract,
} from "wagmi";
import tokenMinter from "../contracts/TokenMinter.json";
import { waitForTransactionReceipt } from "wagmi/actions";
import { sepolia } from "viem/chains";

const NAVManager = () => {
  const [newNav, setNewNav] = useState(0);

  const { isConnected } = useAccount();
  const config = useConfig();
  const { writeContractAsync } = useWriteContract();
  const { data: nav } = useReadContract({
    address: tokenMinter.address as `0x${string}`,
    abi: tokenMinter.abi,
    functionName: "nav",
    chainId: sepolia.id,
  });

  const handleWrite = useCallback(async () => {
    try {
      if (Number.isNaN(newNav)) {
        throw new Error("Invalid amount");
      }

      const hash = await writeContractAsync({
        address: tokenMinter.address as `0x${string}`,
        abi: tokenMinter.abi,
        functionName: "updateNAV",
        args: [newNav],
      });

      // wait until transaction to be confirmed
      const receipt = await waitForTransactionReceipt(config, { hash });
      // handle receipt
    } catch (err) {
      console.log(err);
      // error alert here
      window.alert(err);
    }
  }, [config, newNav, writeContractAsync]);

  return (
    <div className="p-4">
      <h2 className="text-lg font-bold mb-4">NAV Manager</h2>
      <p>Current NAV: {nav != undefined ? nav.toString() : "Loading..."}</p>
      <input
        type="number"
        placeholder="New NAV"
        value={newNav}
        onChange={(e) => setNewNav(Number(e.target.value))}
        className="border p-2 mb-4 w-full"
      />
      <button
        onClick={handleWrite}
        className="bg-blue-500 text-white p-2 rounded"
        disabled={!isConnected}
      >
        Update NAV
      </button>
    </div>
  );
};

export default NAVManager;
