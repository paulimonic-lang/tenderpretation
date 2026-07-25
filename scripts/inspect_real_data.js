import axios from 'axios';

async function inspectRealTenderData() {
  const url = 'https://www.etenders.gov.za/Home/PaginatedTenderOpportunities?status=1&draw=1&start=0&length=10';
  const res = await axios.get(url, {
    headers: {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
      'X-Requested-With': 'XMLHttpRequest'
    }
  });

  console.log('Total Active Tenders on etenders.gov.za:', res.data.recordsTotal);
  console.log('Filtered Tenders:', res.data.recordsFiltered);

  if (res.data.data && res.data.data.length > 0) {
    console.log('\n=== REAL LIVE TENDER OBJECT STRUCTURE ===');
    console.log(JSON.stringify(res.data.data[0], null, 2));

    console.log('\n=== TOP 5 REAL TENDERS CURRENTLY LIVE ON ETENDERS.GOV.ZA ===');
    res.data.data.slice(0, 5).forEach((item, idx) => {
      console.log(`\n--- Real Tender #${idx + 1} ---`);
      console.log('ID / Ref No  :', item.TenderNo || item.TenderNumber || item.Id || item.ReferenceNo);
      console.log('Description  :', item.TenderDescription || item.Description || item.Title);
      console.log('Department   :', item.DepartmentName || item.OrganOfState || item.Department);
      console.log('Category     :', item.CategoryName || item.Category);
      console.log('Advertised   :', item.DateAdvertised || item.AdvertisedDate);
      console.log('Closing Date :', item.ClosingDate || item.DateClosing);
      console.log('ESubmission  :', item.eSubmission);
    });
  }
}

inspectRealTenderData();
