import React, { useState } from 'react';
import { useTenders } from '../context/TenderContext';
import { apiService } from '../services/apiService';
import { EligibilityCalculator } from './EligibilityCalculator';
import { 
  X, 
  Building, 
  MapPin, 
  Calendar, 
  Clock, 
  CheckCircle, 
  Download, 
  Bookmark, 
  Sparkles, 
  FileText, 
  ExternalLink,
  Shield,
  Layers,
  PlusCircle
} from 'lucide-react';

export const TenderDetailModal = () => {
  const { selectedTender, setSelectedTender, savedTenders, toggleBookmark, biddingPipeline, updatePipelineStage } = useTenders();
  const [activeTab, setActiveTab] = useState('overview');

  if (!selectedTender) return null;

  const isBookmarked = savedTenders.includes(selectedTender.id);
  const trackedInPipeline = biddingPipeline.find(p => p.tenderId === selectedTender.id);

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      zIndex: 220,
      background: 'rgba(0,0,0,0.75)',
      backdropFilter: 'blur(8px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px'
    }}>
      <div className="glass-panel animate-fade-in" style={{
        width: '100%',
        maxWidth: '920px',
        maxHeight: '92vh',
        overflowY: 'auto',
        padding: '32px',
        position: 'relative'
      }}>
        {/* Close Button */}
        <button 
          className="btn-icon" 
          onClick={() => setSelectedTender(null)}
          style={{ position: 'absolute', top: '24px', right: '24px' }}
        >
          <X size={20} />
        </button>

        {/* Modal Top Badges */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px', flexWrap: 'wrap' }}>
          <span className="badge badge-source">{selectedTender.sourceName}</span>
          <span className="badge badge-active">{selectedTender.noticeType}</span>
          <span className="badge" style={{ background: 'rgba(139, 92, 246, 0.15)', color: '#8b5cf6' }}>
            ID: {selectedTender.id}
          </span>
          <span className="badge badge-closing">
            <Clock size={12} /> Deadline: {selectedTender.deadline} ({selectedTender.daysRemaining} days left)
          </span>
        </div>

        {/* Title */}
        <h2 style={{ fontSize: '22px', fontWeight: '800', lineHeight: '1.3', marginBottom: '12px', color: 'var(--text-main)' }}>
          {selectedTender.title}
        </h2>

        {/* Metadata Bar */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
          gap: '12px',
          background: 'var(--bg-input)',
          padding: '16px',
          borderRadius: 'var(--radius-md)',
          marginBottom: '24px',
          border: '1px solid var(--border-color)'
        }}>
          <div>
            <div style={{ fontSize: '11px', color: 'var(--text-dark)', textTransform: 'uppercase', fontWeight: '700' }}>Issuing Agency</div>
            <div style={{ fontSize: '14px', fontWeight: '700', color: '#3b82f6' }}>{selectedTender.agency}</div>
          </div>

          <div>
            <div style={{ fontSize: '11px', color: 'var(--text-dark)', textTransform: 'uppercase', fontWeight: '700' }}>Est. Contract Budget</div>
            <div style={{ fontSize: '16px', fontWeight: '800', color: '#10b981' }}>{selectedTender.valueFormatted}</div>
          </div>

          <div>
            <div style={{ fontSize: '11px', color: 'var(--text-dark)', textTransform: 'uppercase', fontWeight: '700' }}>Location</div>
            <div style={{ fontSize: '13px', fontWeight: '600' }}>{selectedTender.location}</div>
          </div>

          <div>
            <div style={{ fontSize: '11px', color: 'var(--text-dark)', textTransform: 'uppercase', fontWeight: '700' }}>Taxonomy Codes</div>
            <div style={{ fontSize: '12px', fontWeight: '600', color: 'var(--text-muted)' }}>{selectedTender.naicsCode}</div>
          </div>
        </div>

        {/* Tab Switcher */}
        <div style={{ display: 'flex', gap: '8px', borderBottom: '1px solid var(--border-color)', marginBottom: '20px' }}>
          <button 
            className={`btn ${activeTab === 'overview' ? 'btn-primary' : ''}`}
            onClick={() => setActiveTab('overview')}
            style={{ borderRadius: 'var(--radius-sm) var(--radius-sm) 0 0', padding: '8px 16px', fontSize: '13px' }}
          >
            <FileText size={14} /> Scope & Specifications
          </button>
          <button 
            className={`btn ${activeTab === 'deliverables' ? 'btn-primary' : ''}`}
            onClick={() => setActiveTab('deliverables')}
            style={{ borderRadius: 'var(--radius-sm) var(--radius-sm) 0 0', padding: '8px 16px', fontSize: '13px' }}
          >
            <Sparkles size={14} /> AI Deliverables Analysis
          </button>
          <button 
            className={`btn ${activeTab === 'eligibility' ? 'btn-primary' : ''}`}
            onClick={() => setActiveTab('eligibility')}
            style={{ borderRadius: 'var(--radius-sm) var(--radius-sm) 0 0', padding: '8px 16px', fontSize: '13px' }}
          >
            <Shield size={14} /> Bid Readiness Calculator
          </button>
        </div>

        {/* Tab 1: Scope & Specs */}
        {activeTab === 'overview' && (
          <div>
            <div style={{ marginBottom: '20px' }}>
              <h3 style={{ fontSize: '15px', fontWeight: '700', marginBottom: '8px' }}>Project Executive Summary</h3>
              <p style={{ fontSize: '14px', color: 'var(--text-muted)', lineHeight: '1.6' }}>
                {selectedTender.summary}
              </p>
            </div>

            <div style={{ marginBottom: '20px' }}>
              <h3 style={{ fontSize: '15px', fontWeight: '700', marginBottom: '8px' }}>Mandatory Qualification Requirements</h3>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {selectedTender.requirements.map((req, idx) => (
                  <li key={idx} style={{ fontSize: '13px', display: 'flex', alignItems: 'flex-start', gap: '8px', color: 'var(--text-main)' }}>
                    <CheckCircle size={16} style={{ color: '#3b82f6', flexShrink: 0, marginTop: '2px' }} />
                    <span>{req}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Documents */}
            <div>
              <h3 style={{ fontSize: '15px', fontWeight: '700', marginBottom: '10px' }}>Official RFP Documents & Specs</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {selectedTender.documents.map((doc, idx) => (
                  <div key={idx} style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '12px 16px',
                    background: 'var(--bg-input)',
                    borderRadius: 'var(--radius-sm)',
                    border: '1px solid var(--border-color)'
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <FileText size={18} style={{ color: '#3b82f6' }} />
                      <div>
                        <div style={{ fontSize: '13px', fontWeight: '600' }}>{doc.name}</div>
                        <div style={{ fontSize: '11px', color: 'var(--text-dark)' }}>PDF Document • {doc.size}</div>
                      </div>
                    </div>
                    <div style={{ display: 'flex', gap: '8px' }}>
                      <button 
                        className="btn btn-primary" 
                        style={{ fontSize: '12px', padding: '6px 14px' }} 
                        onClick={() => apiService.downloadOriginalPDF(doc, selectedTender)}
                        title="Download Official Original PDF Document from etenders.gov.za"
                      >
                        <Download size={14} /> Download Original PDF (.pdf)
                      </button>

                      <button 
                        className="btn btn-outline" 
                        style={{ fontSize: '12px', padding: '6px 10px' }} 
                        onClick={() => apiService.downloadDocumentSpec(doc.name, selectedTender)}
                        title="Download Text Summary"
                      >
                        TXT (.txt)
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: AI Deliverables */}
        {activeTab === 'deliverables' && (
          <div>
            <div style={{
              background: 'rgba(59, 130, 246, 0.08)',
              border: '1px solid rgba(59, 130, 246, 0.3)',
              borderRadius: 'var(--radius-md)',
              padding: '20px',
              marginBottom: '20px'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px', color: '#3b82f6', fontWeight: '700' }}>
                <Sparkles size={18} /> AI Key Scope & Deliverables Extraction
              </div>
              <p style={{ fontSize: '13px', color: 'var(--text-muted)', marginBottom: '16px' }}>
                Our procurement AI model scanned the 100+ page solicitation document and extracted the critical deliverables required for submission:
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {selectedTender.aiKeyDeliverables.map((deliv, idx) => (
                  <div key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', fontSize: '13px', color: 'var(--text-main)' }}>
                    <span style={{ background: '#3b82f6', color: '#fff', borderRadius: '50%', width: '20px', height: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '11px', fontWeight: 'bold', flexShrink: 0 }}>
                      {idx + 1}
                    </span>
                    <span style={{ lineHeight: '1.5' }}>{deliv}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Tab 3: Eligibility Calculator */}
        {activeTab === 'eligibility' && (
          <EligibilityCalculator tender={selectedTender} />
        )}

        {/* Bottom Actions */}
        <div style={{
          marginTop: '28px',
          paddingTop: '20px',
          borderTop: '1px solid var(--border-color)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '12px'
        }}>
          <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
            Official Point of Contact: <strong>{selectedTender.contact}</strong>
          </div>

          <div style={{ display: 'flex', gap: '10px' }}>
            <button 
              className="btn btn-secondary" 
              onClick={() => toggleBookmark(selectedTender.id)}
            >
              <Bookmark size={16} fill={isBookmarked ? '#3b82f6' : 'none'} />
              {isBookmarked ? 'Bookmarked' : 'Save'}
            </button>

            {!trackedInPipeline ? (
              <button 
                className="btn btn-primary"
                onClick={() => {
                  updatePipelineStage(selectedTender.id, 'interested');
                  setSelectedTender(null);
                }}
              >
                <PlusCircle size={16} /> Track in Bidding Pipeline
              </button>
            ) : (
              <button className="btn btn-outline" style={{ color: '#10b981', borderColor: '#10b981' }}>
                <CheckCircle size={16} /> Tracked in Pipeline
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
