import { NextRequest, NextResponse } from 'next/server';
import { convertHtmlToDocuments } from '@/utils/documentConverter';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { html, format } = body; // format can be 'pdf', 'docx', or 'both'
    
    if (!html) {
      return NextResponse.json({ error: 'HTML content is required' }, { status: 400 });
    }

    const { pdfBuffer, docxBuffer } = await convertHtmlToDocuments(html);

    // If a specific format is requested, return the file as a downloadable blob
    if (format === 'pdf') {
      return new NextResponse(pdfBuffer as any, {
        status: 200,
        headers: {
          'Content-Type': 'application/pdf',
          'Content-Disposition': 'attachment; filename="resume.pdf"'
        }
      });
    } else if (format === 'docx') {
      return new NextResponse(docxBuffer as any, {
        status: 200,
        headers: {
          'Content-Type': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
          'Content-Disposition': 'attachment; filename="resume.docx"'
        }
      });
    }

    // Default: return base64 encoded strings for both documents so the frontend can handle both at once
    return NextResponse.json({
      success: true,
      pdfBase64: pdfBuffer.toString('base64'),
      docxBase64: docxBuffer.toString('base64')
    });

  } catch (error) {
    console.error('Error in document conversion API:', error);
    return NextResponse.json({ error: 'Failed to convert document' }, { status: 500 });
  }
}
