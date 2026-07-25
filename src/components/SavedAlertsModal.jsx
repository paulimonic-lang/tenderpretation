import React, { useState } from 'react';
import { useTenders } from '../context/TenderContext';
import { CATEGORIES, REGIONS } from '../data/categories';
import { X, BellRing, Plus, Trash2, CheckCircle2, Zap } from 'lucide-react';

export const SavedAlertsModal = () => {
  const { 
    isSavedAlertsModalOpen, 
    setIsSavedAlertsModalOpen, 
    savedAlerts, 
    addSavedAlert, 
    toggleSavedAlert, 
    deleteSavedAlert 
  } = useTenders();

  const [name, setName] = useState('');
  const [category, setCategory] = useState('it-software');
  const [region, setRegion] = useState('north-america');
  const [minBudget, setMinBudget] = useState('1000000');
  const [frequency, setFrequency] = useState('Instant SMS & Push');
  const [showAddForm, setShowAddForm] = useState(false);

  if (!isSavedAlertsModalOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    addSavedAlert(name, category, region, minBudget, frequency);
    setName('');
    setShowAddForm(false);
  };

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      zIndex: 250,
      background: 'rgba(0,0,0,0.7)',
      backdropFilter: 'blur(8px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px'
    }}>
      <div className="glass-panel animate-fade-in" style={{
        width: '100%',
        maxWidth: '720px',
        maxHeight: '90vh',
        overflowY: 'auto',
        padding: '28px',
        position: 'relative'
      }}>
        <button 
          className="btn-icon" 
          onClick={() => setIsSavedAlertsModalOpen(false)}
          style={{ position: 'absolute', top: '20px', right: '20px' }}
        >
          <X size={20} />
        </button>

        {/* Modal Header */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
          <div style={{ padding: '10px', borderRadius: '12px', background: 'rgba(245, 158, 11, 0.15)', color: '#f59e0b' }}>
            <BellRing size={24} />
          </div>
          <div>
            <h2 style={{ fontSize: '22px', fontWeight: '800' }}>Custom Alert Subscriptions</h2>
            <p style={{ fontSize: '13px', color: 'var(--text-muted)' }}>
              Subscribe to automated notification feeds whenever new matching government contracts are published.
            </p>
          </div>
        </div>

        {/* Action Bar */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <div style={{ fontSize: '14px', fontWeight: '700', color: 'var(--text-main)' }}>
            Active Subscription Feeds ({savedAlerts.length})
          </div>
          {!showAddForm && (
            <button className="btn btn-primary" onClick={() => setShowAddForm(true)}>
              <Plus size={16} /> Create New Alert Feed
            </button>
          )}
        </div>

        {/* Add New Alert Form */}
        {showAddForm && (
          <form onSubmit={handleSubmit} style={{
            background: 'var(--bg-input)',
            padding: '20px',
            borderRadius: 'var(--radius-md)',
            border: '1px solid var(--border-highlight)',
            marginBottom: '24px'
          }}>
            <h3 style={{ fontSize: '15px', fontWeight: '700', marginBottom: '14px', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Zap size={16} style={{ color: '#f59e0b' }} /> Configure Alert Subscription
            </h3>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px', marginBottom: '14px' }}>
              <div>
                <label style={{ fontSize: '12px', color: 'var(--text-muted)', display: 'block', marginBottom: '4px' }}>Feed Name</label>
                <input 
                  type="text" 
                  className="input-field" 
                  placeholder="e.g. US Defense & AI Radar Feed" 
                  value={name} 
                  onChange={e => setName(e.target.value)} 
                  required
                />
              </div>

              <div>
                <label style={{ fontSize: '12px', color: 'var(--text-muted)', display: 'block', marginBottom: '4px' }}>Target Sector</label>
                <select className="select-field" value={category} onChange={e => setCategory(e.target.value)}>
                  {CATEGORIES.filter(c => c.id !== 'all').map(c => (
                    <option key={c.id} value={c.id}>{c.name}</option>
                  ))}
                </select>
              </div>

              <div>
                <label style={{ fontSize: '12px', color: 'var(--text-muted)', display: 'block', marginBottom: '4px' }}>Target Region</label>
                <select className="select-field" value={region} onChange={e => setRegion(e.target.value)}>
                  {REGIONS.map(r => (
                    <option key={r.id} value={r.id}>{r.name}</option>
                  ))}
                </select>
              </div>

              <div>
                <label style={{ fontSize: '12px', color: 'var(--text-muted)', display: 'block', marginBottom: '4px' }}>Minimum Contract Budget ($)</label>
                <input 
                  type="number" 
                  className="input-field" 
                  placeholder="1000000" 
                  value={minBudget} 
                  onChange={e => setMinBudget(e.target.value)} 
                />
              </div>
            </div>

            <div style={{ marginBottom: '16px' }}>
              <label style={{ fontSize: '12px', color: 'var(--text-muted)', display: 'block', marginBottom: '4px' }}>Alert Delivery Channel</label>
              <select className="select-field" value={frequency} onChange={e => setFrequency(e.target.value)}>
                <option value="Instant SMS & Push">Instant SMS & In-App Push (Real-Time)</option>
                <option value="Daily Executive Digest">Daily Executive Digest (8:00 AM)</option>
                <option value="Weekly Briefing">Weekly Executive Summary</option>
              </select>
            </div>

            <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
              <button type="button" className="btn btn-secondary" onClick={() => setShowAddForm(false)}>Cancel</button>
              <button type="submit" className="btn btn-primary">Subscribe Alert Feed</button>
            </div>
          </form>
        )}

        {/* Existing Alerts List */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {savedAlerts.map(alert => (
            <div 
              key={alert.id}
              style={{
                background: 'var(--bg-secondary)',
                border: '1px solid var(--border-color)',
                borderRadius: 'var(--radius-md)',
                padding: '16px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: '16px'
              }}
            >
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                  <span style={{ fontSize: '15px', fontWeight: '700' }}>{alert.name}</span>
                  {alert.active ? (
                    <span className="badge badge-active"><CheckCircle2 size={12} /> Active Subscription</span>
                  ) : (
                    <span className="badge" style={{ background: 'var(--bg-input)', color: 'var(--text-dark)' }}>Paused</span>
                  )}
                </div>
                <div style={{ fontSize: '12px', color: 'var(--text-muted)', display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                  <span>Sector: {alert.category}</span>
                  <span>•</span>
                  <span>Region: {alert.region}</span>
                  <span>•</span>
                  <span>Min Value: ${Number(alert.minBudget).toLocaleString()}</span>
                  <span>•</span>
                  <span style={{ color: '#f59e0b', fontWeight: '600' }}>{alert.frequency}</span>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <button 
                  className={`btn ${alert.active ? 'btn-secondary' : 'btn-outline'}`}
                  style={{ fontSize: '12px', padding: '6px 12px' }}
                  onClick={() => toggleSavedAlert(alert.id)}
                >
                  {alert.active ? 'Pause' : 'Resume'}
                </button>
                <button className="btn-icon" onClick={() => deleteSavedAlert(alert.id)} title="Delete Alert">
                  <Trash2 size={16} style={{ color: '#f43f5e' }} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
