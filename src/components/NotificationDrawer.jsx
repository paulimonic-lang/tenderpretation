import React from 'react';
import { useTenders } from '../context/TenderContext';
import { X, Bell, CheckCheck, Zap, AlertTriangle, FileText, CheckCircle2, Play } from 'lucide-react';

export const NotificationDrawer = () => {
  const {
    isNotificationOpen,
    setIsNotificationOpen,
    notifications,
    markNotificationRead,
    markAllNotificationsRead,
    triggerSimulatedAlert,
    setSelectedTender,
    allRawTenders
  } = useTenders();

  if (!isNotificationOpen) return null;

  const handleNotificationClick = (notif) => {
    markNotificationRead(notif.id);
    if (notif.tenderId) {
      const match = allRawTenders.find(t => t.id === notif.tenderId);
      if (match) {
        setSelectedTender(match);
        setIsNotificationOpen(false);
      }
    }
  };

  const getIcon = (type) => {
    switch (type) {
      case 'urgent': return <AlertTriangle size={18} style={{ color: '#f43f5e' }} />;
      case 'match': return <Zap size={18} style={{ color: '#f59e0b' }} />;
      case 'amendment': return <FileText size={18} style={{ color: '#3b82f6' }} />;
      default: return <CheckCircle2 size={18} style={{ color: '#10b981' }} />;
    }
  };

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      zIndex: 200,
      background: 'rgba(0,0,0,0.5)',
      backdropFilter: 'blur(4px)',
      display: 'flex',
      justifyContent: 'flex-end'
    }}>
      <div className="glass-panel animate-fade-in" style={{
        width: '100%',
        maxWidth: '420px',
        height: '100vh',
        borderRadius: 0,
        display: 'flex',
        flexDirection: 'column',
        borderLeft: '1px solid var(--border-color)',
        boxShadow: '-10px 0 30px rgba(0,0,0,0.5)'
      }}>
        {/* Drawer Header */}
        <div style={{
          padding: '20px',
          borderBottom: '1px solid var(--border-color)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{ padding: '8px', borderRadius: '8px', background: 'rgba(59, 130, 246, 0.15)', color: '#3b82f6' }}>
              <Bell size={20} />
            </div>
            <div>
              <h3 style={{ fontSize: '16px', fontWeight: '700' }}>Live Notifications</h3>
              <p style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Tender alerts & deadline warnings</p>
            </div>
          </div>
          <button className="btn-icon" onClick={() => setIsNotificationOpen(false)}>
            <X size={18} />
          </button>
        </div>

        {/* Action Controls */}
        <div style={{
          padding: '12px 20px',
          background: 'var(--bg-input)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          borderBottom: '1px solid var(--border-color)'
        }}>
          <button 
            className="btn btn-outline" 
            onClick={triggerSimulatedAlert}
            style={{ fontSize: '12px', padding: '6px 12px' }}
            title="Simulate incoming real-time government tender alert"
          >
            <Play size={12} /> Test Live Alert Trigger
          </button>

          <button 
            className="btn-icon" 
            onClick={markAllNotificationsRead}
            title="Mark all notifications as read"
            style={{ fontSize: '12px', display: 'flex', alignItems: 'center', gap: '4px', padding: '6px 10px' }}
          >
            <CheckCheck size={14} /> Mark all read
          </button>
        </div>

        {/* Notification List */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '16px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {notifications.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '40px 20px', color: 'var(--text-muted)' }}>
              <Bell size={36} style={{ margin: '0 auto 12px', opacity: 0.4 }} />
              <p>No notifications yet.</p>
            </div>
          ) : (
            notifications.map(notif => (
              <div 
                key={notif.id}
                onClick={() => handleNotificationClick(notif)}
                style={{
                  padding: '14px',
                  borderRadius: 'var(--radius-sm)',
                  background: notif.read ? 'var(--bg-secondary)' : 'rgba(59, 130, 246, 0.08)',
                  border: `1px solid ${notif.read ? 'var(--border-color)' : 'rgba(59, 130, 246, 0.3)'}`,
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  position: 'relative'
                }}
              >
                {!notif.read && (
                  <span style={{
                    position: 'absolute',
                    top: '12px',
                    right: '12px',
                    width: '8px',
                    height: '8px',
                    borderRadius: '50%',
                    background: '#3b82f6'
                  }} />
                )}

                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                  <div style={{ marginTop: '2px' }}>
                    {getIcon(notif.type)}
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: '13px', fontWeight: '700', color: 'var(--text-main)', marginBottom: '4px' }}>
                      {notif.title}
                    </div>
                    <div style={{ fontSize: '12px', color: 'var(--text-muted)', marginBottom: '8px', lineHeight: '1.4' }}>
                      {notif.message}
                    </div>
                    <div style={{ fontSize: '10px', color: 'var(--text-dark)', fontWeight: '600' }}>
                      {notif.timestamp}
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
