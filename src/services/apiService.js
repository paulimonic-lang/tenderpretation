import { SAMPLE_TENDERS } from '../data/sampleTenders';
import { pdfService } from './pdfService';

const triggerBrowserDownload = (content, fileName, mimeType = 'text/plain;charset=utf-8;') => {
  const blob = new Blob([content], { type: mimeType });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', fileName);
  document.body.appendChild(link);
  link.click();
  setTimeout(() => {
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }, 100);
};

export const apiService = {
  getTenders: (filters = {}, customApiKey = null) => {
    let results = [...SAMPLE_TENDERS];

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

    return results;
  },

  // Download the Authentic Original PDF directly from etenders.gov.za
  downloadOriginalPDF: (doc, tender) => {
    if (doc && doc.originalUrl) {
      // Direct authentic download link from etenders.gov.za
      window.open(doc.originalUrl, '_blank');
    } else {
      // Fallback PDF generator if custom created
      pdfService.generateTenderPDF(tender, doc ? doc.name : `${tender.id}_Spec.pdf`);
    }
  },

  // Download Summary Text file (.txt)
  downloadDocumentSpec: (docName, tender) => {
    const fileTextContent = `================================================================================
SOUTH AFRICAN GOVERNMENT TENDER SPECIFICATION DOCUMENT
================================================================================

SOLICITATION ID   : ${tender.id}
TENDER TITLE      : ${tender.title}
ISSUING AGENCY    : ${tender.agency}
SOURCE PORTAL     : ${tender.sourceName}
LOCATION          : ${tender.location}
EST. BUDGET VALUE : ${tender.valueFormatted}
CLOSING DEADLINE  : ${tender.deadline} (${tender.daysRemaining} days remaining)
STATUS            : ${tender.status}
B-BBEE LEVEL      : ${tender.bbbeeLevel || 'Level 1'}
CIDB GRADING      : ${tender.cidbGrade || 'N/A'}
SMME SET-ASIDE    : ${tender.smeFriendly ? 'Yes (30% Local Subcontracting)' : 'No'}

--------------------------------------------------------------------------------
EXECUTIVE SUMMARY & SCOPE OF WORK
--------------------------------------------------------------------------------
${tender.summary}

--------------------------------------------------------------------------------
KEY DELIVERABLES EXTRACTED BY AI
--------------------------------------------------------------------------------
${tender.aiKeyDeliverables ? tender.aiKeyDeliverables.map((d, i) => `${i + 1}. ${d}`).join('\n') : 'N/A'}

--------------------------------------------------------------------------------
MANDATORY PROCUREMENT REQUIREMENTS
--------------------------------------------------------------------------------
${tender.requirements ? tender.requirements.map((r, i) => `[✓] ${r}`).join('\n') : 'N/A'}

--------------------------------------------------------------------------------
SUBMISSION & CONTACT DETAILS
--------------------------------------------------------------------------------
Contact Point: ${tender.contact}
Published via: ZA GovTender Hub (https://etenders.gov.za)

================================================================================
END OF SPECIFICATION FILE: ${docName}
================================================================================`;

    const cleanFileName = docName.endsWith('.txt') ? docName : `${docName.replace(/\.pdf$/, '')}_Summary.txt`;
    triggerBrowserDownload(fileTextContent, cleanFileName, 'text/plain;charset=utf-8;');
  },

  exportToCSV: (tenders) => {
    const headers = ['ID', 'Title', 'Agency', 'Source', 'Category', 'Budget Value', 'Deadline', 'Status', 'Location', 'B-BBEE Level'];
    const rows = tenders.map(t => [
      `"${t.id}"`,
      `"${t.title.replace(/"/g, '""')}"`,
      `"${t.agency.replace(/"/g, '""')}"`,
      `"${t.sourceName}"`,
      `"${t.categoryName}"`,
      `"${t.valueFormatted}"`,
      `"${t.deadline}"`,
      `"${t.status}"`,
      `"${t.location}"`,
      `"${t.bbbeeLevel || 'N/A'}"`
    ]);

    const csvString = [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    triggerBrowserDownload(csvString, `ZA_GovTenders_Export_${Date.now()}.csv`, 'text/csv;charset=utf-8;');
  },

  exportToJSON: (tenders) => {
    const jsonString = JSON.stringify(tenders, null, 2);
    triggerBrowserDownload(jsonString, `ZA_GovTenders_Export_${Date.now()}.json`, 'application/json;charset=utf-8;');
  }
};
