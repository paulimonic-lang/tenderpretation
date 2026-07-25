import React from 'react';
import { useTenders } from '../context/TenderContext';
import { 
  Building, 
  Calendar, 
  MapPin, 
  DollarSign, 
  Bookmark, 
  Sparkles, 
  ArrowRight, 
  Clock, 
  Tag, 
  CheckCircle,
  PlusCircle
} from 'lucide-react';

export const TenderCard = ({ tender }) => {
  const { setSelectedTender, savedTenders, toggleBookmark, biddingPipeline, updatePipelineStage } = useTenders();

  const isBookmarked = savedTenders.includes(tender.id);
  const trackedInPipeline = biddingPipeline.find(p => p.tenderId === tender.id);

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Active': return <span className="badge badge-active">Active RFP</span>;
      case 'Closing Soon': return <span className="badge badge-closing"><Clock size={12} /> Closing Soon</span>;
      case 'Awarded': return <span className="badge badge-awarded">Awarded</span>;
      default: return <span className="badge badge-source">{status}</span>;
    }
  };

  return (
    <div 
      className="glass-panel" 
      style={{
        padding: '20px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        transition: 'all 0.25s ease',
        border: '1px solid var(--border-color)',
        position: 'relative'
      }}
      onMouseEnter={(e) => e.currentTarget.style.borderColor = 'var(--border-highlight)'}
      onMouseLeave={(e) => e.currentTarget.style.borderColor = 'var(--border-color)'}
    >
      <div>
        {/* Header Badges */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
            <span className="badge badge-source">{tender.sourceName}</span>
            {getStatusBadge(tender.status)}
            {tender.smeFriendly && (
              <span className="badge" style={{ background: 'rgba(6, 182, 212, 0.15)', color: '#06b6d4', border: '1px solid rgba(6, 182, 212, 0.3)' }}>
                SME Friendly
              </span>
            )}
          </div>

          <button 
            className="btn-icon" 
            onClick={() => toggleBookmark(tender.id)}
            title={isBookmarked ? 'Remove Bookmark' : 'Bookmark Tender'}
          >
            <Bookmark size={18} fill={isBookmarked ? '#3b82f6' : 'none'} style={{ color: isBookmarked ? '#3b82f6' : 'var(--text-muted)' }} />
          </button>
        </div>

        {/* Title */}
        <h3 
          onClick={() => setSelectedTender(tender)}
          style={{
            fontSize: '16px',
            fontWeight: '700',
            lineHeight: '1.4',
            marginBottom: '10px',
            cursor: 'pointer',
            color: 'var(--text-main)'
          }}
        >
          {tender.title}
        </h3>

        {/* Agency & Location */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', marginBottom: '14px', fontSize: '13px', color: 'var(--text-muted)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Building size={14} style={{ color: '#3b82f6' }} />
            <span style={{ fontWeight: '600', color: 'var(--text-main)' }}>{tender.agency}</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <MapPin size={14} style={{ color: 'var(--text-dark)' }} />
            <span>{tender.location}</span>
          </div>
        </div>

        {/* Short Summary */}
        <p style={{
          fontSize: '13px',
          color: 'var(--text-muted)',
          lineHeight: '1.5',
          marginBottom: '16px',
          display: '-webkit-box',
          WebkitLineClamp: 2,
          WebkitBoxOrient: 'vertical',
          overflow: 'hidden'
        }}>
          {tender.summary}
        </p>
      </div>

      {/* Footer Specs & Action */}
      <div style={{ paddingTop: '14px', borderTop: '1px solid var(--border-color)' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
          <div>
            <div style={{ fontSize: '11px', color: 'var(--text-dark)', textTransform: 'uppercase', fontWeight: '700' }}>
              Est. Contract Value
            </div>
            <div style={{ fontSize: '18px', fontWeight: '800', color: '#10b981' }}>
              {tender.valueFormatted}
            </div>
          </div>

          <div style={{ textAlign: 'right' }}>
            <div style={{ fontSize: '11px', color: 'var(--text-dark)', textTransform: 'uppercase', fontWeight: '700' }}>
              Deadline
            </div>
            <div style={{ fontSize: '13px', fontWeight: '700', color: tender.daysRemaining <= 3 ? '#f43f5e' : 'var(--text-main)' }}>
              {tender.deadline} ({tender.daysRemaining}d left)
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '8px' }}>
          <button 
            className="btn btn-primary" 
            onClick={() => setSelectedTender(tender)}
            style={{ flex: 1, fontSize: '13px', padding: '8px 12px' }}
          >
            <Sparkles size={14} /> Analyze & View <ArrowRight size={14} />
          </button>

          {!trackedInPipeline ? (
            <button 
              className="btn btn-secondary" 
              onClick={() => updatePipelineStage(tender.id, 'interested')}
              style={{ fontSize: '12px', padding: '8px 10px' }}
              title="Add to Bidding Pipeline"
            >
              <PlusCircle size={16} /> Track
            </button>
          ) : (
            <button 
              className="btn btn-outline" 
              style={{ fontSize: '11px', padding: '8px 10px', color: '#10b981', borderColor: '#10b981' }}
              title="Tracked in Bidding Pipeline"
            >
              <CheckCircle size={14} /> In Pipeline
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
