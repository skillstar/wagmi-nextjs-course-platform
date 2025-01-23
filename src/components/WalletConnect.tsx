"use client";
import { useState, useRef } from "react";
import { useWalletConnect } from "@/hooks/useWalletConnect";
import { LogOut } from "lucide-react";
import { shortenAddress } from "@/utils/shortenAddress";
import ContactButton from "@/components/ui/ContactButton";
import Link from "next/link";

export default function WalletConnect() {
  const {
    address,
    isConnected,
    status,
    connectors,
    connectWallet,
    disconnectWallet,
    error,
  } = useWalletConnect();
  const timeoutRef = useRef<NodeJS.Timeout>();
  const [showWalletMenu, setShowWalletMenu] = useState(false);

  const handleMouseEnter = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setShowWalletMenu(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setShowWalletMenu(false);
    }, 300); // 300ms 的延迟，给用户足够时间移动到菜单
  };

  return (
    <div
      className="relative inline-block"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {isConnected && address ? (
        <div className="avatar online cursor-pointer">
          <div className="w-8 rounded-full relative overflow-hidden">
            <img
              src="/default-avatar.png"
              alt="Avatar"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      ) : (
        <button
          className="btn btn-sm hover:bg-primary hover:text-black"
          onClick={() => setShowWalletMenu(true)}
        >
          Connect Wallet
        </button>
      )}

      {/* 下拉菜单 */}
      {showWalletMenu && (
        <div
          className="absolute right-0 top-[calc(100%+0.5rem)]  z-50"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          {isConnected && address ? (
            <div className="px-4 space-y-3 w-64">
              <div className="flex items-center space-x-3 btn-sm">
                {/* 左侧头像 */}
                <div className="flex-shrink-0">
                  <div className="w-10 h-10 rounded-full ring ring-primary-light ring-offset-base-100 ring-offset-1 bg-gray-200 overflow-hidden">
                    <img
                      src="/default-avatar.png"
                      alt="User avatar"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>

                {/* 右侧信息 */}
                <div className="flex flex-col justify-center min-w-0">
                  {/* 上方名字 */}
                  <div className="text-sm font-medium text-gray-300 truncate">
                    John Doe
                  </div>
                  {/* 下方地址 */}
                  <div className="text-xs text-gray-500 truncate">
                    {shortenAddress(address)}
                  </div>
                </div>
              </div>

              <div className="text-sm text-primary mb-4">
                <p>Total Learning Time: 0 hrs</p>
              </div>

              <div className="flex items-center justify-between">
                <Link
                  href="/user-center"
                  className="btn btn-sm hover:bg-primary hover:text-black"
                >
                  User Center
                </Link>
                <Link
                  href="#"
                  className="btn btn-sm hover:bg-primary hover:text-black"
                >
                  Study Hub
                </Link>
              </div>

              <button
                onClick={disconnectWallet}
                className="btn btn-xs w-full bg-primary-dark text-dark-lighter text-sm rounded-md hover:bg-primary-light transition-colors duration-200"
              >
                <LogOut size={12} />
                Disconnect
              </button>
            </div>
          ) : (
            <div>
              {connectors.map((connector) => (
                <ContactButton
                  key={connector.id}
                  text={connector.name}
                  onClick={() => {
                    setShowWalletMenu(false);
                    connectWallet(connector);
                  }}
                  className="w-full"
                />
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
