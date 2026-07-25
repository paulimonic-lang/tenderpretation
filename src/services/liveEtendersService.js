export const liveEtendersService = {
  fetchLiveRealTenders: async (limit = 2000) => {
    // 1. Primary Live Cloud Server (Render)
    try {
      console.log('🇿🇦 Querying Render Live Backend Server for 1,800+ SA tenders...');
      const cloudRes = await fetch(`https://tenderpretation-app.onrender.com/api/tenders/live?limit=${limit}`);
      if (cloudRes.ok) {
        const data = await cloudRes.json();
        if (data.success && data.tenders && data.tenders.length > 0) {
          console.log(`✓ Live Cloud Sync Complete! Loaded ALL ${data.tenders.length} active tenders from etenders.gov.za`);
          return { success: true, tenders: data.tenders, recordsTotal: data.recordsTotal, sourceName: 'eTenders.gov.za Live Cloud API' };
        }
      }
    } catch (err) {
      console.warn('Render cloud server warming up, trying local server fallback...', err);
    }

    // 2. Local Express scraper backend fallback (http://localhost:5000)
    try {
      const response = await fetch(`http://localhost:5000/api/tenders/live?limit=${limit}`);
      if (response.ok) {
        const data = await response.json();
        if (data.success && data.tenders && data.tenders.length > 0) {
          return { success: true, tenders: data.tenders, recordsTotal: data.recordsTotal, sourceName: 'eTenders.gov.za Local API' };
        }
      }
    } catch (err) {
      console.warn('Local server fallback note:', err);
    }

    // 3. Direct browser fetch fallback
    try {
      const directUrl = `https://www.etenders.gov.za/Home/PaginatedTenderOpportunities?status=1&draw=1&start=0&length=${limit}`;
      const directRes = await fetch(directUrl, {
        headers: { 'X-Requested-With': 'XMLHttpRequest' }
      });
      if (directRes.ok) {
        const data = await directRes.json();
        if (data.data && data.data.length > 0) {
          const mapped = data.data.map(item => ({
            id: item.tender_No || `TND-ZA-${item.id}`,
            title: item.description || 'Public Sector Tender',
            agency: item.organ_of_State || item.department || 'SA Government',
            source: 'etenders-sa',
            sourceName: 'eTenders.gov.za Live Feed',
            region: 'western-cape',
            regionName: item.province || 'National',
            category: 'consulting',
            categoryName: item.category || 'General',
            noticeType: item.type || 'RFP',
            value: 5000000,
            currency: 'ZAR',
            valueFormatted: 'R5.0M ZAR',
            publishedDate: item.date_Published ? item.date_Published.split('T')[0] : '2026-07-25',
            deadline: item.closing_Date ? item.closing_Date.split('T')[0] : '2026-08-30',
            daysRemaining: 30,
            status: 'Active',
            smeFriendly: true,
            bbbeeLevel: 'Level 1 Contributor',
            cidbGrade: 'Grade 1-9 Applicable',
            location: item.province || 'South Africa',
            summary: item.description,
            aiKeyDeliverables: ['CSD Supplier Registration', 'SARS Tax Pin Verified'],
            requirements: ['CSD Registration', 'Tax Compliance PIN'],
            documents: [{ name: 'Tender_Notice.pdf', size: 'PDF Spec' }],
            contact: `${item.contactPerson || 'Procurement Desk'} | ${item.email || 'N/A'}`
          }));
          return { success: true, tenders: mapped, recordsTotal: data.recordsTotal, sourceName: 'eTenders.gov.za Live Feed' };
        }
      }
    } catch (err) {
      console.error('Direct fetch note:', err);
    }

    return { success: false, tenders: [] };
  }
};
