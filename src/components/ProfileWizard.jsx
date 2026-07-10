import React, { useState } from 'react';
import { 
  Swords, Brain, Crosshair, Trophy, Car, Ghost, 
  Gamepad2, Gamepad, Coffee, Zap, Palette, Image as ImageIcon,
  Monitor, Smartphone, MonitorPlay, ArrowRight, ArrowLeft
} from 'lucide-react';

const GENRES = [
  { id: 'Action', icon: Swords },
  { id: 'Strategy', icon: Brain },
  { id: 'Shooter', icon: Crosshair },
  { id: 'RPG', icon: Trophy },
  { id: 'Racing', icon: Car },
  { id: 'Horror', icon: Ghost },
];

const PACING = [
  { id: 'Sweaty & Competitive', icon: Zap },
  { id: 'Chill & Relaxing', icon: Coffee },
  { id: 'Story Driven', icon: ImageIcon },
];

const ART_STYLES = [
  { id: 'Ultra-Realistic', icon: MonitorPlay },
  { id: 'Anime / Stylized', icon: Palette },
  { id: 'Pixel Art / Retro', icon: Gamepad },
];

const HARDWARE = [
  { id: 'High-End PC', icon: Monitor },
  { id: 'Console (PS5/Xbox)', icon: Gamepad2 },
  { id: 'Mobile', icon: Smartphone },
];

export default function ProfileWizard({ onSubmit }) {
  const [step, setStep] = useState(1);
  const [profile, setProfile] = useState({
    genres: [],
    pacing: '',
    artStyle: '',
    hardware: '',
    gamesPlayed: '',
    hoursPerWeek: 15
  });

  const updateProfile = (key, value) => {
    setProfile(prev => ({ ...prev, [key]: value }));
  };

  const handleNext = () => setStep(s => s + 1);
  const handleBack = () => setStep(s => s - 1);

  const handleSubmit = () => {
    onSubmit({
      ...profile,
      gamesPlayed: profile.gamesPlayed.split(',').map(g => g.trim()).filter(g => g)
    });
  };

  const canProceed = () => {
    switch (step) {
      case 1: return profile.genres.length > 0;
      case 2: return !!profile.pacing;
      case 3: return !!profile.artStyle;
      case 4: return !!profile.hardware;
      case 5: return profile.gamesPlayed.length > 2;
      case 6: return true;
      default: return false;
    }
  };

  return (
    <div className="wizard-container">
      {/* Progress Bar */}
      <div style={{ display: 'flex', gap: '4px', marginBottom: '2rem' }}>
        {[1,2,3,4,5,6].map(i => (
          <div key={i} style={{ 
            height: '4px', 
            flex: 1, 
            background: i <= step ? 'var(--accent-secondary)' : 'rgba(255,255,255,0.1)',
            borderRadius: '2px',
            transition: 'background 0.3s'
          }} />
        ))}
      </div>

      <div className="slide-in-right" key={step}>
        {step === 1 && (
          <div>
            <h2 style={{ color: 'var(--accent-primary)' }}>1. What's your vibe?</h2>
            <p style={{ color: 'var(--text-secondary)' }}>Select up to 3 favorite genres.</p>
            <div className="options-grid">
              {GENRES.map(({ id, icon: Icon }) => (
                <div 
                  key={id}
                  className={`option-card ${profile.genres.includes(id) ? 'selected' : ''}`}
                  onClick={() => {
                    if (profile.genres.includes(id)) {
                      updateProfile('genres', profile.genres.filter(g => g !== id));
                    } else if (profile.genres.length < 3) {
                      updateProfile('genres', [...profile.genres, id]);
                    }
                  }}
                >
                  <Icon size={32} className="icon" />
                  <span className="label">{id}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {step === 2 && (
          <div>
            <h2 style={{ color: 'var(--accent-secondary)' }}>2. How do you want to play?</h2>
            <div className="options-grid">
              {PACING.map(({ id, icon: Icon }) => (
                <div 
                  key={id}
                  className={`option-card ${profile.pacing === id ? 'selected' : ''}`}
                  onClick={() => updateProfile('pacing', id)}
                >
                  <Icon size={32} className="icon" />
                  <span className="label">{id}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {step === 3 && (
          <div>
            <h2 style={{ color: 'var(--accent-primary)' }}>3. Graphics matter.</h2>
            <p style={{ color: 'var(--text-secondary)' }}>What art style catches your eye?</p>
            <div className="options-grid">
              {ART_STYLES.map(({ id, icon: Icon }) => (
                <div 
                  key={id}
                  className={`option-card ${profile.artStyle === id ? 'selected' : ''}`}
                  onClick={() => updateProfile('artStyle', id)}
                >
                  <Icon size={32} className="icon" />
                  <span className="label">{id}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {step === 4 && (
          <div>
            <h2 style={{ color: 'var(--accent-secondary)' }}>4. Your battle station?</h2>
            <div className="options-grid">
              {HARDWARE.map(({ id, icon: Icon }) => (
                <div 
                  key={id}
                  className={`option-card ${profile.hardware === id ? 'selected' : ''}`}
                  onClick={() => updateProfile('hardware', id)}
                >
                  <Icon size={32} className="icon" />
                  <span className="label">{id}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {step === 5 && (
          <div>
            <h2 style={{ color: 'var(--accent-primary)' }}>5. What are you already playing?</h2>
            <p style={{ color: 'var(--text-secondary)' }}>We'll make sure not to recommend these. (Comma separated)</p>
            <input 
              type="text" 
              className="text-input" 
              placeholder="e.g. Valorant, League of Legends, CS2" 
              value={profile.gamesPlayed}
              onChange={(e) => updateProfile('gamesPlayed', e.target.value)}
              autoFocus
            />
          </div>
        )}

        {step === 6 && (
          <div>
            <h2 style={{ color: 'var(--accent-secondary)' }}>6. Time check.</h2>
            <p style={{ color: 'var(--text-secondary)' }}>How many hours can you dedicate per week?</p>
            <h1 style={{ textAlign: 'center', fontSize: '4rem', margin: '2rem 0', color: 'var(--text-primary)' }}>
              {profile.hoursPerWeek} <span style={{ fontSize: '1.5rem', color: 'var(--text-secondary)' }}>hrs</span>
            </h1>
            <input 
              type="range" 
              min="1" 
              max="60" 
              value={profile.hoursPerWeek}
              onChange={(e) => updateProfile('hoursPerWeek', parseInt(e.target.value))}
            />
          </div>
        )}
      </div>

      <div className="wizard-footer">
        {step > 1 ? (
          <button className="btn-secondary" onClick={handleBack}>
            <ArrowLeft size={20} /> Back
          </button>
        ) : (
          <div /> // Spacer
        )}
        
        {step < 6 ? (
          <button className="btn-primary" disabled={!canProceed()} onClick={handleNext}>
            Next <ArrowRight size={20} />
          </button>
        ) : (
          <button className="btn-primary" style={{ background: 'var(--accent-secondary)', color: '#000' }} onClick={handleSubmit}>
            Find My Next Obsession
          </button>
        )}
      </div>
    </div>
  );
}
