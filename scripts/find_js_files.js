import axios from 'axios';
import * as cheerio from 'cheerio';

async function findJsFiles() {
  const res = await axios.get('https://www.etenders.gov.za/Home/opportunities', {
    headers: { 'User-Agent': 'Mozilla/5.0' }
  });

  const $ = cheerio.load(res.data);
  const scripts = $('script[src]').map((_, el) => $(el).attr('src')).get();
  console.log('Script files:', scripts);

  for (const src of scripts) {
    if (src.includes('site') || src.includes('tender') || src.includes('app') || src.includes('main') || !src.includes('jquery')) {
      const fullUrl = src.startsWith('http') ? src : `https://www.etenders.gov.za${src}`;
      try {
        const jsRes = await axios.get(fullUrl, { headers: { 'User-Agent': 'Mozilla/5.0' } });
        if (jsRes.data.includes('getCorrectTenderTableColumns') || jsRes.data.includes('supportDocument') || jsRes.data.includes('Download')) {
          console.log(`\n=== FOUND IN ${src} ===`);
          const lines = jsRes.data.split('\n');
          lines.forEach(line => {
            if (line.includes('getCorrectTenderTableColumns') || line.includes('supportDocument') || line.includes('DownloadDocument') || line.includes('details') || line.includes('TenderDetails')) {
              console.log(line.trim());
            }
          });
        }
      } catch (err) {
        console.log('Err fetching', src, err.message);
      }
    }
  }
}

findJsFiles();
