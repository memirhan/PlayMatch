import React, { useState } from 'react';
import ProfileWizard from './components/ProfileWizard';
import RecommendationResult from './components/RecommendationResult';
import { generateGameRecommendation } from './lib/ai';
import { Gamepad2 } from 'lucide-react';
import './index.css';

function App() {
  const [loading, setLoading] = useState(false);
  const [recommendation, setRecommendation] = useState(null);
  const [error, setError] = useState(null);
  
  const handleProfileSubmit = async (profileData) => {
    const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
    if (!apiKey) {
      setError("API Key is missing. Please check your .env file.");
      return;
    }

    setLoading(true);
    setError(null);
    setRecommendation(null);

    try {
      const result = await generateGameRecommendation(profileData, apiKey);
      setRecommendation(result);
    } catch (err) {
      console.error(err);
      setError("Failed to generate recommendation. " + (err.message || err));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app-container" style={{ maxWidth: '1000px', margin: '0 auto', padding: '3rem 2rem' }}>
      <header style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: '3rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <Gamepad2 size={42} color="var(--accent-primary)" />
          <h1 style={{ fontSize: '2.5rem', margin: 0, color: 'var(--text-primary)' }}>
            Play<span style={{ color: 'var(--accent-secondary)' }}>Match</span>
          </h1>
        </div>
      </header>

      {error && (
        <div className="glass-card fade-in" style={{ borderColor: 'var(--error-color)', marginBottom: '2rem' }}>
          <p style={{ color: 'var(--error-color)', margin: 0, fontWeight: 'bold' }}>{error}</p>
        </div>
      )}

      <main>
        {!loading && !recommendation && (
          <div className="glass-card fade-in">
            <ProfileWizard onSubmit={handleProfileSubmit} />
          </div>
        )}

        {loading && (
          <div className="glass-card loading-indicator fade-in">
            <div className="loading-spinner"></div>
            <h3>AI is analyzing your vibe...</h3>
            <p style={{ color: 'var(--text-secondary)', marginTop: '0.5rem' }}>Scanning thousands of games</p>
          </div>
        )}

        {recommendation && !loading && (
          <div className="fade-in">
            <RecommendationResult data={recommendation} onReset={() => setRecommendation(null)} />
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
