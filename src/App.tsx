import './App.css';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { Dashboard } from './pages/Dashboard';
import { useEffect, useState } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import { getSolanaBalance } from './helpers/solana.helper';
import Balance from './pages/Balance';

function App() {

  const wallet = useWallet();
  const [solanaBalance, setSolanaBalance] = useState<number | null>(null);

  useEffect(() => {
    if (wallet.publicKey) {
      getSolanaBalance(wallet.publicKey.toBase58())
        .then((balance) => setSolanaBalance(balance));
    } else {
      setSolanaBalance(null);
    }
    return () => {
      //
    }
  }, [wallet.publicKey]);

  return (
    <div className="App">
      <div className="header">
        <div className='wallet'>
          <Balance balance={solanaBalance}/>
          <WalletMultiButton></WalletMultiButton>
        </div>
      </div>
      <Dashboard />
    </div>
  );
}

export default App;