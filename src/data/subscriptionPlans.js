export const SUBSCRIPTION_PLANS = [
  {
    id: 'free',
    name: 'Starter Bidder',
    price: 'R0',
    billingPeriod: 'forever free',
    badge: 'For SA SMMEs & Startups',
    features: [
      'Access to National Treasury eTenders & Eskom database',
      'Basic search by Province & Sector',
      'Up to 2 custom saved search alert feeds',
      'Weekly email tender summaries',
      'Standard bidding tracker (up to 5 active bids)'
    ],
    limitations: [
      'No instant SMS/WhatsApp real-time alerts',
      'No AI tender scope summarization',
      'No CSV/JSON bulk data exports'
    ],
    buttonText: 'Current Plan',
    recommended: false
  },
  {
    id: 'pro',
    name: 'Pro Contractor',
    price: 'R490',
    billingPeriod: 'per month',
    badge: 'Most Popular for SMMEs',
    features: [
      'Unlimited saved search alert feeds',
      'Instant SMS, WhatsApp & In-App push notifications',
      'Full AI tender scope summarizer & key deliverables',
      'PPPFA & B-BBEE eligibility scoring calculator',
      'Unlimited bidding pipeline tracking',
      'National Treasury eTenders & SITA custom API feeds',
      'CSV & JSON exports'
    ],
    buttonText: 'Upgrade to Pro',
    recommended: true
  },
  {
    id: 'enterprise',
    name: 'Enterprise Procurement',
    price: 'R1,990',
    billingPeriod: 'per month',
    badge: 'For Major CIDB Grade 7-9 Contractors',
    features: [
      'Everything in Pro Contractor',
      'Multi-user team workspace & collaborative bidding',
      'CIDB & CSD auto-verification monitoring',
      'Custom webhook integration for CRM (Salesforce / HubSpot)',
      'Automated competitor win/loss analytics',
      'Dedicated SA procurement intelligence specialist'
    ],
    buttonText: 'Upgrade to Enterprise',
    recommended: false
  }
];
