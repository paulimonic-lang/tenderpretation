import React, { useState } from 'react';
import { Award, CheckCircle, AlertTriangle, ShieldCheck, Calculator } from 'lucide-react';

export const EligibilityCalculator = ({ tender }) => {
  const [csdRegistered, setCsdRegistered] = useState(true);
  const [sarsTaxPin, setSarsTaxPin] = useState(true);
  const [bbbeeLevel, setBbbeeLevel] = useState('level-1');
  const [coidaStanding, setCoidaStanding] = useState(true);
  const [yearsInBusiness, setYearsInBusiness] = useState(5);

  // Score calculation for South African Public Procurement Criteria (80/20 or 90/10 Preference System)
  let score = 0;
  
  // Mandatory Compliance Gates (40 pts)
  if (csdRegistered) score += 20;
  if (sarsTaxPin) score += 20;

  // B-BBEE Preference Points (20 pts)
  if (bbbeeLevel === 'level-1') score += 20;
  else if (bbbeeLevel === 'level-2') score += 18;
  else if (bbbeeLevel === 'level-3') score += 14;
  else score += 10;

  // COIDA & Financial Technical Capacity (40 pts)
  if (coidaStanding) score += 20;
  if (yearsInBusiness >= 3) score += 20;
  else score += 10;

  const getScoreBadge = (s) => {
    if (s >= 80) return { label: 'High Winning Probability (Compliant & 90/10 Ready)', color: '#10b981', bg: 'rgba(16, 185, 129, 0.15)' };
    if (s >= 60) return { label: 'Moderate Qualification (Check B-BBEE Points)', color: '#f59e0b', bg: 'rgba(245, 158, 11, 0.15)' };
    return { label: 'Non-Compliant Risk — Missing CSD or SARS PIN', color: '#f43f5e', bg: 'rgba(244, 63, 94, 0.15)' };
  };

  const badge = getScoreBadge(score);

  return (
    <div style={{ background: 'var(--bg-input)', padding: '20px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px', flexWrap: 'wrap', gap: '10px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '15px', fontWeight: '700' }}>
          <Calculator size={18} style={{ color: '#3b82f6' }} /> SA Public Procurement (PPPFA) Bid Readiness
        </div>
        <div style={{ background: badge.bg, color: badge.color, border: `1px solid ${badge.color}`, padding: '4px 12px', borderRadius: '12px', fontSize: '12px', fontWeight: '700' }}>
          Score: {score}% — {badge.label}
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '14px', marginBottom: '16px' }}>
        <div>
          <label style={{ fontSize: '12px', color: 'var(--text-muted)', display: 'block', marginBottom: '4px' }}>CSD MAAA Registration Number</label>
          <select className="select-field" value={csdRegistered} onChange={e => setCsdRegistered(e.target.value === 'true')}>
            <option value="true">Registered on National CSD (Active MAAA)</option>
            <option value="false">Not Registered / Inactive</option>
          </select>
        </div>

        <div>
          <label style={{ fontSize: '12px', color: 'var(--text-muted)', display: 'block', marginBottom: '4px' }}>SARS Tax Compliance Status PIN</label>
          <select className="select-field" value={sarsTaxPin} onChange={e => setSarsTaxPin(e.target.value === 'true')}>
            <option value="true">Valid SARS TCS PIN Compliant</option>
            <option value="false">Expired / Outstanding Returns</option>
          </select>
        </div>

        <div>
          <label style={{ fontSize: '12px', color: 'var(--text-muted)', display: 'block', marginBottom: '4px' }}>B-BBEE Contributor Level Status</label>
          <select className="select-field" value={bbbeeLevel} onChange={e => setBbbeeLevel(e.target.value)}>
            <option value="level-1">B-BBEE Level 1 (100% Contributor)</option>
            <option value="level-2">B-BBEE Level 2 (125% Contributor)</option>
            <option value="level-3">B-BBEE Level 3</option>
            <option value="level-4">B-BBEE Level 4</option>
          </select>
        </div>

        <div>
          <label style={{ fontSize: '12px', color: 'var(--text-muted)', display: 'block', marginBottom: '4px' }}>COIDA Letter of Good Standing</label>
          <select className="select-field" value={coidaStanding} onChange={e => setCoidaStanding(e.target.value === 'true')}>
            <option value="true">Valid COIDA Certificate</option>
            <option value="false">Not Applicable / Expired</option>
          </select>
        </div>
      </div>

      <div style={{ fontSize: '12px', color: 'var(--text-muted)', background: 'var(--bg-secondary)', padding: '12px', borderRadius: 'var(--radius-sm)', borderLeft: `3px solid ${badge.color}` }}>
        <strong>SA Procurement Regulatory Note:</strong> Under the Preferential Procurement Policy Framework Act (PPPFA), tenders over R50 Million are evaluated on a 90/10 point preference system (90 points Price, 10 points B-BBEE). Ensure your CSD profile is verified prior to closing date.
      </div>
    </div>
  );
};
