import React, { useState } from 'react';
import { useTenders } from '../context/TenderContext';
import { CATEGORIES, SOURCES, REGIONS, NOTICE_TYPES } from '../data/categories';
import { X, ShieldAlert, Plus, CheckCircle } from 'lucide-react';

export const AdminCreateTenderModal = ({ isOpen, onClose }) => {
  const { addNewTender } = useTenders();

  const [title, setTitle] = useState('');
  const [agency, setAgency] = useState('National Treasury SA');
  const [source, setSource] = useState('etenders-sa');
  const [region, setRegion] = useState('gauteng');
  const [category, setCategory] = useState('it-software');
  const [noticeType, setNoticeType] = useState('RFP');
  const [value, setValue] = useState('15000000');
  const [deadline, setDeadline] = useState('2026-08-30');
  const [bbbeeLevel, setBbbeeLevel] = useState('B-BBEE Level 1 Preference');
  const [cidbGrade, setCidbGrade] = useState('Grade 8CE / 9CE');
  const [location, setLocation] = useState('Pretoria / Johannesburg');
  const [summary, setSummary] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    const newTender = {
      id: `TND-ZA-2026-ADM-${Math.floor(1000 + Math.random() * 9000)}`,
      title: title || 'Custom Admin Published Tender',
      agency,
      source,
      sourceName: SOURCES.find(s => s.id === source)?.name || 'eTenders Treasury',
      region,
      regionName: REGIONS.find(r => r.id === region)?.name || 'Gauteng',
      category,
      categoryName: CATEGORIES.find(c => c.id === category)?.name || 'IT & Cloud',
      noticeType,
      value: Number(value) || 1000000,
      currency: 'ZAR',
      valueFormatted: `R${(Number(value) / 1000000).toFixed(1)}M ZAR`,
      publishedDate: new Date().toISOString().split('T')[0],
      deadline,
      daysRemaining: 30,
      status: 'Active',
      smeFriendly: true,
      bbbeeLevel,
      cidbGrade,
      location,
      summary: summary || 'Admin created government tender notice for public procurement evaluation.',
      aiKeyDeliverables: [
        'Deliverable 1: Comprehensive scope execution',
        'Deliverable 2: Local skills transfer and employment allocation'
      ],
      requirements: [
        'Must be registered on National Treasury CSD',
        'Valid SARS Tax Compliance Status PIN'
      ],
      documents: [
        { name: 'Admin_Tender_Specification_2026.pdf', size: '3.5 MB' }
      ],
      contact: 'admin.procurement@gov.za | +27 (012) 000 0000'
    };

    addNewTender(newTender);
    onClose();
  };

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      zIndex: 260,
      background: 'rgba(0,0,0,0.75)',
      backdropFilter: 'blur(8px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px'
    }}>
      <div className="glass-panel animate-fade-in" style={{
        width: '100%',
        maxWidth: '680px',
        maxHeight: '90vh',
        overflowY: 'auto',
        padding: '28px',
        position: 'relative'
      }}>
        <button className="btn-icon" onClick={onClose} style={{ position: 'absolute', top: '20px', right: '20px' }}>
          <X size={20} />
        </button>

        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
          <div style={{ padding: '10px', borderRadius: '12px', background: 'rgba(168, 85, 247, 0.15)', color: '#a855f7' }}>
            <ShieldAlert size={24} />
          </div>
          <div>
            <h2 style={{ fontSize: '20px', fontWeight: '800' }}>Admin Tender Publisher</h2>
            <p style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
              Publish a new South African government tender to the master database.
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
          <div style={{ gridColumn: 'span 2' }}>
            <label style={{ fontSize: '12px', color: 'var(--text-muted)', display: 'block', marginBottom: '4px' }}>Tender Title</label>
            <input 
              type="text" 
              className="input-field" 
              placeholder="e.g. Provincial Hospital ICT Network Infrastructure Upgrade" 
              value={title} 
              onChange={e => setTitle(e.target.value)} 
              required
            />
          </div>

          <div>
            <label style={{ fontSize: '12px', color: 'var(--text-muted)', display: 'block', marginBottom: '4px' }}>Issuing Department / Org</label>
            <input 
              type="text" 
              className="input-field" 
              placeholder="e.g. Gauteng Dept of Infrastructure" 
              value={agency} 
              onChange={e => setAgency(e.target.value)} 
              required
            />
          </div>

          <div>
            <label style={{ fontSize: '12px', color: 'var(--text-muted)', display: 'block', marginBottom: '4px' }}>Procurement Portal</label>
            <select className="select-field" value={source} onChange={e => setSource(e.target.value)}>
              {SOURCES.filter(s => s.id !== 'all').map(s => (
                <option key={s.id} value={s.id}>{s.flag} {s.name}</option>
              ))}
            </select>
          </div>

          <div>
            <label style={{ fontSize: '12px', color: 'var(--text-muted)', display: 'block', marginBottom: '4px' }}>Province / Region</label>
            <select className="select-field" value={region} onChange={e => setRegion(e.target.value)}>
              {REGIONS.filter(r => r.id !== 'all').map(r => (
                <option key={r.id} value={r.id}>{r.name}</option>
              ))}
            </select>
          </div>

          <div>
            <label style={{ fontSize: '12px', color: 'var(--text-muted)', display: 'block', marginBottom: '4px' }}>Industry Sector</label>
            <select className="select-field" value={category} onChange={e => setCategory(e.target.value)}>
              {CATEGORIES.filter(c => c.id !== 'all').map(c => (
                <option key={c.id} value={c.id}>{c.name}</option>
              ))}
            </select>
          </div>

          <div>
            <label style={{ fontSize: '12px', color: 'var(--text-muted)', display: 'block', marginBottom: '4px' }}>Contract Budget Value (ZAR R)</label>
            <input 
              type="number" 
              className="input-field" 
              placeholder="15000000" 
              value={value} 
              onChange={e => setValue(e.target.value)} 
            />
          </div>

          <div>
            <label style={{ fontSize: '12px', color: 'var(--text-muted)', display: 'block', marginBottom: '4px' }}>Closing Deadline</label>
            <input 
              type="date" 
              className="input-field" 
              value={deadline} 
              onChange={e => setDeadline(e.target.value)} 
            />
          </div>

          <div style={{ gridColumn: 'span 2' }}>
            <label style={{ fontSize: '12px', color: 'var(--text-muted)', display: 'block', marginBottom: '4px' }}>Executive Summary & SOW</label>
            <textarea 
              className="input-field" 
              rows={3} 
              placeholder="Describe scope of work..." 
              value={summary} 
              onChange={e => setSummary(e.target.value)} 
            />
          </div>

          <div style={{ gridColumn: 'span 2', display: 'flex', gap: '10px', justifyContent: 'flex-end', marginTop: '10px' }}>
            <button type="button" className="btn btn-secondary" onClick={onClose}>Cancel</button>
            <button type="submit" className="btn btn-primary">
              <Plus size={16} /> Publish Tender to Portal
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
