import axios from 'axios';

async function testGet() {
  const urls = [
    'https://www.etenders.gov.za/Home/PaginatedTenderOpportunities?status=1&draw=1&start=0&length=20',
    'https://www.etenders.gov.za/Home/opportunities'
  ];

  for (const url of urls) {
    try {
      console.log('Testing GET:', url);
      const res = await axios.get(url, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
          'X-Requested-With': 'XMLHttpRequest'
        }
      });
      console.log('GET Status:', res.status, 'Type:', typeof res.data);
      if (typeof res.data === 'object') {
        console.log('Object Keys:', Object.keys(res.data));
        console.log('Data length:', res.data.data ? res.data.data.length : 'no data key');
      } else {
        console.log('Data snippet:', String(res.data).slice(0, 200));
      }
    } catch(e) {
      console.log('GET ERR:', e.message);
    }
  }
}

testGet();
