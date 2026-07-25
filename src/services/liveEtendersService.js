export const liveEtendersService = {
  fetchLiveRealTenders: async (limit = 2000) => {
    const renderApiUrl = `https://tenderpretation-app.onrender.com/api/tenders/live?limit=${limit}`;
    const localApiUrl = `http://localhost:5000/api/tenders/live?limit=${limit}`;

    // Helper for fetch with timeout & auto-retry
    const fetchWithRetry = async (url, retries = 3, delay = 2000) => {
      for (let i = 0; i < retries; i++) {
        try {
          console.log(`[Attempt ${i + 1}/${retries}] Querying SA Procurement Cloud Engine: ${url}`);
          const res = await fetch(url);
          if (res.ok) {
            const data = await res.json();
            if (data.success && data.tenders && data.tenders.length > 0) {
              return data;
            }
          }
        } catch (err) {
          console.warn(`Attempt ${i + 1} note:`, err.message);
        }
        if (i < retries - 1) await new Promise(r => setTimeout(r, delay));
      }
      return null;
    };

    // 1. Query Render Cloud Server (with 3 automatic retries for cold starts)
    const cloudData = await fetchWithRetry(renderApiUrl, 3, 2000);
    if (cloudData) {
      console.log(`✓ Cloud Sync Success! Loaded ${cloudData.tenders.length} real tenders.`);
      return { success: true, tenders: cloudData.tenders, recordsTotal: cloudData.recordsTotal, sourceName: 'eTenders.gov.za Live Cloud API' };
    }

    // 2. Query Local Express Server
    try {
      const localRes = await fetch(localApiUrl);
      if (localRes.ok) {
        const localData = await localRes.json();
        if (localData.success && localData.tenders && localData.tenders.length > 0) {
          return { success: true, tenders: localData.tenders, recordsTotal: localData.recordsTotal, sourceName: 'eTenders.gov.za Local API' };
        }
      }
    } catch (err) {
      // Local server fallback note
    }

    return { success: false, tenders: [] };
  }
};
