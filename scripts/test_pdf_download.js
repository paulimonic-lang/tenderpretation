import axios from 'axios';

async function testDocumentDownloadUrl() {
  const url = 'https://www.etenders.gov.za/Home/PaginatedTenderOpportunities?status=1&draw=1&start=0&length=5';
  const res = await axios.get(url, {
    headers: {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)',
      'X-Requested-With': 'XMLHttpRequest'
    }
  });

  const raw = res.data.data[0];
  console.log('Tender No:', raw.tender_No);
  console.log('Support Documents:', JSON.stringify(raw.supportDocument, null, 2));

  if (raw.supportDocument && raw.supportDocument.length > 0) {
    const doc = raw.supportDocument[0];
    const testUrls = [
      `https://www.etenders.gov.za/Home/DownloadDocument?fileId=${doc.supportDocumentID}`,
      `https://www.etenders.gov.za/Home/Download?fileId=${doc.supportDocumentID}`,
      `https://www.etenders.gov.za/Home/DownloadSupportDocument/${doc.supportDocumentID}`,
      `https://www.etenders.gov.za/Home/DownloadFile?id=${doc.supportDocumentID}`
    ];

    for (const link of testUrls) {
      try {
        const dRes = await axios.head(link, { headers: { 'User-Agent': 'Mozilla/5.0' }, timeout: 4000 });
        console.log('HEAD OK:', link, 'Status:', dRes.status, 'Content-Type:', dRes.headers['content-type']);
      } catch (err) {
        console.log('HEAD ERR:', link, err.message);
      }
    }
  }
}

testDocumentDownloadUrl();
