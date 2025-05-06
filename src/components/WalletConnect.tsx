// src/components/WalletConnect.tsx
"use client";

import React from "react";
import { useAccount, useConnect } from "wagmi";
import { injected } from "wagmi/connectors";

export function WalletConnect() {
  const { address, isConnected } = useAccount();
  const { connect, error } = useConnect({
    connector: injected(),
  });

  // If connected, just show the truncated address
  if (isConnected && address) {
    const truncated = `${address.slice(0, 6)}…${address.slice(-4)}`;
    return <p className="text-sm">Connected: <code>{truncated}</code></p>;
  }

  // Otherwise show a single “Connect Wallet” button
  return (
    <div className="flex flex-col space-y-1">
      <button
        onClick={() => connect()}
        className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700"
      >
        Connect Wallet
      </button>
      {error && (
        <p className="text-sm text-red-600">{(error as Error).message}</p>
      )}
    </div>
  );
}
