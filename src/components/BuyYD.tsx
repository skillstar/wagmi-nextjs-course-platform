'use client'

import React, { useState } from "react"
import { useWriteContract, useWaitForTransactionReceipt, useAccount, usePublicClient } from 'wagmi'
import { parseEther } from "viem"
import { YDTOKEN_CONTRACT } from '@/abi/contractConfig'

const EXCHANGE_RATE = 1000 // 1 ETH = 1000 YD

const BuyToken = () => {
  const [ethAmount, setEthAmount] = useState("")
  const [inputError, setInputError] = useState("")
  const { address, isConnected } = useAccount()
  const publicClient = usePublicClient()

  const { writeContract, data: hash, isPending } = useWriteContract()
  const { isLoading: isConfirming, isSuccess: isConfirmed } =
    useWaitForTransactionReceipt({
      hash,
    })

  const simulateTransaction = async (amount: string) => {
    if (!publicClient) {
      console.log('Network connection is not available', 'error')
      return false
    }

    if (!address) {
      console.log('Please connect your wallet', 'error')
      return false
    }

    try {
      await publicClient.simulateContract({
        address: YDTOKEN_CONTRACT.address,
        abi: YDTOKEN_CONTRACT.abi,
        functionName: 'buyTokens',
        value: parseEther(amount),
        account: address,
      })
      return true
    } catch (error) {
      console.error('Transaction simulation failed:', error)
      console.log('Transaction simulation failed', 'error')
      setInputError('Transaction would fail. Please check your input and try again.')
      return false
    }
  }

  const handleBuy = async () => {
    if (!publicClient) {
      console.log('Network connection is not available', 'error')
      return
    }

    if (!ethAmount || isNaN(Number(ethAmount))) return

    if (Number(ethAmount) < 0.001) {
      setInputError("Minimum purchase amount is 0.001 ETH")
      return
    }

    const isSimulationSuccessful = await simulateTransaction(ethAmount)
    if (!isSimulationSuccessful) return

    try {
      writeContract({
        ...YDTOKEN_CONTRACT,
        functionName: 'buyTokens',
        value: parseEther(ethAmount),
      })
    } catch (err) {
      console.error("Buy tokens failed:", err)
      setInputError("Transaction failed. Please try again.")
    }
  }

  const isButtonDisabled =
    !ethAmount ||
    isNaN(Number(ethAmount)) ||
    Number(ethAmount) <= 0 ||
    Boolean(inputError) ||
    isPending ||
    isConfirming

  return (
    <div>
      <input
        type="text"
        value={ethAmount}
        onChange={(e) => setEthAmount(e.target.value)}
        placeholder="Enter ETH amount"
      />
      <button disabled={isButtonDisabled} onClick={handleBuy}>
        {isConfirming ? 'Confirming...' : 'Buy Tokens'}
      </button>
      {inputError && <p>{inputError}</p>}
    </div>
  )
}

export default BuyToken