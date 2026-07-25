export const INITIAL_NOTIFICATIONS = [
  {
    id: 'notif-1',
    title: '🔥 Urgent Deadline Alert',
    message: 'TND-2026-US-3391 (Autonomous Perimeter Defense System) is closing in 48 hours!',
    timestamp: '10 minutes ago',
    read: false,
    type: 'urgent',
    tenderId: 'TND-2026-US-3391'
  },
  {
    id: 'notif-2',
    title: '✨ New Matching Tender Found',
    message: 'New tender from NHS Digital matching your IT & Health subscription alert feed.',
    timestamp: '1 hour ago',
    read: false,
    type: 'match',
    tenderId: 'TND-2026-UK-1092'
  },
  {
    id: 'notif-3',
    title: '📄 Amendment Notice Published',
    message: 'Addendum #2 attached to European Green Infrastructure Offshore Wind Farm opportunity.',
    timestamp: '4 hours ago',
    read: true,
    type: 'amendment',
    tenderId: 'TND-2026-EU-4410'
  },
  {
    id: 'notif-4',
    title: '🎯 Bidding Stage Updated',
    message: 'Proposal TND-2026-US-8912 moved to "Proposal Draft In Progress".',
    timestamp: '1 day ago',
    read: true,
    type: 'pipeline',
    tenderId: 'TND-2026-US-8912'
  }
];

export const generateSimulatedAlert = (tenders = []) => {
  const randomTender = tenders.length > 0 
    ? tenders[Math.floor(Math.random() * tenders.length)]
    : { id: 'TND-2026-SIM-99', title: 'Cyber Resilience & Quantum Encryption Hub', agency: 'U.S. DHS' };

  const alertTypes = [
    { title: '⚡ New High-Value Tender Match', type: 'match', msg: `New notice matching your custom subscription: "${randomTender.title}"` },
    { title: '⏳ 48-Hour Deadline Warning', type: 'urgent', msg: `Submission deadline approaches for "${randomTender.title}" (${randomTender.agency})` },
    { title: '📋 Specifications Addendum', type: 'amendment', msg: `Agency updated SOW specifications for opportunity ${randomTender.id}` }
  ];

  const selectedType = alertTypes[Math.floor(Math.random() * alertTypes.length)];

  return {
    id: `notif-${Date.now()}`,
    title: selectedType.title,
    message: selectedType.msg,
    timestamp: 'Just now',
    read: false,
    type: selectedType.type,
    tenderId: randomTender.id
  };
};
