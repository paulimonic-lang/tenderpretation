import axios from 'axios';

async function testRenderResponse() {
  console.log('Querying https://tenderpretation-app.onrender.com/api/tenders/live ...');
  try {
    const res = await axios.get('https://tenderpretation-app.onrender.com/api/tenders/live', { timeout: 15000 });
    console.log('Render Status:', res.status);
    console.log('Render Response Data Keys:', Object.keys(res.data));
    console.log('Success:', res.data.success);
    console.log('Count:', res.data.count);
    console.log('RecordsTotal:', res.data.recordsTotal);
    if (res.data.tenders && res.data.tenders.length > 0) {
      console.log('Sample Tender 1:', res.data.tenders[0].title);
    }
  } catch (err) {
    console.error('Render Error:', err.message);
    if (err.response) {
      console.error('Status:', err.response.status, 'Data:', err.response.data);
    }
  }
}

testRenderResponse();
