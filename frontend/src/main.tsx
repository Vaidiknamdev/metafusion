// import './index.css'; // or './tailwind.css'
import './index.css'; // or ./App.css if that’s your global Tailwind file

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
// import './index.css'
// import App from './App.tsx'
// Import necessary components from @pushchain/ui-kit
// PushUniversalAccountButton,
import {
  PushUniversalWalletProvider,
  PushUI,
} from '@pushchain/ui-kit';
import App from './App';
// import Appp from './Appp';
 const walletConfig = {
    network: PushUI.CONSTANTS.PUSH_NETWORK.TESTNET,
    supportedNamespaces: ["eip155", "push", "solana"], // ✅ Must add this
  };


createRoot(document.getElementById('root')!).render(
  <StrictMode>
     <PushUniversalWalletProvider config={walletConfig}>
      <App />
    </PushUniversalWalletProvider>
  </StrictMode>,
)
