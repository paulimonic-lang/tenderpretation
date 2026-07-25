import React, { useState } from 'react';
import { TenderProvider, useTenders } from './context/TenderContext';
import { Navbar } from './components/Navbar';
import { FilterSidebar } from './components/FilterSidebar';
import { TenderCard } from './components/TenderCard';
import { TenderDetailModal } from './components/TenderDetailModal';
import { NotificationDrawer } from './components/NotificationDrawer';
import { SubscriptionModal } from './components/SubscriptionModal';
import { SavedAlertsModal } from './components/SavedAlertsModal';
import { BiddingPipeline } from './components/BiddingPipeline';
import { AnalyticsDashboard } from './components/AnalyticsDashboard';
import { ApiConfigModal } from './components/ApiConfigModal';
import { ExportModal } from './components/ExportModal';
import { AdminCreateTenderModal } from './components/AdminCreateTenderModal';
import { AuthModal } from './components/AuthModal';
import { Compass, Sparkles, AlertCircle, RefreshCw, Zap, Bell, ShieldAlert, Plus, Radio, UserCheck } from 'lucide-react';

const MainAppContent = () => {
  const [activeTab, setActiveTab] = useState('explorer');
  const { 
    tenders, 
    masterTenders, 
    loading, 
    setIsSubscriptionModalOpen, 
    setIsSavedAlertsModalOpen, 
    isAdmin, 
    isAdminCreateModalOpen, 
    setIsAdminCreateModalOpen,
    syncLiveETendersData,
    isSyncingLive,
    currentUser,
    setIsAuthModalOpen
  } = useTenders();

  return (
    <div className="app-container">
      {/* Top Navbar */}
      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Main Body */}
      <main className="main-content">
        {/* Explorer View */}
        {activeTab === 'explorer' && (
          <div>
            {/* Admin Overlord Banner */}
            {isAdmin && (
              <div style={{
                background: 'linear-gradient(90deg, rgba(168, 85, 247, 0.2) 0%, rgba(236, 72, 153, 0.2) 100%)',
                border: '1px solid rgba(168, 85, 247, 0.4)',
                borderRadius: 'var(--radius-md)',
                padding: '16px 24px',
                marginBottom: '20px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                gap: '12px'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <ShieldAlert size={24} style={{ color: '#a855f7' }} />
                  <div>
                    <div style={{ fontSize: '15px', fontWeight: '800', color: 'var(--text-main)' }}>
                      🛡️ Admin Mode Active — Full System Access Granted
                    </div>
                    <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
                      Showing all {masterTenders.length} tenders, department solicitations, and contractor bidding records across all South African provinces.
                    </div>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '10px' }}>
                  <button 
                    className="btn btn-outline"
                    onClick={syncLiveETendersData}
                    disabled={isSyncingLive}
                    style={{ fontSize: '12px', borderColor: '#a855f7', color: '#a855f7' }}
                  >
                    <Radio size={14} style={{ animation: isSyncingLive ? 'spin 1s linear infinite' : 'none' }} />
                    {isSyncingLive ? 'Syncing etenders.gov.za...' : 'Sync Live etenders.gov.za'}
                  </button>

                  <button 
                    className="btn btn-primary"
                    onClick={() => setIsAdminCreateModalOpen(true)}
                    style={{ background: 'linear-gradient(135deg, #a855f7 0%, #ec4899 100%)', fontSize: '13px' }}
                  >
                    <Plus size={16} /> Publish New Tender
                  </button>
                </div>
              </div>
            )}

            {/* User Login Notification Banner */}
            {!currentUser && (
              <div style={{
                background: 'rgba(59, 130, 246, 0.1)',
                border: '1px solid rgba(59, 130, 246, 0.3)',
                borderRadius: 'var(--radius-md)',
                padding: '12px 20px',
                marginBottom: '20px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                fontSize: '13px',
                color: 'var(--text-main)'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <UserCheck size={18} style={{ color: '#3b82f6' }} />
                  <span>Register your SA business account to save custom alert feeds and manage CSD MAAA verification.</span>
                </div>
                <button className="btn btn-primary" style={{ fontSize: '12px', padding: '4px 12px' }} onClick={() => setIsAuthModalOpen(true)}>
                  Create SA Account
                </button>
              </div>
            )}

            {/* Standard Portal Banner */}
            <div className="glass-panel" style={{
              padding: '24px 32px',
              marginBottom: '24px',
              background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.12) 0%, rgba(139, 92, 246, 0.12) 100%)',
              border: '1px solid rgba(59, 130, 246, 0.3)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: '16px'
            }}>
              <div>
                <span className="badge badge-source" style={{ marginBottom: '8px' }}>
                  <Sparkles size={12} /> 🇿🇦 TENDERPRETATION — SA PROCUREMENT INTELLIGENCE
                </span>
                <h1 style={{ fontSize: '26px', fontWeight: '800', marginBottom: '6px' }}>
                  Tenderpretation: Discover & Track SA Government Tenders
                </h1>
                <p style={{ fontSize: '14px', color: 'var(--text-muted)', maxWidth: '640px' }}>
                  Search real-time tenders from National Treasury eTenders, Eskom Bulletin, Transnet, SITA, and CIDB across all 9 provinces with instant SMS & WhatsApp alerts.
                </p>
              </div>

              <div style={{ display: 'flex', gap: '10px' }}>
                <button className="btn btn-primary" onClick={syncLiveETendersData} disabled={isSyncingLive}>
                  <Radio size={16} /> {isSyncingLive ? 'Syncing...' : 'Sync Live Real Data'}
                </button>
                <button className="btn btn-secondary" onClick={() => setIsSubscriptionModalOpen(true)}>
                  View Subscription Plans
                </button>
              </div>
            </div>

            {/* Grid Layout: Sidebar + Tender Cards */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'minmax(260px, 300px) 1fr',
              gap: '24px',
              alignItems: 'start'
            }}>
              <FilterSidebar />

              <section>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
                  <div style={{ fontSize: '15px', fontWeight: '700' }}>
                    Showing <span style={{ color: '#3b82f6' }}>{tenders.length}</span> of {masterTenders.length} Solicitations
                  </div>
                </div>

                {loading ? (
                  <div style={{ textAlign: 'center', padding: '60px 20px', color: 'var(--text-muted)' }}>
                    <RefreshCw size={32} style={{ margin: '0 auto 12px', animation: 'spin 1s linear infinite' }} />
                    <p>Fetching government tender notices...</p>
                  </div>
                ) : tenders.length === 0 ? (
                  <div className="glass-panel" style={{ textAlign: 'center', padding: '60px 20px' }}>
                    <AlertCircle size={40} style={{ color: 'var(--text-dark)', margin: '0 auto 12px' }} />
                    <h3 style={{ fontSize: '18px', fontWeight: '700', marginBottom: '6px' }}>No matching tenders found</h3>
                    <p style={{ fontSize: '13px', color: 'var(--text-muted)' }}>Try adjusting your keyword search or sector filters.</p>
                  </div>
                ) : (
                  <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
                    gap: '20px'
                  }}>
                    {tenders.map(tender => (
                      <TenderCard key={tender.id} tender={tender} />
                    ))}
                  </div>
                )}
              </section>
            </div>
          </div>
        )}

        {/* Bidding Pipeline View */}
        {activeTab === 'pipeline' && <BiddingPipeline />}

        {/* Market Analytics View */}
        {activeTab === 'analytics' && <AnalyticsDashboard />}
      </main>

      {/* Modals & Drawers */}
      <TenderDetailModal />
      <NotificationDrawer />
      <SubscriptionModal />
      <SavedAlertsModal />
      <ApiConfigModal />
      <ExportModal />
      <AdminCreateTenderModal 
        isOpen={isAdminCreateModalOpen} 
        onClose={() => setIsAdminCreateModalOpen(false)} 
      />
      <AuthModal />
    </div>
  );
};

export default function App() {
  return (
    <TenderProvider>
      <MainAppContent />
    </TenderProvider>
  );
}
