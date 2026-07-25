import axios from 'axios';
import * as cheerio from 'cheerio';

async function debugVercelBuild() {
  console.log('Fetching Vercel HTML...');
  const res = await axios.get('https://tenderpretation-app.vercel.app/', {
    headers: { 'User-Agent': 'Mozilla/5.0' }
  });

  const $ = cheerio.load(res.data);
  const scripts = $('script[src]').map((_, el) => $(el).attr('src')).get();
  console.log('Vercel Script Tags:', scripts);

  for (const src of scripts) {
    const fullUrl = src.startsWith('http') ? src : `https://tenderpretation-app.vercel.app${src}`;
    try {
      const jsRes = await axios.get(fullUrl);
      console.log(`\nJS file ${src}: length=${jsRes.data.length}`);
      
      const containsRenderUrl = jsRes.data.includes('onrender.com');
      console.log('Contains onrender.com?', containsRenderUrl);

      if (containsRenderUrl) {
        const idx = jsRes.data.indexOf('onrender.com');
        console.log('Snippet around onrender.com:');
        console.log(jsRes.data.slice(Math.max(0, idx - 100), idx + 100));
      }
    } catch (err) {
      console.log('Err fetching JS:', err.message);
    }
  }
}

debugVercelBuild();
