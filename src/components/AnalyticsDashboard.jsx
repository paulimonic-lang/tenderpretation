import React from 'react';
import { useTenders } from '../context/TenderContext';
import { BarChart3, TrendingUp, DollarSign, Building2, Shield, Zap, PieChart } from 'lucide-react';

export const AnalyticsDashboard = () => {
  const { allRawTenders, savedAlerts, biddingPipeline } = useTenders();

  const totalContractVal = allRawTenders.reduce((acc, t) => acc + t.value, 0);
  const avgContractVal = Math.round(totalContractVal / allRawTenders.length);

  const sectorCounts = {
    'it-software': allRawTenders.filter(t => t.category === 'it-software').length,
    'green-energy': allRawTenders.filter(t => t.category === 'green-energy').length,
    'defense': allRawTenders.filter(t => t.category === 'defense').length,
    'healthcare': allRawTenders.filter(t => t.category === 'healthcare').length,
    'infrastructure': allRawTenders.filter(t => t.category === 'infrastructure').length,
    'consulting': allRawTenders.filter(t => t.category === 'consulting').length
  };

  return (
    <div style={{ padding: '8px 0', display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Header */}
      <div>
        <h2 style={{ fontSize: '24px', fontWeight: '800', display: 'flex', alignItems: 'center', gap: '10px' }}>
          <BarChart3 size={28} style={{ color: '#3b82f6' }} /> Market Intelligence & Procurement Analytics
        </h2>
        <p style={{ fontSize: '14px', color: 'var(--text-muted)' }}>
          Real-time aggregated procurement volume, sector expenditure trends, and active alert performance.
        </p>
      </div>

      {/* Stats Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px' }}>
        <div className="glass-panel" style={{ padding: '20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
            <span style={{ fontSize: '12px', color: 'var(--text-muted)', fontWeight: '700', textTransform: 'uppercase' }}>
              Tracked Market Volume
            </span>
            <div style={{ padding: '8px', borderRadius: '8px', background: 'rgba(16, 185, 129, 0.15)', color: '#10b981' }}>
              <DollarSign size={18} />
            </div>
          </div>
          <div style={{ fontSize: '26px', fontWeight: '800', color: '#10b981' }}>
            ${(totalContractVal / 1000000).toFixed(1)}M USD
          </div>
          <div style={{ fontSize: '11px', color: 'var(--text-dark)', marginTop: '4px' }}>
            +18.4% vs previous procurement cycle
          </div>
        </div>

        <div className="glass-panel" style={{ padding: '20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
            <span style={{ fontSize: '12px', color: 'var(--text-muted)', fontWeight: '700', textTransform: 'uppercase' }}>
              Avg Opportunity Size
            </span>
            <div style={{ padding: '8px', borderRadius: '8px', background: 'rgba(59, 130, 246, 0.15)', color: '#3b82f6' }}>
              <TrendingUp size={18} />
            </div>
          </div>
          <div style={{ fontSize: '26px', fontWeight: '800', color: '#3b82f6' }}>
            ${(avgContractVal / 1000000).toFixed(1)}M USD
          </div>
          <div style={{ fontSize: '11px', color: 'var(--text-dark)', marginTop: '4px' }}>
            Across {allRawTenders.length} active solicitations
          </div>
        </div>

        <div className="glass-panel" style={{ padding: '20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
            <span style={{ fontSize: '12px', color: 'var(--text-muted)', fontWeight: '700', textTransform: 'uppercase' }}>
              Subscribed Alert Feeds
            </span>
            <div style={{ padding: '8px', borderRadius: '8px', background: 'rgba(245, 158, 11, 0.15)', color: '#f59e0b' }}>
              <Zap size={18} />
            </div>
          </div>
          <div style={{ fontSize: '26px', fontWeight: '800', color: '#f59e0b' }}>
            {savedAlerts.filter(a => a.active).length} Feeds
          </div>
          <div style={{ fontSize: '11px', color: 'var(--text-dark)', marginTop: '4px' }}>
            Delivering instant SMS & Push alerts
          </div>
        </div>

        <div className="glass-panel" style={{ padding: '20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
            <span style={{ fontSize: '12px', color: 'var(--text-muted)', fontWeight: '700', textTransform: 'uppercase' }}>
              Active Proposals Tracked
            </span>
            <div style={{ padding: '8px', borderRadius: '8px', background: 'rgba(168, 85, 247, 0.15)', color: '#a855f7' }}>
              <Shield size={18} />
            </div>
          </div>
          <div style={{ fontSize: '26px', fontWeight: '800', color: '#a855f7' }}>
            {biddingPipeline.length} Bids
          </div>
          <div style={{ fontSize: '11px', color: 'var(--text-dark)', marginTop: '4px' }}>
            Active in bidding pipeline
          </div>
        </div>
      </div>

      {/* Sector Breakdown Visual Progress Bars */}
      <div className="glass-panel" style={{ padding: '24px' }}>
        <h3 style={{ fontSize: '16px', fontWeight: '700', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <PieChart size={18} style={{ color: '#3b82f6' }} /> Sector Opportunities Breakdown
        </h3>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          {[
            { label: 'Green Tech & Renewable Energy', count: sectorCounts['green-energy'], total: '$45.0M', color: '#10b981' },
            { label: 'Defense, Cyber & Security', count: sectorCounts['defense'], total: '$28.4M', color: '#f43f5e' },
            { label: 'IT, Cloud & Software', count: sectorCounts['it-software'], total: '$12.5M', color: '#3b82f6' },
            { label: 'Healthcare & Medical Supplies', count: sectorCounts['healthcare'], total: '$8.2M', color: '#8b5cf6' },
            { label: 'Infrastructure & Engineering', count: sectorCounts['infrastructure'], total: '$6.7M', color: '#06b6d4' },
            { label: 'Strategy, Legal & Consulting', count: sectorCounts['consulting'], total: '$1.8M', color: '#f59e0b' }
          ].map((sec, idx) => (
            <div key={idx}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', marginBottom: '6px' }}>
                <span style={{ fontWeight: '600' }}>{sec.label} ({sec.count} notices)</span>
                <span style={{ fontWeight: '700', color: sec.color }}>{sec.total}</span>
              </div>
              <div style={{ background: 'var(--bg-input)', height: '10px', borderRadius: '5px', overflow: 'hidden' }}>
                <div style={{ width: `${(sec.count / allRawTenders.length) * 100}%`, height: '100%', background: sec.color, borderRadius: '5px' }} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
