import React, { useState } from 'react';
import { useTenders } from '../context/TenderContext';
import { BBBEE_LEVELS } from '../data/categories';
import { X, UserCheck, ShieldCheck, Mail, Lock, Building, FileCheck, ArrowRight, Sparkles } from 'lucide-react';

export const AuthModal = () => {
  const { isAuthModalOpen, setIsAuthModalOpen, loginUser, registerUser } = useTenders();

  const [isRegisterMode, setIsRegisterMode] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [csdMaaa, setCsdMaaa] = useState('');
  const [bbbeeLevel, setBbbeeLevel] = useState('level-1');
  const [plan, setPlan] = useState('pro');
  const [loading, setLoading] = useState(false);

  if (!isAuthModalOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (isRegisterMode) {
      await registerUser({
        email,
        password,
        companyName: companyName || 'Contractor Enterprise SA',
        csdMaaa: csdMaaa || 'MAAA0912384',
        bbbeeLevel: BBBEE_LEVELS.find(b => b.id === bbbeeLevel)?.name || 'B-BBEE Level 1',
        plan
      });
    } else {
      await loginUser(email, password);
    }

    setLoading(false);
    setIsAuthModalOpen(false);
  };

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      zIndex: 300,
      background: 'rgba(0,0,0,0.75)',
      backdropFilter: 'blur(8px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px'
    }}>
      <div className="glass-panel animate-fade-in" style={{
        width: '100%',
        maxWidth: '540px',
        maxHeight: '92vh',
        overflowY: 'auto',
        padding: '32px',
        position: 'relative'
      }}>
        <button 
          className="btn-icon" 
          onClick={() => setIsAuthModalOpen(false)}
          style={{ position: 'absolute', top: '24px', right: '24px' }}
        >
          <X size={20} />
        </button>

        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '24px' }}>
          <div style={{ width: '48px', height: '48px', borderRadius: '16px', background: 'var(--accent-gradient)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', margin: '0 auto 12px', boxShadow: 'var(--shadow-glow)' }}>
            <UserCheck size={28} />
          </div>
          <h2 style={{ fontSize: '24px', fontWeight: '800', marginBottom: '6px' }}>
            {isRegisterMode ? 'Register Contractor Account' : 'Welcome Back to Tenderpretation'}
          </h2>
          <p style={{ fontSize: '13px', color: 'var(--text-muted)' }}>
            {isRegisterMode ? 'Create your SA procurement account to unlock live alerts & bids' : 'Sign in to access your custom alert feeds & bidding pipeline'}
          </p>
        </div>

        {/* Tab Switcher */}
        <div style={{ display: 'flex', background: 'var(--bg-input)', padding: '4px', borderRadius: 'var(--radius-md)', marginBottom: '24px', border: '1px solid var(--border-color)' }}>
          <button 
            className={`btn ${!isRegisterMode ? 'btn-primary' : ''}`}
            onClick={() => setIsRegisterMode(false)}
            style={{ flex: 1, padding: '8px', fontSize: '13px' }}
          >
            Sign In
          </button>
          <button 
            className={`btn ${isRegisterMode ? 'btn-primary' : ''}`}
            onClick={() => setIsRegisterMode(true)}
            style={{ flex: 1, padding: '8px', fontSize: '13px' }}
          >
            Register SA Business
          </button>
        </div>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div>
            <label style={{ fontSize: '12px', fontWeight: '700', color: 'var(--text-muted)', display: 'block', marginBottom: '6px' }}>
              EMAIL ADDRESS
            </label>
            <div style={{ position: 'relative' }}>
              <input 
                type="email"
                className="input-field"
                placeholder="contractor@enterprise.co.za"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
                style={{ paddingLeft: '38px' }}
              />
              <Mail size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-dark)' }} />
            </div>
          </div>

          <div>
            <label style={{ fontSize: '12px', fontWeight: '700', color: 'var(--text-muted)', display: 'block', marginBottom: '6px' }}>
              PASSWORD
            </label>
            <div style={{ position: 'relative' }}>
              <input 
                type="password"
                className="input-field"
                placeholder="••••••••••••"
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
                style={{ paddingLeft: '38px' }}
              />
              <Lock size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-dark)' }} />
            </div>
          </div>

          {isRegisterMode && (
            <>
              <div>
                <label style={{ fontSize: '12px', fontWeight: '700', color: 'var(--text-muted)', display: 'block', marginBottom: '6px' }}>
                  COMPANY / ENTERPRISE NAME
                </label>
                <div style={{ position: 'relative' }}>
                  <input 
                    type="text"
                    className="input-field"
                    placeholder="e.g. Apex Civil Projects (Pty) Ltd"
                    value={companyName}
                    onChange={e => setCompanyName(e.target.value)}
                    required
                    style={{ paddingLeft: '38px' }}
                  />
                  <Building size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-dark)' }} />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div>
                  <label style={{ fontSize: '12px', fontWeight: '700', color: 'var(--text-muted)', display: 'block', marginBottom: '6px' }}>
                    CSD MAAA SUPPLIER NUMBER
                  </label>
                  <input 
                    type="text"
                    className="input-field"
                    placeholder="MAAA0912384"
                    value={csdMaaa}
                    onChange={e => setCsdMaaa(e.target.value)}
                  />
                </div>

                <div>
                  <label style={{ fontSize: '12px', fontWeight: '700', color: 'var(--text-muted)', display: 'block', marginBottom: '6px' }}>
                    B-BBEE LEVEL
                  </label>
                  <select className="select-field" value={bbbeeLevel} onChange={e => setBbbeeLevel(e.target.value)}>
                    {BBBEE_LEVELS.filter(b => b.id !== 'all').map(b => (
                      <option key={b.id} value={b.id}>{b.name}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label style={{ fontSize: '12px', fontWeight: '700', color: 'var(--text-muted)', display: 'block', marginBottom: '6px' }}>
                  SELECT INTENDED SUBSCRIPTION PACKAGE
                </label>
                <select className="select-field" value={plan} onChange={e => setPlan(e.target.value)}>
                  <option value="pro">Pro Contractor (R490/mo) — Unlimited WhatsApp & Instant Alerts</option>
                  <option value="enterprise">Enterprise Procurement (R1,990/mo) — Multi-User & Auto Verification</option>
                  <option value="free">Starter Bidder (R0/mo) — Basic Weekly Summaries</option>
                </select>
              </div>

              <div style={{ background: 'rgba(16, 185, 129, 0.1)', border: '1px solid rgba(16, 185, 129, 0.3)', padding: '12px', borderRadius: 'var(--radius-sm)', fontSize: '12px', color: '#10b981', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <ShieldCheck size={16} /> Encrypted Supabase Database Auth & Row-Level Security Enabled.
              </div>
            </>
          )}

          <button type="submit" className="btn btn-primary" style={{ padding: '12px', marginTop: '10px', fontSize: '14px' }} disabled={loading}>
            {loading ? 'Processing...' : isRegisterMode ? <><Sparkles size={16} /> Create SA Account & Continue</> : <><ArrowRight size={16} /> Sign In to Tenderpretation</>}
          </button>
        </form>
      </div>
    </div>
  );
};
