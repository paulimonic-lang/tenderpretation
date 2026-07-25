import axios from 'axios';
import * as cheerio from 'cheerio';

async function findAjaxUrl() {
  const res = await axios.get('https://www.etenders.gov.za/Home/opportunities', {
    headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' }
  });

  const $ = cheerio.load(res.data);
  $('script').each((i, elem) => {
    const text = $(elem).html() || '';
    if (text.includes('tendeList') || text.includes('DataTable') || text.includes('ajax')) {
      console.log(`=== Script ${i} ===`);
      console.log(text);
    }
  });
}

findAjaxUrl();
