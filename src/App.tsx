import './App.css';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { Dashboard } from './pages/Dashboard';
import { useEffect, useState } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import { getSolanaBalance } from './helpers/solana.helper';



function App() {

  const wallet = useWallet();
  const [solanaBalance, setsolanaBalance] = useState<number>(0)
  useEffect(() => {
    if (wallet.publicKey) {
      getSolanaBalance(wallet.publicKey.toBase58()).then((balance) => setsolanaBalance(balance))
    }
  
    return () => {
      //
    }
  }, [wallet.publicKey])
  

  return (
    <div className="App">
      <div className="header">
        <div className='wallet'>
          <WalletMultiButton></WalletMultiButton>
        </div>
      </div>
      <Dashboard />
    </div>
  );
}

export default App;
