/// <reference types="react-scripts" />

declare module '*.mp3';

interface Window {
    ethereum?: {
      isMetaMask?: true
      request?: (...args: any[]) => Promise<void>
    }
    BinanceChain?: {
      bnbSign?: (address: string, message: string) => Promise<{ publicKey: string; signature: string }>
    }
  }
  
  type SerializedBigNumber = string