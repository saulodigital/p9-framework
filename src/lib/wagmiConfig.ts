import { http, createConfig } from 'wagmi';
import { base, mainnet } from 'wagmi/chains';
import { injected, metaMask, safe } from 'wagmi/connectors';

export const wagmiConfig = createConfig({
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