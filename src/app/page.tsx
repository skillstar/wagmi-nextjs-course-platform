"use client";

import { useWalletConnect } from "@/hooks/useWalletConnect";
import Footer from "@/components/Footer";
import Header from "@/components/Header";

import BuyYD from "@/components/BuyYD";
function App() {
  const {
    address,
    isConnected,
    status,
    connectors,
    connectWallet,
    disconnectWallet,
    error,
  } = useWalletConnect();

  return (
    <>
      <Header />
      <div className="mt-28">
        <h2>Account</h2>
        <div>
          status: {status}
          <br />
          address: {address}
          <br />
          connected: {isConnected.toString()}
        </div>

        {isConnected ? (
          <button onClick={disconnectWallet}>Disconnect</button>
        ) : (
          <div>
            <h2>Connect</h2>
            {connectors.map((connector) => (
              <button
                key={connector.id}
                onClick={() => connectWallet(connector)}
              >
                {connector.name}
              </button>
            ))}
            {error && <div>Error: {error.message}</div>}
          </div>
        )}
        <BuyYD />
      </div>
      <Footer />
    </>
  );
}

export default App;
