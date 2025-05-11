import process from "process";

import { Address } from "viem";
import { base, baseSepolia, type mainnet } from "viem/chains";

import logger from "@/lib/utils/logger";

const alchemyRpcUrlBaseSepolia =
  typeof window !== "undefined"
    ? window.ENV?.ALCHEMY_BASE_SEPOLIA_RPC_URL
    : process.env.ALCHEMY_BASE_SEPOLIA_RPC_URL;

const alchemyRpcUrlBaseMainnet =
  typeof window !== "undefined"
    ? window.ENV?.ALCHEMY_BASE_RPC_URL
    : process.env.ALCHEMY_BASE_RPC_URL;

const multiVaultContractAddressBaseMainnet =
  typeof window !== "undefined"
    ? window.ENV?.MULTIVAULT_ADDRESS_BASE_MAINNET
    : process.env.MULTIVAULT_ADDRESS_BASE_MAINNET;

const multiVaultContractAddressBaseSepolia =
  typeof window !== "undefined"
    ? window.ENV?.MULTIVAULT_ADDRESS_BASE_SEPOLIA
    : process.env.MULTIVAULT_ADDRESS_BASE_SEPOLIA;

type ChainId = typeof base.id | typeof baseSepolia.id | typeof mainnet.id;

export type ChainConfig = {
  chainId: ChainId;
  name: string;
  alchemyRpcUrl: string;
  contractAddress: `0x${string}`;
};

export type ChainEnv = "development" | "staging" | "production";

export const DEFAULT_CHAIN_ENV = "development";

export const getChainEnvConfig = (env: string): ChainConfig => {
  const chainOptions: Record<ChainEnv, ChainConfig> = {
    development: {
      chainId: baseSepolia.id,
      name: baseSepolia.name,
      alchemyRpcUrl: alchemyRpcUrlBaseSepolia,
      contractAddress: multiVaultContractAddressBaseSepolia as Address,
    },
    staging: {
      chainId: base.id,
      name: base.name,
      alchemyRpcUrl: alchemyRpcUrlBaseMainnet,
      contractAddress: multiVaultContractAddressBaseMainnet as Address,
    },
    production: {
      chainId: base.id,
      name: base.name,
      alchemyRpcUrl: alchemyRpcUrlBaseMainnet,
      contractAddress: multiVaultContractAddressBaseMainnet as Address,
    },
  };

  if (!env) {
    console.error(
      `No chain environment specified. Defaulting to ${DEFAULT_CHAIN_ENV}.`
    );
    return chainOptions[DEFAULT_CHAIN_ENV];
  }
  if (!(env in chainOptions)) {
    logger(`No config for provided environment: ${env}.`);
    return chainOptions[DEFAULT_CHAIN_ENV];
  }
  return chainOptions[env as ChainEnv];
};
