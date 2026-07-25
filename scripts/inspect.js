import axios from 'axios';
import * as cheerio from 'cheerio';

async function inspectHtml() {
  try {
    const res = await axios.get('https://www.etenders.gov.za/Home/opportunities', {
      headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36' },
      timeout: 10000
    });

    const $ = cheerio.load(res.data);
    console.log('Page Title:', $('title').text().trim());
    console.log('Tables count:', $('table').length);

    $('table').each((i, elem) => {
      console.log(`Table ${i} id="${$(elem).attr('id')}" class="${$(elem).attr('class')}"`);
      const headers = $(elem).find('th').map((_, th) => $(th).text().trim()).get();
      console.log('Headers:', headers);

      const rows = $(elem).find('tbody tr');
      console.log(`Row count in table ${i}: ${rows.length}`);
      rows.slice(0, 3).each((rIdx, tr) => {
        const cells = $(tr).find('td').map((_, td) => $(td).text().trim().replace(/\s+/g, ' ')).get();
        console.log(`  Row ${rIdx}:`, cells);
      });
    });

    $('script').each((i, elem) => {
      const src = $(elem).attr('src') || '';
      const content = $(elem).html() || '';
      if (content.includes('ajax') || content.includes('DataTable') || content.includes('Tender') || content.includes('Opportunity')) {
        console.log(`Script ${i} (src="${src}"):`, content.slice(0, 350));
      }
    });
  } catch (err) {
    console.error('Error inspecting:', err.message);
  }
}

inspectHtml();
