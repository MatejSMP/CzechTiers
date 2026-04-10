import React, { useState } from 'react';
import LockScreen from './components/LockScreen';
import RankingPage from './components/RankingPage';

function App() {
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [decryptedPlayers, setDecryptedPlayers] = useState([]);
  const [sitePassword, setSitePassword] = useState('');

  const handleUnlock = (players, password) => {
    setDecryptedPlayers(players);
    setSitePassword(password);
    setIsUnlocked(true);
  };

  return (
    <div className="app-root">
      {!isUnlocked ? (
        <LockScreen onUnlock={handleUnlock} />
      ) : (
        <RankingPage players={decryptedPlayers} sitePassword={sitePassword} />
      )}
    </div>
  );
}

export default App;
