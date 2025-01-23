import { useAccount, useConnect, useDisconnect } from 'wagmi'

export const useWalletConnect = () => {
  const { address, isConnected, status } = useAccount()
  const { connectors, connect, error } = useConnect()
  const { disconnect } = useDisconnect()

  const connectWallet = (connector: any) => {
    connect({ connector })
  }

  const disconnectWallet = () => {
    disconnect()
  }

  return {
    address,
    isConnected,
    status,
    connectors,
    connectWallet,
    disconnectWallet,
    error
  }
}