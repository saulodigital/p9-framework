"use client";

import { PropsWithChildren, useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createConfig, http, WagmiProvider as _WagmiProvider } from 'wagmi';
import { base, mainnet, optimism } from 'wagmi/chains';
import { injected, metaMask, safe, walletConnect } from 'wagmi/connectors';

export const config = createConfig({
  chains: [mainnet, base],
  connectors: [
    injected(),
    metaMask(),
    safe(),
  ],
  transports: {
    [mainnet.id]: http(),
    [base.id]: http(),
  },
});

export default function WagmiProvider({ children }: PropsWithChildren) {
  // Create one QueryClient per app instance
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <_WagmiProvider config={config}>
        {children}
      </_WagmiProvider>
    </QueryClientProvider>
  )
};