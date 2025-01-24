import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { headers } from "next/headers";
import { type ReactNode } from "react";
import { cookieToInitialState } from "wagmi";
import { getConfig } from "../wagmi";
import { Providers } from "./providers";
import { AlertProvider } from "@/contexts/AlertContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Web3 Course Platform",
  description: "Buy courses using tokens",
};

export default function RootLayout(props: { children: ReactNode }) {
  const initialState = cookieToInitialState(
    getConfig(),
    headers().get("cookie")
  );
  return (
    <html lang="en" className="bg-dark-light">
      <body className={inter.className}>
        <Providers initialState={initialState}>
          <AlertProvider>{props.children}</AlertProvider>
        </Providers>
      </body>
    </html>
  );
}
