"use client";

import { useState } from "react";
import { useAccount, useConnect } from "wagmi";
import { injected } from "wagmi/connectors";

function truncateAddress(addr: string, chars = 4) {
  return `${addr.slice(0, chars + 2)}…${addr.slice(-chars)}`;
}

export function WalletConnect() {
  const { address, isConnected } = useAccount();
  const { connect, isLoading, pendingConnector, error } = useConnect();
  const [localError, setLocalError] = useState<string | null>(null);

  const handleConnect = async () => {
    setLocalError(null);
    try {
      await connect({ connector: injected() });
    } catch (err: any) {
      console.error("Wallet connect error:", err);
      setLocalError(err?.message || "Failed to connect wallet");
    }
  };

  if (isConnected && address) {
    return (
      <div className="text-sm">
        Connected as <code>{truncateAddress(address)}</code>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-start space-y-1">
      <button
        onClick={handleConnect}
        disabled={isLoading}
        className="px-4 py-2 bg-purple-600 text-white rounded disabled:opacity-50 flex items-center"
      >
        {isLoading && pendingConnector?.name === "Injected" ? (
          <svg
            className="animate-spin h-4 w-4 mr-2 text-white"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            role="status"
            aria-hidden="true"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8v8z"
            />
          </svg>
        ) : null}
        Connect Wallet
      </button>
      {error || localError ? (
        <p className="text-sm text-red-600">
          {(error as Error)?.message || localError}
        </p>
      ) : null}
    </div>
  );
}
