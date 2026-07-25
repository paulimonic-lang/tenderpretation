import axios from 'axios';

async function testAllFetch() {
  console.log('Testing fetching ALL 1,800+ tenders at once from etenders.gov.za...');
  const url = 'https://www.etenders.gov.za/Home/PaginatedTenderOpportunities?status=1&draw=1&start=0&length=2000';
  
  const start = Date.now();
  const res = await axios.get(url, {
    headers: {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)',
      'X-Requested-With': 'XMLHttpRequest'
    },
    timeout: 20000
  });

  const duration = (Date.now() - start) / 1000;
  console.log(`✓ Status: ${res.status} in ${duration.toFixed(2)}s`);
  console.log('Total Active in SA Treasury:', res.data.recordsTotal);
  console.log('Fetched Count (ALL Active Tenders):', res.data.data.length);
}

testAllFetch();
