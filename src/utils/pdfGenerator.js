import { jsPDF } from 'jspdf';

export const generatePDF = (responses, steps) => {
  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.getWidth();
  const margin = 20;
  const lineHeight = 7;
  let y = margin;

  // Title
  doc.setFontSize(18);
  doc.setFont(undefined, 'bold');
  doc.text('JOURNEY TO GOD\'S COMFORTING PRESENCE', pageWidth / 2, y, { align: 'center' });
  y += lineHeight * 1.5;

  doc.setFontSize(12);
  doc.setFont(undefined, 'italic');
  doc.text('A Messianic Guide to Experiencing Shalom', pageWidth / 2, y, { align: 'center' });
  y += lineHeight * 2;

  // Add line
  doc.setLineWidth(0.5);
  doc.line(margin, y, pageWidth - margin, y);
  y += lineHeight * 2;

  // Content
  doc.setFontSize(10);
  steps.forEach((step, index) => {
    if (responses[index]) {
      // Check if we need a new page
      if (y > 250) {
        doc.addPage();
        y = margin;
      }

      // Step title
      doc.setFont(undefined, 'bold');
      doc.text(`${index + 1}. ${step.title.toUpperCase()}`, margin, y);
      y += lineHeight;

      // Verse
      doc.setFont(undefined, 'italic');
      const verseText = `"${step.verse}" - ${step.reference}`;
      const verseLines = doc.splitTextToSize(verseText, pageWidth - 2 * margin);
      doc.text(verseLines, margin, y);
      y += lineHeight * verseLines.length + 3;

      // Response
      doc.setFont(undefined, 'normal');
      doc.text('Your Response:', margin, y);
      y += lineHeight;

      const responseLines = doc.splitTextToSize(responses[index], pageWidth - 2 * margin);
      doc.text(responseLines, margin, y);
      y += lineHeight * responseLines.length + lineHeight * 1.5;

      // Separator
      doc.setLineWidth(0.2);
      doc.line(margin, y, pageWidth - margin, y);
      y += lineHeight * 1.5;
    }
  });

  // Blessing at the end
  if (y > 220) {
    doc.addPage();
    y = margin;
  }

  y += lineHeight;
  doc.setFont(undefined, 'italic');
  const blessing = [
    'May the LORD bless you and keep you;',
    'May the LORD make His face shine upon you and be gracious to you;',
    'May the LORD turn His face toward you and give you peace.',
    '- Numbers 6:24-26'
  ];

  blessing.forEach(line => {
    doc.text(line, pageWidth / 2, y, { align: 'center' });
    y += lineHeight;
  });

  // Save the PDF
  const today = new Date().toISOString().split('T')[0];
  doc.save(`my-journey-to-gods-presence-${today}.pdf`);
};