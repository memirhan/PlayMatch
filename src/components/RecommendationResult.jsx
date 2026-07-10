import React from 'react';
import { Sparkles, ArrowLeft, Gamepad2 } from 'lucide-react';

export default function RecommendationResult({ data, onReset }) {
  if (!data) return null;

  return (
    <div className="glass-card" style={{ position: 'relative', overflow: 'hidden' }}>
      {/* Decorative background element */}
      <div style={{
        position: 'absolute',
        top: '-50px',
        right: '-50px',
        width: '200px',
        height: '200px',
        background: 'radial-gradient(circle, rgba(0, 255, 255, 0.2) 0%, transparent 70%)',
        borderRadius: '50%',
        zIndex: 0
      }} />

      <div style={{ position: 'relative', zIndex: 1 }}>
        <button 
          onClick={onReset}
          style={{ 
            background: 'transparent', 
            border: 'none', 
            color: 'var(--text-secondary)', 
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            marginBottom: '1.5rem',
            fontSize: '0.9rem'
          }}
        >
          <ArrowLeft size={16} /> Back to Profiler
        </button>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
          <Sparkles color="var(--accent-secondary)" />
          <h2 style={{ margin: 0, color: 'var(--accent-secondary)' }}>Your Perfect Match</h2>
        </div>

        <h1 style={{ 
          fontSize: '3rem', 
          marginBottom: '0.5rem', 
          background: 'linear-gradient(135deg, #fff, var(--text-secondary))',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          lineHeight: 1.1
        }}>
          {data.title}
        </h1>
        
        <p style={{ fontSize: '1.2rem', color: 'var(--text-secondary)', marginBottom: '2rem' }}>
          {data.genre} • {data.platform}
        </p>

        <div style={{ background: 'rgba(0,0,0,0.3)', padding: '1.5rem', borderRadius: '12px', marginBottom: '2rem' }}>
          <h3 style={{ marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Gamepad2 size={20} /> Why this game?
          </h3>
          <p style={{ lineHeight: 1.8 }}>{data.reasoning}</p>
        </div>

        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
          {data.tags && data.tags.map(tag => (
            <span key={tag} style={{
              padding: '0.25rem 0.75rem',
              background: 'rgba(138, 43, 226, 0.1)',
              border: '1px solid rgba(138, 43, 226, 0.3)',
              borderRadius: '20px',
              fontSize: '0.85rem',
              color: '#d8b4fe'
            }}>
              #{tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
