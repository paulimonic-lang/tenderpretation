import React from 'react';
import { useTenders } from '../context/TenderContext';
import { CATEGORIES, SOURCES, REGIONS, NOTICE_TYPES, BBBEE_LEVELS } from '../data/categories';
import { Search, RotateCcw, Filter, DollarSign, CheckSquare, Square, Award } from 'lucide-react';

export const FilterSidebar = () => {
  const { filters, setFilters } = useTenders();

  const handleReset = () => {
    setFilters({
      searchQuery: '',
      source: 'all',
      category: 'all',
      region: 'all',
      status: 'all',
      noticeType: 'all',
      bbbeeLevel: 'all',
      smeOnly: false,
      minBudget: '',
      maxBudget: ''
    });
  };

  return (
    <aside className="glass-panel" style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '15px', fontWeight: '700' }}>
          <Filter size={18} style={{ color: '#3b82f6' }} /> Filter SA Tenders
        </div>
        <button 
          onClick={handleReset}
          className="btn-icon"
          title="Reset Filters"
          style={{ fontSize: '12px', display: 'flex', alignItems: 'center', gap: '4px', padding: '4px 8px' }}
        >
          <RotateCcw size={14} /> Reset
        </button>
      </div>

      {/* Instant Keyword Search Input */}
      <div>
        <label style={{ fontSize: '12px', fontWeight: '700', color: 'var(--text-muted)', display: 'block', marginBottom: '6px' }}>
          KEYWORD / CIDB / LOCATION SEARCH
        </label>
        <div style={{ position: 'relative' }}>
          <input 
            type="text"
            className="input-field"
            placeholder="e.g. Eskom, Cape Town, Battery, CIDB 8CE..."
            value={filters.searchQuery}
            onChange={e => setFilters(prev => ({ ...prev, searchQuery: e.target.value }))}
            style={{ paddingLeft: '36px' }}
          />
          <Search size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-dark)' }} />
        </div>
      </div>



      {/* Sector Category */}
      <div>
        <label style={{ fontSize: '12px', fontWeight: '700', color: 'var(--text-muted)', display: 'block', marginBottom: '6px' }}>
          INDUSTRY SECTOR
        </label>
        <select 
          className="select-field"
          value={filters.category}
          onChange={e => setFilters(prev => ({ ...prev, category: e.target.value }))}
        >
          {CATEGORIES.map(c => (
            <option key={c.id} value={c.id}>{c.name}</option>
          ))}
        </select>
      </div>

      {/* SA Province */}
      <div>
        <label style={{ fontSize: '12px', fontWeight: '700', color: 'var(--text-muted)', display: 'block', marginBottom: '6px' }}>
          PROVINCE / LOCATION
        </label>
        <select 
          className="select-field"
          value={filters.region}
          onChange={e => setFilters(prev => ({ ...prev, region: e.target.value }))}
        >
          {REGIONS.map(r => (
            <option key={r.id} value={r.id}>{r.name}</option>
          ))}
        </select>
      </div>

      {/* B-BBEE Level Filter */}
      <div>
        <label style={{ fontSize: '12px', fontWeight: '700', color: 'var(--text-muted)', display: 'block', marginBottom: '6px' }}>
          B-BBEE LEVEL PREFERENCE
        </label>
        <select 
          className="select-field"
          value={filters.bbbeeLevel || 'all'}
          onChange={e => setFilters(prev => ({ ...prev, bbbeeLevel: e.target.value }))}
        >
          {BBBEE_LEVELS.map(b => (
            <option key={b.id} value={b.id}>{b.name}</option>
          ))}
        </select>
      </div>

      {/* Notice Type */}
      <div>
        <label style={{ fontSize: '12px', fontWeight: '700', color: 'var(--text-muted)', display: 'block', marginBottom: '6px' }}>
          SOLICITATION TYPE
        </label>
        <select 
          className="select-field"
          value={filters.noticeType}
          onChange={e => setFilters(prev => ({ ...prev, noticeType: e.target.value }))}
        >
          {NOTICE_TYPES.map(n => (
            <option key={n.id} value={n.id}>{n.name}</option>
          ))}
        </select>
      </div>

      {/* Budget Min/Max in ZAR */}
      <div>
        <label style={{ fontSize: '12px', fontWeight: '700', color: 'var(--text-muted)', display: 'block', marginBottom: '6px' }}>
          ESTIMATED BUDGET VALUE (ZAR R)
        </label>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
          <input 
            type="number"
            className="input-field"
            placeholder="Min R"
            value={filters.minBudget}
            onChange={e => setFilters(prev => ({ ...prev, minBudget: e.target.value }))}
          />
          <input 
            type="number"
            className="input-field"
            placeholder="Max R"
            value={filters.maxBudget}
            onChange={e => setFilters(prev => ({ ...prev, maxBudget: e.target.value }))}
          />
        </div>
      </div>

      {/* SMME Preference */}
      <div 
        onClick={() => setFilters(prev => ({ ...prev, smeOnly: !prev.smeOnly }))}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          cursor: 'pointer',
          padding: '10px',
          borderRadius: 'var(--radius-sm)',
          background: filters.smeOnly ? 'rgba(59, 130, 246, 0.1)' : 'var(--bg-input)',
          border: `1px solid ${filters.smeOnly ? '#3b82f6' : 'var(--border-color)'}`
        }}
      >
        {filters.smeOnly ? (
          <CheckSquare size={18} style={{ color: '#3b82f6' }} />
        ) : (
          <Square size={18} style={{ color: 'var(--text-dark)' }} />
        )}
        <div>
          <div style={{ fontSize: '13px', fontWeight: '700' }}>SMME / Small Business Friendly</div>
          <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Show 30% local subcontract set-asides</div>
        </div>
      </div>
    </aside>
  );
};
