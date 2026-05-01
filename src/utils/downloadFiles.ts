/**
 * Helper function to download base64 data as a file
 */
export function downloadBase64File(base64Data: string, filename: string, contentType: string) {
  const byteCharacters = atob(base64Data);
  const byteNumbers = new Array(byteCharacters.length);
  for (let i = 0; i < byteCharacters.length; i++) {
    byteNumbers[i] = byteCharacters.charCodeAt(i);
  }
  const byteArray = new Uint8Array(byteNumbers);
  const blob = new Blob([byteArray], { type: contentType });
  
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

/**
 * Sends HTML to the API and downloads both PDF and DOCX files.
 */
export async function generateAndDownloadResume(htmlContent: string) {
  try {
    const response = await fetch('/api/convert', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ html: htmlContent, format: 'both' }),
    });

    if (!response.ok) {
      throw new Error('Failed to generate documents');
    }

    const data = await response.json();
    
    // Download PDF
    if (data.pdfBase64) {
      downloadBase64File(data.pdfBase64, 'resume.pdf', 'application/pdf');
    }
    
    // Download DOCX
    if (data.docxBase64) {
      downloadBase64File(
        data.docxBase64, 
        'resume.docx', 
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
      );
    }
    
    return true;
  } catch (error) {
    console.error('Error downloading files:', error);
    return false;
  }
}
