import React, { useState } from 'react';

const GENRES = [
  'Action', 'Adventure', 'RPG', 'Shooter', 'Strategy', 'Sports', 
  'Puzzle', 'Racing', 'Simulation', 'Horror', 'Mystery', 'Survival', 'Casual', 'Indie'
];

export default function ProfileForm({ onSubmit }) {
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [gamesPlayed, setGamesPlayed] = useState('');
  const [hoursPerWeek, setHoursPerWeek] = useState(10);
  const [playstyle, setPlaystyle] = useState('both'); // solo, team, both

  const toggleGenre = (genre) => {
    if (selectedGenres.includes(genre)) {
      setSelectedGenres(selectedGenres.filter(g => g !== genre));
    } else {
      if (selectedGenres.length < 5) {
        setSelectedGenres([...selectedGenres, genre]);
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      genres: selectedGenres,
      gamesPlayed: gamesPlayed.split(',').map(g => g.trim()).filter(g => g),
      hoursPerWeek,
      playstyle
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="input-group">
        <label className="input-label">Favorite Genres (Max 5)</label>
        <div className="chip-group">
          {GENRES.map(genre => (
            <div 
              key={genre} 
              className={`chip ${selectedGenres.includes(genre) ? 'selected' : ''}`}
              onClick={() => toggleGenre(genre)}
            >
              {genre}
            </div>
          ))}
        </div>
      </div>

      <div className="input-group">
        <label className="input-label" htmlFor="games">Games you currently play or love (comma separated)</label>
        <input 
          id="games"
          type="text" 
          className="text-input" 
          placeholder="e.g., Valorant, PUBG, GTA V, Minecraft" 
          value={gamesPlayed}
          onChange={(e) => setGamesPlayed(e.target.value)}
          required
        />
      </div>

      <div className="input-group">
        <label className="input-label" htmlFor="hours">Gaming Hours Per Week: {hoursPerWeek} hrs</label>
        <input 
          id="hours"
          type="range" 
          min="1" 
          max="40" 
          value={hoursPerWeek}
          onChange={(e) => setHoursPerWeek(parseInt(e.target.value))}
          style={{ width: '100%', accentColor: 'var(--accent-primary)' }}
        />
      </div>

      <div className="input-group">
        <label className="input-label">Preferred Playstyle</label>
        <div style={{ display: 'flex', gap: '1rem' }}>
          {['solo', 'team', 'both'].map(style => (
            <label key={style} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', textTransform: 'capitalize' }}>
              <input 
                type="radio" 
                name="playstyle" 
                value={style}
                checked={playstyle === style}
                onChange={() => setPlaystyle(style)}
              />
              {style}
            </label>
          ))}
        </div>
      </div>

      <button 
        type="submit" 
        className="btn-primary"
        disabled={selectedGenres.length === 0 || !gamesPlayed}
        style={{ marginTop: '1rem' }}
      >
        Find My Match
      </button>
    </form>
  );
}
