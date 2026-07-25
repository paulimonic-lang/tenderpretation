import axios from 'axios';
import * as cheerio from 'cheerio';

async function findDownloadRoute() {
  const res = await axios.get('https://www.etenders.gov.za/Home/opportunities', {
    headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' }
  });

  const $ = cheerio.load(res.data);
  let matches = [];
  $('script').each((i, elem) => {
    const text = $(elem).html() || '';
    if (text.includes('supportDocument') || text.includes('Download') || text.includes('File') || text.includes('Document')) {
      const found = text.match(/\/Home\/[A-Za-z0-9_/?=]+/g);
      if (found) matches.push(...found);
    }
  });

  console.log('Unique routes found:', [...new Set(matches)]);
}

findDownloadRoute();
