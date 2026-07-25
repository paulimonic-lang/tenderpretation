import React from 'react';
import { useTenders } from '../context/TenderContext';
import { apiService } from '../services/apiService';
import { X, Download, FileSpreadsheet, FileCode } from 'lucide-react';

export const ExportModal = () => {
  const { isExportModalOpen, setIsExportModalOpen, tenders } = useTenders();

  if (!isExportModalOpen) return null;

  const handleExportCSV = () => {
    apiService.exportToCSV(tenders);
    setIsExportModalOpen(false);
  };

  const handleExportJSON = () => {
    apiService.exportToJSON(tenders);
    setIsExportModalOpen(false);
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
        maxWidth: '480px',
        padding: '28px',
        position: 'relative'
      }}>
        <button 
          className="btn-icon" 
          onClick={() => setIsExportModalOpen(false)}
          style={{ position: 'absolute', top: '20px', right: '20px' }}
        >
          <X size={20} />
        </button>

        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
          <div style={{ padding: '10px', borderRadius: '12px', background: 'rgba(59, 130, 246, 0.15)', color: '#3b82f6' }}>
            <Download size={24} />
          </div>
          <div>
            <h2 style={{ fontSize: '20px', fontWeight: '800' }}>Export Tender Search Results</h2>
            <p style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
              Export {tenders.length} active opportunities to CSV or JSON formats.
            </p>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <button className="btn btn-primary" onClick={handleExportCSV} style={{ padding: '14px', justifyContent: 'flex-start', fontSize: '14px' }}>
            <FileSpreadsheet size={20} /> Download CSV Spreadsheet (.csv)
          </button>

          <button className="btn btn-secondary" onClick={handleExportJSON} style={{ padding: '14px', justifyContent: 'flex-start', fontSize: '14px' }}>
            <FileCode size={20} /> Download JSON Data Feed (.json)
          </button>
        </div>
      </div>
    </div>
  );
};
