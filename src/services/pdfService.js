import { jsPDF } from 'jspdf';

export const pdfService = {
  // Generate and download a formatted official PDF specification document
  generateTenderPDF: (tender, docName = 'Tender_Specification.pdf') => {
    const doc = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4'
    });

    const pdfTitle = docName.endsWith('.pdf') ? docName : `${docName}.pdf`;

    // Colors
    const primaryColor = [15, 23, 42]; // Navy/Dark Slate
    const accentColor = [59, 130, 246]; // Blue
    const greenColor = [16, 185, 129]; // Emerald Green

    // Header Banner Background
    doc.setFillColor(...primaryColor);
    doc.rect(0, 0, 210, 32, 'F');

    // Header Text
    doc.setTextColor(255, 255, 255);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(14);
    doc.text('REPUBLIC OF SOUTH AFRICA - NATIONAL TREASURY', 14, 14);

    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    doc.text('OFFICIAL PUBLIC PROCUREMENT TENDER SPECIFICATION DOCUMENT', 14, 22);

    doc.setFontSize(8);
    doc.text(`Generated via ZA GovTender Hub • etenders.gov.za • ${new Date().toLocaleDateString()}`, 14, 28);

    // Metadata Table Section
    let yPos = 42;

    doc.setFillColor(241, 245, 249);
    doc.roundedRect(14, yPos, 182, 38, 3, 3, 'F');

    doc.setTextColor(...primaryColor);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(11);
    doc.text(`SOLICITATION REF: ${tender.id}`, 18, yPos + 8);

    doc.setFontSize(9);
    doc.setFont('helvetica', 'normal');
    doc.text(`Issuing Agency: ${tender.agency}`, 18, yPos + 16);
    doc.text(`Location / Province: ${tender.location || 'South Africa'}`, 18, yPos + 22);
    doc.text(`Est. Budget Value: ${tender.valueFormatted}`, 18, yPos + 28);
    doc.text(`Closing Deadline: ${tender.deadline} (${tender.daysRemaining} days left)`, 18, yPos + 34);

    doc.text(`B-BBEE Level: ${tender.bbbeeLevel || 'Level 1'}`, 115, yPos + 16);
    doc.text(`CIDB Grading: ${tender.cidbGrade || 'N/A'}`, 115, yPos + 22);
    doc.text(`SMME Set-Aside: ${tender.smeFriendly ? 'Yes (30% Subcontracting)' : 'No'}`, 115, yPos + 28);
    doc.text(`Portal Source: ${tender.sourceName}`, 115, yPos + 34);

    // Title Section
    yPos += 46;
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(12);
    doc.setTextColor(...accentColor);

    // Wrap Title
    const wrappedTitle = doc.splitTextToSize(tender.title, 182);
    doc.text(wrappedTitle, 14, yPos);
    yPos += (wrappedTitle.length * 6) + 4;

    // Scope Summary Section
    doc.setFontSize(11);
    doc.setTextColor(...primaryColor);
    doc.text('1. EXECUTIVE SUMMARY & SCOPE OF WORK', 14, yPos);
    yPos += 6;

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9.5);
    const wrappedSummary = doc.splitTextToSize(tender.summary || 'Specification details as published by issuing department.', 182);
    doc.text(wrappedSummary, 14, yPos);
    yPos += (wrappedSummary.length * 5) + 8;

    // Key AI Deliverables
    if (tender.aiKeyDeliverables && tender.aiKeyDeliverables.length > 0) {
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(11);
      doc.setTextColor(...primaryColor);
      doc.text('2. KEY DELIVERABLES & MILESTONES', 14, yPos);
      yPos += 6;

      doc.setFont('helvetica', 'normal');
      doc.setFontSize(9);
      tender.aiKeyDeliverables.forEach((deliv, idx) => {
        const itemText = doc.splitTextToSize(`${idx + 1}. ${deliv}`, 180);
        doc.text(itemText, 16, yPos);
        yPos += (itemText.length * 5);
      });
      yPos += 6;
    }

    // Mandatory Compliance Requirements
    if (tender.requirements && tender.requirements.length > 0) {
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(11);
      doc.setTextColor(...primaryColor);
      doc.text('3. MANDATORY COMPLIANCE & ELIGIBILITY GATE', 14, yPos);
      yPos += 6;

      doc.setFont('helvetica', 'normal');
      doc.setFontSize(9);
      tender.requirements.forEach((req) => {
        const reqText = doc.splitTextToSize(`[✓] ${req}`, 180);
        doc.text(reqText, 16, yPos);
        yPos += (reqText.length * 5);
      });
      yPos += 6;
    }

    // Contact Details
    yPos += 4;
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(10);
    doc.setTextColor(...accentColor);
    doc.text('4. OFFICIAL POINT OF CONTACT & SUBMISSION DESK', 14, yPos);
    yPos += 6;

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9);
    doc.setTextColor(...primaryColor);
    doc.text(`Contact Point: ${tender.contact || 'National Treasury eTenders Portal'}`, 14, yPos);

    // Footer
    doc.setFontSize(8);
    doc.setTextColor(100, 116, 139);
    doc.text('Confidential Official Specification Document • Downloaded via ZA GovTender Hub', 14, 285);

    // Trigger Browser PDF Download
    doc.save(pdfTitle);
  }
};
