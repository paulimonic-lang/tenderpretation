import React, { useState } from 'react';
import { useTenders } from '../context/TenderContext';
import { Kanban, ArrowRight, DollarSign, Edit3, Trash2, CheckCircle2, AlertCircle } from 'lucide-react';

export const BiddingPipeline = () => {
  const { biddingPipeline, updatePipelineStage, allRawTenders, setSelectedTender } = useTenders();

  const stages = [
    { id: 'interested', title: '⭐ Interested / Bookmarked', color: '#3b82f6' },
    { id: 'proposal', title: '✍️ Proposal Draft In Progress', color: '#f59e0b' },
    { id: 'submitted', title: '🚀 Proposal Submitted', color: '#8b5cf6' },
    { id: 'awarded', title: '🏆 Contract Awarded (Won)', color: '#10b981' }
  ];

  return (
    <div style={{ padding: '8px 0' }}>
      {/* Header */}
      <div style={{ marginBottom: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h2 style={{ fontSize: '24px', fontWeight: '800', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Kanban size={28} style={{ color: '#3b82f6' }} /> Bidding & Proposal Pipeline Tracker
          </h2>
          <p style={{ fontSize: '14px', color: 'var(--text-muted)' }}>
            Track saved government contract opportunities, estimate proposal preparation costs, and manage bid submissions.
          </p>
        </div>
      </div>

      {/* Kanban Board Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
        gap: '20px',
        alignItems: 'start'
      }}>
        {stages.map(stage => {
          const stageItems = biddingPipeline.filter(item => item.stage === stage.id);

          return (
            <div 
              key={stage.id}
              className="glass-panel"
              style={{
                padding: '16px',
                borderRadius: 'var(--radius-md)',
                minHeight: '480px',
                display: 'flex',
                flexDirection: 'column',
                borderTop: `4px solid ${stage.color}`
              }}
            >
              {/* Stage Header */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px', paddingBottom: '10px', borderBottom: '1px solid var(--border-color)' }}>
                <span style={{ fontSize: '14px', fontWeight: '700', color: 'var(--text-main)' }}>
                  {stage.title}
                </span>
                <span style={{
                  background: 'var(--bg-input)',
                  padding: '2px 8px',
                  borderRadius: '12px',
                  fontSize: '12px',
                  fontWeight: 'bold',
                  color: stage.color
                }}>
                  {stageItems.length}
                </span>
              </div>

              {/* Stage Cards */}
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {stageItems.length === 0 ? (
                  <div style={{ textAlign: 'center', padding: '40px 10px', color: 'var(--text-dark)', fontSize: '12px' }}>
                    No opportunities in this stage
                  </div>
                ) : (
                  stageItems.map(item => {
                    const tender = allRawTenders.find(t => t.id === item.tenderId) || {
                      id: item.tenderId,
                      title: `Opportunity ${item.tenderId}`,
                      agency: 'Government Agency',
                      valueFormatted: 'Valuation N/A'
                    };

                    return (
                      <div 
                        key={item.tenderId}
                        style={{
                          background: 'var(--bg-secondary)',
                          border: '1px solid var(--border-color)',
                          borderRadius: 'var(--radius-sm)',
                          padding: '14px',
                          display: 'flex',
                          flexDirection: 'column',
                          gap: '10px',
                          position: 'relative'
                        }}
                      >
                        <div style={{ fontSize: '11px', color: 'var(--text-dark)', fontWeight: 'bold' }}>
                          {tender.id}
                        </div>

                        <div 
                          onClick={() => setSelectedTender(tender)}
                          style={{ fontSize: '13px', fontWeight: '700', color: 'var(--text-main)', cursor: 'pointer', lineHeight: '1.4' }}
                        >
                          {tender.title}
                        </div>

                        <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
                          {tender.agency}
                        </div>

                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '12px', paddingTop: '8px', borderTop: '1px solid var(--border-color)' }}>
                          <span style={{ fontWeight: '700', color: '#10b981' }}>
                            {tender.valueFormatted}
                          </span>
                          <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
                            Est. Bid: {item.estBidCost || '$25k'}
                          </span>
                        </div>

                        {/* Stage Controls */}
                        <div style={{ display: 'flex', gap: '4px', marginTop: '4px' }}>
                          {stage.id !== 'interested' && (
                            <button 
                              className="btn-icon"
                              style={{ fontSize: '10px', padding: '4px 8px' }}
                              onClick={() => updatePipelineStage(item.tenderId, stages[stages.findIndex(s => s.id === stage.id) - 1].id)}
                              title="Move Backward"
                            >
                              ←
                            </button>
                          )}
                          {stage.id !== 'awarded' && (
                            <button 
                              className="btn btn-outline"
                              style={{ fontSize: '11px', padding: '4px 8px', flex: 1 }}
                              onClick={() => updatePipelineStage(item.tenderId, stages[stages.findIndex(s => s.id === stage.id) + 1].id)}
                            >
                              Move Next Stage →
                            </button>
                          )}
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
