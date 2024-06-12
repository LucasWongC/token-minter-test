import { getDefaultConfig } from "@rainbow-me/rainbowkit";
import { http } from "wagmi";
import { sepolia } from "wagmi/chains";

export const config = getDefaultConfig({
  appName: "Token Minter Test",
  projectId: "de7a0395efe360783e023762e8b7dffb",
  chains: [sepolia],
  ssr: false,
  transports: {
    [sepolia.id]: http("https://gateway.tenderly.co/public/sepolia"),
  },
});
