import React from 'react';
import { useTenders } from '../context/TenderContext';
import { SUBSCRIPTION_PLANS } from '../data/subscriptionPlans';
import { X, Check, Sparkles, ShieldCheck } from 'lucide-react';

export const SubscriptionModal = () => {
  const { isSubscriptionModalOpen, setIsSubscriptionModalOpen, currentPlan, setCurrentPlan } = useTenders();

  if (!isSubscriptionModalOpen) return null;

  const handleSelectPlan = (planId) => {
    setCurrentPlan(planId);
    setIsSubscriptionModalOpen(false);
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
        maxWidth: '960px',
        maxHeight: '90vh',
        overflowY: 'auto',
        padding: '32px',
        position: 'relative'
      }}>
        <button 
          className="btn-icon" 
          onClick={() => setIsSubscriptionModalOpen(false)}
          style={{ position: 'absolute', top: '24px', right: '24px' }}
        >
          <X size={20} />
        </button>

        {/* Modal Header */}
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <span className="badge badge-source" style={{ marginBottom: '12px' }}>
            <Sparkles size={12} /> SUBSCRIPTION TIERS & ALERTS
          </span>
          <h2 style={{ fontSize: '28px', fontWeight: '800', marginBottom: '8px' }}>
            Choose Your Procurement Intelligence Plan
          </h2>
          <p style={{ fontSize: '14px', color: 'var(--text-muted)', maxWidth: '560px', margin: '0 auto' }}>
            Subscribe to customized alert feeds, unlock AI tender scope summarization, and track high-value government contracts.
          </p>
        </div>

        {/* Plans Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '24px'
        }}>
          {SUBSCRIPTION_PLANS.map(plan => {
            const isCurrent = currentPlan === plan.id;
            return (
              <div 
                key={plan.id}
                style={{
                  background: isCurrent ? 'rgba(59, 130, 246, 0.08)' : 'var(--bg-secondary)',
                  border: `2px solid ${isCurrent ? '#3b82f6' : plan.recommended ? 'rgba(59, 130, 246, 0.4)' : 'var(--border-color)'}`,
                  borderRadius: 'var(--radius-md)',
                  padding: '24px',
                  display: 'flex',
                  flexDirection: 'column',
                  position: 'relative',
                  boxShadow: plan.recommended ? 'var(--shadow-glow)' : 'none'
                }}
              >
                {plan.recommended && (
                  <div style={{
                    position: 'absolute',
                    top: '-12px',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    background: 'var(--accent-gradient)',
                    color: '#fff',
                    fontSize: '11px',
                    fontWeight: '800',
                    padding: '4px 12px',
                    borderRadius: '12px',
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px'
                  }}>
                    {plan.badge}
                  </div>
                )}

                <h3 style={{ fontSize: '18px', fontWeight: '700', marginBottom: '8px' }}>{plan.name}</h3>
                
                <div style={{ marginBottom: '16px' }}>
                  <span style={{ fontSize: '36px', fontWeight: '800' }}>{plan.price}</span>
                  <span style={{ fontSize: '12px', color: 'var(--text-muted)', marginLeft: '6px' }}>/{plan.billingPeriod}</span>
                </div>

                <button 
                  className={`btn ${isCurrent ? 'btn-secondary' : 'btn-primary'}`}
                  onClick={() => handleSelectPlan(plan.id)}
                  style={{ width: '100%', marginBottom: '24px' }}
                >
                  {isCurrent ? 'Active Plan' : plan.buttonText}
                </button>

                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: '12px', fontWeight: '700', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '12px' }}>
                    What's included:
                  </div>
                  <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    {plan.features.map((feat, idx) => (
                      <li key={idx} style={{ fontSize: '13px', display: 'flex', alignItems: 'flex-start', gap: '8px', color: 'var(--text-main)' }}>
                        <Check size={16} style={{ color: '#10b981', flexShrink: 0, marginTop: '2px' }} />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>

                  {plan.limitations && (
                    <div style={{ marginTop: '16px', paddingTop: '16px', borderTop: '1px solid var(--border-color)' }}>
                      <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                        {plan.limitations.map((lim, idx) => (
                          <li key={idx} style={{ fontSize: '12px', color: 'var(--text-dark)', textDecoration: 'line-through' }}>
                            {lim}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer info */}
        <div style={{ marginTop: '32px', textAlign: 'center', fontSize: '12px', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}>
          <ShieldCheck size={16} style={{ color: '#10b981' }} /> 
          30-Day Money Back Guarantee. Cancel or switch plans anytime with no hidden lock-in contract.
        </div>
      </div>
    </div>
  );
};
