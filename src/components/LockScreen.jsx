import React, { useState } from 'react';
import { Lock } from 'lucide-react';
import { initialData } from '../data';
import { decryptData } from '../utils/crypto';

export default function LockScreen({ onUnlock }) {
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const decrypted = decryptData(initialData.players, password);
    
    if (decrypted) {
      onUnlock(decrypted, password);
    } else {
      setError(true);
      setPassword('');
    }
  };

  return (
    <div className="lock-screen">
      <div className="lock-box">
        <Lock size={48} color="var(--accent)" style={{ marginBottom: 20 }} />
        <h2>Private Rankings</h2>
        <p style={{ color: 'var(--text-muted)', marginBottom: 24 }}>
          This page is password protected.
        </p>
        
        <form onSubmit={handleSubmit}>
          <input
            type="password"
            className="input-field"
            placeholder="Enter password..."
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              setError(false);
            }}
            autoFocus
          />
          <button type="submit" className="btn">Unlock</button>
        </form>
        
        <div className="error-text">
          {error && "Incorrect password. Please try again."}
        </div>
      </div>
    </div>
  );
}
