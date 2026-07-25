import React, { createContext, useContext, useState, useEffect } from 'react';
import { SAMPLE_TENDERS } from '../data/sampleTenders';
import { INITIAL_NOTIFICATIONS, generateSimulatedAlert } from '../services/notificationService';
import { apiService } from '../services/apiService';
import { liveEtendersService } from '../services/liveEtendersService';
import { supabaseService } from '../services/supabaseService';

const TenderContext = createContext();

export const TenderProvider = ({ children }) => {
  // Admin Mode
  const [isAdmin, setIsAdmin] = useState(true);

  // User Auth State (Supabase / Local Account)
  const [currentUser, setCurrentUser] = useState(() => supabaseService.getCurrentUser());
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  // Live Real Data Feed Status
  const [isLiveFeedActive, setIsLiveFeedActive] = useState(true);
  const [isSyncingLive, setIsSyncingLive] = useState(false);

  // Master Tenders List (Bypass old 6-sample localStorage cache)
  const [masterTenders, setMasterTenders] = useState(() => {
    try {
      const custom = localStorage.getItem('gt_master_tenders');
      if (custom) {
        const parsed = JSON.parse(custom);
        if (Array.isArray(parsed) && parsed.length > 10) return parsed;
      }
    } catch (e) {
      // Ignore cache parse error
    }
    return SAMPLE_TENDERS;
  });

  // Theme State
  const [theme, setTheme] = useState(() => localStorage.getItem('gt_theme') || 'light');

  // Filters State
  const [filters, setFilters] = useState({
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

  // Tenders Display State
  const [tenders, setTenders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedTender, setSelectedTender] = useState(null);

  // Bookmarks & Bidding Pipeline
  const [savedTenders, setSavedTenders] = useState(() => {
    const saved = localStorage.getItem('gt_saved');
    return saved ? JSON.parse(saved) : ['TND-ZA-2026-ESK-091', 'TND-ZA-2026-SITA-402'];
  });

  const [biddingPipeline, setBiddingPipeline] = useState(() => {
    const pipeline = localStorage.getItem('gt_pipeline');
    return pipeline ? JSON.parse(pipeline) : [
      { tenderId: 'TND-ZA-2026-ESK-091', stage: 'proposal', estBidCost: 'R450,000', notes: 'Partnering with Siemens on BESS inverter specs.' },
      { tenderId: 'TND-ZA-2026-SITA-402', stage: 'interested', estBidCost: 'R120,000', notes: 'Submitted preliminary RFI specs to SITA board.' }
    ];
  });

  // Subscriptions & Alerts
  const [currentPlan, setCurrentPlan] = useState(() => {
    const user = supabaseService.getCurrentUser();
    return user ? user.plan : (localStorage.getItem('gt_plan') || 'pro');
  });

  const [savedAlerts, setSavedAlerts] = useState(() => {
    const alerts = localStorage.getItem('gt_alerts');
    return alerts ? JSON.parse(alerts) : [
      { id: 'alt-1', name: 'SA National Treasury & Eskom Feed', category: 'green-energy', region: 'gauteng', minBudget: 10000000, frequency: 'Instant SMS & Push', active: true }
    ];
  });

  // Notifications State
  const [notifications, setNotifications] = useState(() => {
    const notifs = localStorage.getItem('gt_notifications');
    return notifs ? JSON.parse(notifs) : INITIAL_NOTIFICATIONS;
  });

  // Modals
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [isSubscriptionModalOpen, setIsSubscriptionModalOpen] = useState(false);
  const [isSavedAlertsModalOpen, setIsSavedAlertsModalOpen] = useState(false);
  const [isApiModalOpen, setIsApiModalOpen] = useState(false);
  const [isExportModalOpen, setIsExportModalOpen] = useState(false);
  const [isAdminCreateModalOpen, setIsAdminCreateModalOpen] = useState(false);

  // API Config
  const [apiKeys, setApiKeys] = useState(() => {
    const keys = localStorage.getItem('gt_apikeys');
    return keys ? JSON.parse(keys) : { samGovKey: 'DEMO_SAM_API_KEY_8912', ocdsEndpoint: 'https://data.open-contracting.org/api' };
  });

  // User Auth Methods
  const registerUser = async (profileData) => {
    const res = await supabaseService.signUp(profileData);
    if (res.success) {
      setCurrentUser(res.user);
      if (res.user.plan) setCurrentPlan(res.user.plan);
      
      const welcomeNotif = {
        id: `notif-${Date.now()}`,
        title: '🎉 Welcome to Tenderpretation',
        message: `Account created for ${profileData.companyName}. CSD: ${profileData.csdMaaa}. Active Plan: ${profileData.plan.toUpperCase()}`,
        timestamp: 'Just now',
        read: false,
        type: 'match'
      };
      setNotifications(prev => [welcomeNotif, ...prev]);
    }
  };

  const loginUser = async (email, password) => {
    const res = await supabaseService.signIn(email, password);
    if (res.success) {
      setCurrentUser(res.user);
      if (res.user.plan) setCurrentPlan(res.user.plan);
    }
  };

  const logoutUser = async () => {
    await supabaseService.signOut();
    setCurrentUser(null);
  };

  // Fetch Live Real Data
  const syncLiveETendersData = async () => {
    setIsSyncingLive(true);
    const result = await liveEtendersService.fetchLiveRealTenders();
    if (result.success && result.tenders.length > 0) {
      setMasterTenders(result.tenders);
      setIsLiveFeedActive(true);

      const alertNotif = {
        id: `notif-${Date.now()}`,
        title: '🔴 Live eTenders.gov.za Sync Complete',
        message: `Successfully pulled ${result.tenders.length} real live tenders directly from National Treasury SA.`,
        timestamp: 'Just now',
        read: false,
        type: 'match'
      };
      setNotifications(prev => [alertNotif, ...prev]);
    }
    setIsSyncingLive(false);
  };

  // Auto-sync real live data from etenders.gov.za on startup
  useEffect(() => {
    syncLiveETendersData();
  }, []);

  useEffect(() => {
    localStorage.setItem('gt_master_tenders', JSON.stringify(masterTenders));
  }, [masterTenders]);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('gt_theme', theme);
  }, [theme]);

  // Filter Tenders Synchronously
  const filterTenders = () => {
    let results = [...masterTenders];

    if (filters.source && filters.source !== 'all') {
      results = results.filter(t => t.source === filters.source);
    }
    if (filters.category && filters.category !== 'all') {
      results = results.filter(t => t.category === filters.category);
    }
    if (filters.region && filters.region !== 'all') {
      results = results.filter(t => t.region === filters.region);
    }
    if (filters.status && filters.status !== 'all') {
      results = results.filter(t => t.status === filters.status);
    }
    if (filters.noticeType && filters.noticeType !== 'all') {
      results = results.filter(t => t.noticeType === filters.noticeType);
    }
    if (filters.smeOnly) {
      results = results.filter(t => t.smeFriendly === true);
    }
    if (filters.bbbeeLevel && filters.bbbeeLevel !== 'all') {
      results = results.filter(t => t.bbbeeLevel && t.bbbeeLevel.toLowerCase().includes(filters.bbbeeLevel.replace('-', ' ')));
    }
    if (filters.minBudget) {
      results = results.filter(t => t.value >= Number(filters.minBudget));
    }
    if (filters.maxBudget) {
      results = results.filter(t => t.value <= Number(filters.maxBudget));
    }
    if (filters.searchQuery && filters.searchQuery.trim() !== '') {
      const q = filters.searchQuery.toLowerCase().trim();
      results = results.filter(t => 
        t.title.toLowerCase().includes(q) ||
        t.agency.toLowerCase().includes(q) ||
        t.summary.toLowerCase().includes(q) ||
        (t.location && t.location.toLowerCase().includes(q)) ||
        (t.cidbGrade && t.cidbGrade.toLowerCase().includes(q)) ||
        t.id.toLowerCase().includes(q)
      );
    }

    setTenders(results);
  };

  useEffect(() => {
    filterTenders();
  }, [filters, masterTenders]);

  const addNewTender = (newTender) => {
    setMasterTenders(prev => [newTender, ...prev]);
  };

  const toggleTheme = () => setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  const toggleBookmark = (id) => setSavedTenders(prev => prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]);

  const updatePipelineStage = (tenderId, newStage, estBidCost = '', notes = '') => {
    setBiddingPipeline(prev => {
      const existing = prev.find(p => p.tenderId === tenderId);
      if (existing) {
        return prev.map(p => p.tenderId === tenderId ? { ...p, stage: newStage, estBidCost: estBidCost || p.estBidCost, notes: notes || p.notes } : p);
      } else {
        return [...prev, { tenderId, stage: newStage, estBidCost: estBidCost || 'R50,000', notes: notes || 'Tracked' }];
      }
    });
  };

  const addSavedAlert = (name, category, region, minBudget, frequency) => {
    const newAlert = { id: `alt-${Date.now()}`, name, category, region, minBudget, frequency, active: true };
    setSavedAlerts(prev => [newAlert, ...prev]);
  };

  const toggleSavedAlert = (id) => setSavedAlerts(prev => prev.map(a => a.id === id ? { ...a, active: !a.active } : a));
  const deleteSavedAlert = (id) => setSavedAlerts(prev => prev.filter(a => a.id !== id));

  const unreadNotifCount = notifications.filter(n => !n.read).length;
  const markNotificationRead = (id) => setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
  const markAllNotificationsRead = () => setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  const triggerSimulatedAlert = () => setNotifications(prev => [generateSimulatedAlert(masterTenders), ...prev]);

  return (
    <TenderContext.Provider value={{
      currentUser,
      registerUser,
      loginUser,
      logoutUser,
      isAuthModalOpen,
      setIsAuthModalOpen,
      isAdmin,
      setIsAdmin,
      isLiveFeedActive,
      isSyncingLive,
      syncLiveETendersData,
      theme,
      toggleTheme,
      filters,
      setFilters,
      tenders,
      masterTenders,
      addNewTender,
      loading,
      selectedTender,
      setSelectedTender,
      savedTenders,
      toggleBookmark,
      biddingPipeline,
      updatePipelineStage,
      currentPlan,
      setCurrentPlan,
      savedAlerts,
      addSavedAlert,
      toggleSavedAlert,
      deleteSavedAlert,
      notifications,
      unreadNotifCount,
      markNotificationRead,
      markAllNotificationsRead,
      triggerSimulatedAlert,
      isNotificationOpen,
      setIsNotificationOpen,
      isSubscriptionModalOpen,
      setIsSubscriptionModalOpen,
      isSavedAlertsModalOpen,
      setIsSavedAlertsModalOpen,
      isApiModalOpen,
      setIsApiModalOpen,
      isExportModalOpen,
      setIsExportModalOpen,
      isAdminCreateModalOpen,
      setIsAdminCreateModalOpen,
      apiKeys,
      setApiKeys,
      allRawTenders: masterTenders
    }}>
      {children}
    </TenderContext.Provider>
  );
};

export const useTenders = () => useContext(TenderContext);
