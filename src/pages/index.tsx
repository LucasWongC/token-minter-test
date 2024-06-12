import TokenMinter from "@/components/TokenMinter";
import NAVManager from "@/components/NAVManager";
import TokenBalance from "@/components/TokenBalance";
import { ConnectButton } from "@rainbow-me/rainbowkit";

export default function Home() {
  return (
    <div className="container mx-auto p-4 min-h-screen">
      <div className="py-4 flex items-center w-full justify-between px-10">
        <h1 className="text-2xl font-bold">Token Minter App</h1>
        <ConnectButton />
      </div>
      <TokenMinter />
      <NAVManager />
      <TokenBalance />
    </div>
  );
}
