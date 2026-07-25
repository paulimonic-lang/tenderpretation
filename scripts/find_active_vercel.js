import axios from 'axios';

async function testVercelUrls() {
  const urls = [
    'https://tenderpretation-en7u1q1ud-kaymo1.vercel.app',
    'https://tenderpretation-app.vercel.app',
    'https://tenderpretation-web.vercel.app',
    'https://tenderpretation.vercel.app',
    'https://tenderpretation-kaymo1.vercel.app'
  ];

  for (const u of urls) {
    try {
      const res = await axios.get(u, { timeout: 5000 });
      console.log(`URL ${u}: HTTP ${res.status}`);
      const jsMatch = res.data.match(/\/assets\/[A-Za-z0-9_-]+\.js/);
      if (jsMatch) {
        const jsUrl = `${u}${jsMatch[0]}`;
        const jsRes = await axios.get(jsUrl);
        const hasRender = jsRes.data.includes('onrender.com');
        console.log(`  -> JS ${jsMatch[0]}: contains onrender.com? ${hasRender}`);
      }
    } catch (e) {
      console.log(`URL ${u}: Error ${e.message}`);
    }
  }
}

testVercelUrls();
