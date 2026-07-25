import axios from 'axios';

async function findColumnsDef() {
  const res = await axios.get('https://www.etenders.gov.za/Home/opportunities', {
    headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' }
  });

  const html = res.data;
  const idx = html.indexOf('getCorrectTenderTableColumns');
  if (idx !== -1) {
    console.log('Snippet around getCorrectTenderTableColumns:');
    console.log(html.slice(idx, idx + 2000));
  } else {
    console.log('Not found directly in html, checking linked js files...');
  }
}

findColumnsDef();
