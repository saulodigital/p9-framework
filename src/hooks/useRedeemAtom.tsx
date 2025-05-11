import { CURRENT_ENV } from '@/consts'
import { type GetContractReturnType } from 'viem'

import { getChainEnvConfig } from '@/lib/utils/environment'
import { useContractWriteAndWait } from './useContractWriteAndWait'
import { useMultivaultContract } from './useMultivaultContract'

export const useRedeemAtom = (contract: string) => {
    const multivault = useMultivaultContract(
        contract,
        getChainEnvConfig(CURRENT_ENV).chainId,
    ) as GetContractReturnType

    return useContractWriteAndWait({
        ...multivault,
        // @ts-expect-error TODO: Fix type for useContractWriteAndWait
        functionName: 'redeemAtom',
    })
}