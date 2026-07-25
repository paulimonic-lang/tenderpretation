import axios from 'axios';

async function testRealPdfDownload() {
  const url = 'https://www.etenders.gov.za/Home/PaginatedTenderOpportunities?status=1&draw=1&start=0&length=5';
  const res = await axios.get(url, {
    headers: {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)',
      'X-Requested-With': 'XMLHttpRequest'
    }
  });

  const raw = res.data.data[0];
  console.log('Tender No:', raw.tender_No);
  if (raw.supportDocument && raw.supportDocument.length > 0) {
    const doc = raw.supportDocument[0];
    console.log('Support Doc:', doc);

    const downloadUrl = `https://www.etenders.gov.za/home/Download/?blobName=${doc.supportDocumentID}${doc.extension}&downloadedFileName=${encodeURIComponent(doc.fileName)}`;
    console.log('\nTesting exact download URL:', downloadUrl);

    try {
      const dRes = await axios.get(downloadUrl, {
        headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' },
        responseType: 'arraybuffer',
        timeout: 10000
      });

      console.log('✓ SUCCESS! HTTP Status:', dRes.status);
      console.log('Content-Type:', dRes.headers['content-type']);
      console.log('Downloaded File Size:', dRes.data.length, 'bytes');

      const isPdfHeader = dRes.data.toString('utf8', 0, 4) === '%PDF';
      console.log('Is valid PDF file (%PDF header)?', isPdfHeader);

    } catch (err) {
      console.error('Download error:', err.message);
    }
  }
}

testRealPdfDownload();
