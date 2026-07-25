import React, { useState } from 'react';
import { useTenders } from '../context/TenderContext';
import { 
  Building2, 
  Bell, 
  Sun, 
  Moon, 
  Bookmark, 
  SlidersHorizontal, 
  BarChart3, 
  Kanban, 
  Compass, 
  Key, 
  Download,
  Sparkles,
  Zap,
  ShieldAlert,
  Plus,
  UserCheck,
  LogOut,
  ChevronDown
} from 'lucide-react';

export const Navbar = ({ activeTab, setActiveTab }) => {
  const {
    theme,
    toggleTheme,
    unreadNotifCount,
    setIsNotificationOpen,
    currentPlan,
    setIsSubscriptionModalOpen,
    setIsSavedAlertsModalOpen,
    setIsApiModalOpen,
    setIsExportModalOpen,
    setIsAdminCreateModalOpen,
    savedAlerts,
    isAdmin,
    setIsAdmin,
    currentUser,
    logoutUser,
    setIsAuthModalOpen
  } = useTenders();

  const [showUserDropdown, setShowUserDropdown] = useState(false);

  return (
    <header className="glass-panel" style={{
      position: 'sticky',
      top: 0,
      zIndex: 100,
      borderRadius: 0,
      borderTop: 'none',
      borderLeft: 'none',
      borderRight: 'none',
      padding: '14px 24px'
    }}>
      <div style={{
        maxWidth: '1440px',
        margin: '0 auto',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '16px'
      }}>
        {/* Brand Logo */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer' }} onClick={() => setActiveTab('explorer')}>
          <div style={{
            width: '42px',
            height: '42px',
            borderRadius: '12px',
            background: 'var(--accent-gradient)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#fff',
            boxShadow: 'var(--shadow-glow)'
          }}>
            <Building2 size={24} />
          </div>
          <div>
            <div style={{ fontSize: '22px', fontWeight: '800', letterSpacing: '-0.5px', background: 'linear-gradient(90deg, #3b82f6, #a855f7)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              Tenderpretation <span style={{ fontSize: '11px', padding: '2px 8px', borderRadius: '12px', background: 'rgba(59, 130, 246, 0.2)', color: '#3b82f6', WebkitTextFillColor: '#3b82f6', textTransform: 'uppercase', verticalAlign: 'middle' }}>🇿🇦 SA PORTAL</span>
            </div>
            <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
              South Africa eTenders, Eskom, Transnet & SITA Intelligence
            </div>
          </div>
        </div>

        {/* View Switcher Tabs */}
        <nav style={{ display: 'flex', alignItems: 'center', gap: '6px', background: 'var(--bg-input)', padding: '4px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)' }}>
          <button 
            className={`btn ${activeTab === 'explorer' ? 'btn-primary' : ''}`}
            onClick={() => setActiveTab('explorer')}
            style={{ padding: '8px 14px', fontSize: '13px' }}
          >
            <Compass size={16} /> Tender Explorer
          </button>
          <button 
            className={`btn ${activeTab === 'pipeline' ? 'btn-primary' : ''}`}
            onClick={() => setActiveTab('pipeline')}
            style={{ padding: '8px 14px', fontSize: '13px' }}
          >
            <Kanban size={16} /> Bidding Pipeline
          </button>
          <button 
            className={`btn ${activeTab === 'analytics' ? 'btn-primary' : ''}`}
            onClick={() => setActiveTab('analytics')}
            style={{ padding: '8px 14px', fontSize: '13px' }}
          >
            <BarChart3 size={16} /> Market Analytics
          </button>
        </nav>

        {/* Actions & User Menu */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          {/* User Account / Login Button */}
          {!currentUser ? (
            <button 
              className="btn btn-primary"
              onClick={() => setIsAuthModalOpen(true)}
              style={{ fontSize: '12px', padding: '6px 14px' }}
            >
              <UserCheck size={14} /> Sign In / Register
            </button>
          ) : (
            <div style={{ position: 'relative' }}>
              <button 
                className="btn btn-secondary"
                onClick={() => setShowUserDropdown(!showUserDropdown)}
                style={{ fontSize: '12px', padding: '6px 12px', display: 'flex', alignItems: 'center', gap: '6px' }}
              >
                <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#10b981' }} />
                <span style={{ fontWeight: '700' }}>{currentUser.companyName.split(' ')[0]}</span>
                <ChevronDown size={12} />
              </button>

              {showUserDropdown && (
                <div className="glass-panel animate-fade-in" style={{
                  position: 'absolute',
                  top: '100%',
                  right: 0,
                  marginTop: '8px',
                  width: '240px',
                  padding: '16px',
                  zIndex: 200,
                  boxShadow: 'var(--shadow-lg)',
                  border: '1px solid var(--border-highlight)'
                }}>
                  <div style={{ fontSize: '13px', fontWeight: '800', marginBottom: '2px', color: 'var(--text-main)' }}>
                    {currentUser.companyName}
                  </div>
                  <div style={{ fontSize: '11px', color: 'var(--text-muted)', marginBottom: '8px' }}>
                    {currentUser.email}
                  </div>
                  <div style={{ fontSize: '11px', background: 'rgba(59, 130, 246, 0.1)', color: '#3b82f6', padding: '4px 8px', borderRadius: '6px', marginBottom: '12px', fontWeight: 'bold' }}>
                    CSD: {currentUser.csdMaaa || 'MAAA Verified'} • {currentUser.bbbeeLevel || 'Level 1'}
                  </div>

                  <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '10px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    <button className="btn btn-outline" style={{ fontSize: '12px', padding: '6px', justifyContent: 'flex-start' }} onClick={() => { setIsSubscriptionModalOpen(true); setShowUserDropdown(false); }}>
                      <Sparkles size={14} /> Plan: {currentPlan.toUpperCase()}
                    </button>
                    <button className="btn-icon" style={{ fontSize: '12px', padding: '6px 10px', color: '#f43f5e', justifyContent: 'flex-start', display: 'flex', alignItems: 'center', gap: '6px', width: '100%' }} onClick={() => { logoutUser(); setShowUserDropdown(false); }}>
                      <LogOut size={14} /> Sign Out Account
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Admin Publish Tender Button */}
          {isAdmin && (
            <button 
              className="btn btn-primary"
              onClick={() => setIsAdminCreateModalOpen(true)}
              style={{ background: 'linear-gradient(135deg, #a855f7 0%, #ec4899 100%)', fontSize: '12px', padding: '6px 12px' }}
              title="Publish new tender as Admin"
            >
              <Plus size={14} /> Publish Tender (Admin)
            </button>
          )}

          {/* Admin Mode Status Toggle */}
          <button 
            onClick={() => setIsAdmin(!isAdmin)}
            className="btn"
            style={{
              background: isAdmin ? 'rgba(168, 85, 247, 0.15)' : 'var(--bg-input)',
              color: isAdmin ? '#a855f7' : 'var(--text-muted)',
              border: `1px solid ${isAdmin ? 'rgba(168, 85, 247, 0.4)' : 'var(--border-color)'}`,
              padding: '6px 10px',
              fontSize: '12px',
              fontWeight: '700'
            }}
            title="Toggle Admin Overlord Mode"
          >
            <ShieldAlert size={14} />
            {isAdmin ? 'ADMIN ACTIVE' : 'USER MODE'}
          </button>

          {/* Saved Search Alerts */}
          <button 
            className="btn btn-secondary" 
            onClick={() => setIsSavedAlertsModalOpen(true)}
            title="Manage Subscribed Alert Feeds"
            style={{ position: 'relative' }}
          >
            <Zap size={16} style={{ color: '#f59e0b' }} />
            <span style={{ background: 'rgba(245, 158, 11, 0.2)', color: '#f59e0b', fontSize: '11px', padding: '1px 6px', borderRadius: '10px', fontWeight: 'bold' }}>
              {savedAlerts.filter(a => a.active).length}
            </span>
          </button>

          {/* Export Data */}
          <button className="btn btn-icon" onClick={() => setIsExportModalOpen(true)} title="Export Search Data (CSV / JSON)">
            <Download size={18} />
          </button>

          {/* API Key Modal */}
          <button className="btn btn-icon" onClick={() => setIsApiModalOpen(true)} title="Configure SAM.gov / EU TED APIs">
            <Key size={18} />
          </button>

          {/* Notifications Bell */}
          <button 
            className="btn btn-icon" 
            onClick={() => setIsNotificationOpen(true)}
            style={{ position: 'relative' }}
            title="Real-Time Alerts & Notifications"
          >
            <Bell size={18} />
            {unreadNotifCount > 0 && (
              <span style={{
                position: 'absolute',
                top: '-4px',
                right: '-4px',
                background: '#f43f5e',
                color: '#fff',
                borderRadius: '50%',
                width: '18px',
                height: '18px',
                fontSize: '10px',
                fontWeight: 'bold',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                border: '2px solid var(--bg-secondary)',
                animation: 'pulseGlow 2s infinite'
              }}>
                {unreadNotifCount}
              </span>
            )}
          </button>

          {/* Subscription Tier Badge */}
          <button 
            onClick={() => setIsSubscriptionModalOpen(true)}
            className="btn"
            style={{
              background: 'rgba(59, 130, 246, 0.15)',
              color: '#3b82f6',
              border: '1px solid rgba(59, 130, 246, 0.4)',
              padding: '6px 12px',
              fontSize: '12px',
              fontWeight: '700'
            }}
          >
            <Sparkles size={14} />
            {currentPlan.toUpperCase()} PLAN
          </button>

          {/* Theme Toggle */}
          <button className="btn btn-icon" onClick={toggleTheme} title="Toggle Dark/Light Mode">
            {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
          </button>
        </div>
      </div>
    </header>
  );
};
