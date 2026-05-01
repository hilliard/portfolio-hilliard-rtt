import { chromium } from 'playwright';
import HTMLToDOCX from 'html-to-docx';

/**
 * Converts an HTML string into PDF and DOCX buffers.
 * @param htmlString The HTML content to convert.
 * @returns An object containing the pdfBuffer and docxBuffer.
 */
export async function convertHtmlToDocuments(htmlString: string): Promise<{ pdfBuffer: Buffer; docxBuffer: Buffer }> {
  // 1. Convert to PDF using Playwright (already installed in your project)
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  
  // Set the content to the provided HTML. 
  // waitUntil: 'networkidle' ensures that any external assets (images, fonts, css) finish loading.
  await page.setContent(htmlString, { waitUntil: 'networkidle' });
  
  // Generate PDF buffer
  const pdfBuffer = await page.pdf({
    format: 'A4',
    printBackground: true,
    margin: { top: '0.5in', right: '0.5in', bottom: '0.5in', left: '0.5in' }
  });
  
  await browser.close();

  // 2. Convert to DOCX using html-to-docx
  // We apply some default settings that format the document well.
  const docxData = await HTMLToDOCX(htmlString, null, {
    table: { row: { cantSplit: true } },
    footer: true,
    pageNumber: true,
    margins: { top: 720, right: 720, bottom: 720, left: 720 } // 720 twips = 0.5 inch
  });

  return {
    pdfBuffer,
    docxBuffer: Buffer.isBuffer(docxData) ? docxData : Buffer.from(docxData as ArrayBuffer)
  };
}
