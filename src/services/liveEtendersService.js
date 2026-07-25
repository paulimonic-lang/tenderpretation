export const liveEtendersService = {
  fetchLiveRealTenders: async (limit = 2000) => {
    // 1. Same-Origin Vercel Edge Proxy (/api/tenders/live -> Render)
    try {
      console.log('🇿🇦 Querying Same-Origin Vercel Edge Proxy...');
      const proxyRes = await fetch(`/api/tenders/live?limit=${limit}`);
      if (proxyRes.ok) {
        const data = await proxyRes.json();
        if (data.success && data.tenders && data.tenders.length > 0) {
          console.log(`✓ Edge Proxy Sync Success! Loaded ${data.tenders.length} real active tenders.`);
          return { success: true, tenders: data.tenders, recordsTotal: data.recordsTotal, sourceName: 'eTenders.gov.za Live Cloud API' };
        }
      }
    } catch (err) {
      console.warn('Vercel Edge Proxy note:', err);
    }

    // 2. Direct Render Cloud Server (with 3 automatic retries for cold starts)
    const renderApiUrl = `https://tenderpretation-app.onrender.com/api/tenders/live?limit=${limit}`;
    for (let i = 0; i < 3; i++) {
      try {
        console.log(`[Attempt ${i + 1}/3] Querying Render Cloud API directly: ${renderApiUrl}`);
        const res = await fetch(renderApiUrl);
        if (res.ok) {
          const data = await res.json();
          if (data.success && data.tenders && data.tenders.length > 0) {
            console.log(`✓ Render Direct Sync Success! Loaded ${data.tenders.length} real active tenders.`);
            return { success: true, tenders: data.tenders, recordsTotal: data.recordsTotal, sourceName: 'eTenders.gov.za Live Cloud API' };
          }
        }
      } catch (err) {
        console.warn(`Attempt ${i + 1} note:`, err.message);
      }
      await new Promise(r => setTimeout(r, 2000));
    }

    // 3. Local Express Server Fallback
    try {
      const localRes = await fetch(`http://localhost:5000/api/tenders/live?limit=${limit}`);
      if (localRes.ok) {
        const localData = await localRes.json();
        if (localData.success && localData.tenders && localData.tenders.length > 0) {
          return { success: true, tenders: localData.tenders, recordsTotal: localData.recordsTotal, sourceName: 'eTenders.gov.za Local API' };
        }
      }
    } catch (err) {
      // Local fallback note
    }

    return { success: false, tenders: [] };
  }
};
