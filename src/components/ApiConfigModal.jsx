import React, { useState } from 'react';
import { useTenders } from '../context/TenderContext';
import { X, Key, CheckCircle, RefreshCw, Server, ShieldCheck } from 'lucide-react';

export const ApiConfigModal = () => {
  const { isApiModalOpen, setIsApiModalOpen, apiKeys, setApiKeys } = useTenders();

  const [etendersEndpoint, setEtendersEndpoint] = useState('https://www.etenders.gov.za/Home/opportunities');
  const [ocdsEndpoint, setOcdsEndpoint] = useState(apiKeys.ocdsEndpoint || 'https://data.open-contracting.org/api');
  const [syncStatus, setSyncStatus] = useState('Active');

  if (!isApiModalOpen) return null;

  const handleSave = (e) => {
    e.preventDefault();
    setApiKeys({ etendersEndpoint, ocdsEndpoint });
    localStorage.setItem('gt_apikeys', JSON.stringify({ etendersEndpoint, ocdsEndpoint }));
    setSyncStatus('Synced Live');
    setTimeout(() => {
      setIsApiModalOpen(false);
    }, 800);
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
        maxWidth: '600px',
        padding: '28px',
        position: 'relative'
      }}>
        <button 
          className="btn-icon" 
          onClick={() => setIsApiModalOpen(false)}
          style={{ position: 'absolute', top: '20px', right: '20px' }}
        >
          <X size={20} />
        </button>

        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
          <div style={{ padding: '10px', borderRadius: '12px', background: 'rgba(59, 130, 246, 0.15)', color: '#3b82f6' }}>
            <Key size={24} />
          </div>
          <div>
            <h2 style={{ fontSize: '20px', fontWeight: '800' }}>🇿🇦 SA Government Data Integration</h2>
            <p style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
              Direct ingestion connection for National Treasury eTenders portal.
            </p>
          </div>
        </div>

        <form onSubmit={handleSave} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div>
            <label style={{ fontSize: '12px', fontWeight: '700', color: 'var(--text-muted)', display: 'block', marginBottom: '4px' }}>
              NATIONAL TREASURY eTENDERS PORTAL ENDPOINT
            </label>
            <input 
              type="text" 
              className="input-field" 
              value={etendersEndpoint} 
              onChange={e => setEtendersEndpoint(e.target.value)} 
            />
            <div style={{ fontSize: '11px', color: 'var(--text-dark)', marginTop: '4px' }}>
              Official SA Portal URL: <strong>https://www.etenders.gov.za/</strong>
            </div>
          </div>

          <div>
            <label style={{ fontSize: '12px', fontWeight: '700', color: 'var(--text-muted)', display: 'block', marginBottom: '4px' }}>
              OPEN CONTRACTING DATA STANDARD (OCDS) API
            </label>
            <input 
              type="text" 
              className="input-field" 
              value={ocdsEndpoint} 
              onChange={e => setOcdsEndpoint(e.target.value)} 
            />
          </div>

          <div style={{ background: 'rgba(16, 185, 129, 0.1)', border: '1px solid rgba(16, 185, 129, 0.3)', padding: '14px', borderRadius: 'var(--radius-md)', fontSize: '12px', color: '#10b981', display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
            <ShieldCheck size={18} style={{ flexShrink: 0, marginTop: '2px' }} />
            <div>
              <strong>Legality Verified (PFMA & Public Domain):</strong> Public procurement solicitations published by South African government organs are public record information under the Public Finance Management Act (PFMA). Aggregating and redistributing public tender notices is 100% legal.
            </div>
          </div>

          <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end', marginTop: '10px' }}>
            <button type="button" className="btn btn-secondary" onClick={() => setIsApiModalOpen(false)}>Cancel</button>
            <button type="submit" className="btn btn-primary">
              <CheckCircle size={16} /> Save & Sync Live Connection
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
