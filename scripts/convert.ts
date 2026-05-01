import fs from 'fs';
import path from 'path';
import { parseArgs } from 'util';
import { convertHtmlToDocuments } from '../src/utils/documentConverter';

// Helper function to convert local image references to base64
function inlineImages(htmlString: string, baseDir: string): string {
  // Regex to match <img ... src="something" ... >
  return htmlString.replace(/<img[^>]+src=(["'])(.*?)\1[^>]*>/gi, (match, quote, src) => {
    // If it's already a web URL or base64 data URI, skip it
    if (src.startsWith('http') || src.startsWith('data:')) {
      return match;
    }

    try {
      // Resolve the absolute path of the image relative to the HTML file's directory
      const imagePath = path.resolve(baseDir, src);
      if (fs.existsSync(imagePath)) {
        // Determine mime type from extension
        const ext = path.extname(imagePath).toLowerCase().replace('.', '');
        let mimeType = 'image/jpeg';
        if (ext === 'png') mimeType = 'image/png';
        else if (ext === 'gif') mimeType = 'image/gif';
        else if (ext === 'svg') mimeType = 'image/svg+xml';
        else if (ext === 'webp') mimeType = 'image/webp';

        const imgBuffer = fs.readFileSync(imagePath);
        const base64Data = imgBuffer.toString('base64');
        const dataUri = `data:${mimeType};base64,${base64Data}`;
        
        // Replace the original src with the data URI
        return match.replace(`src=${quote}${src}${quote}`, `src=${quote}${dataUri}${quote}`);
      } else {
        console.warn(`⚠️ Warning: Image not found at ${imagePath}`);
      }
    } catch (e) {
      console.warn(`⚠️ Warning: Failed to process image ${src}: ${e}`);
    }
    
    return match;
  });
}

async function main() {
  // Parse command line arguments to look for "-f"
  const { values } = parseArgs({
    options: {
      file: {
        type: 'string',
        short: 'f',
      },
    },
    strict: false,
  });

  const inputFilePath = values.file;

  if (!inputFilePath || typeof inputFilePath !== 'string') {
    console.error('❌ Error: Please provide an HTML file path using the -f flag.');
    console.error('Usage: npx tsx scripts/convert.ts -f <path-to-html-file>');
    process.exit(1);
  }

  const absoluteInputPath = path.resolve(process.cwd(), inputFilePath);

  if (!fs.existsSync(absoluteInputPath)) {
    console.error(`❌ Error: File not found at ${absoluteInputPath}`);
    process.exit(1);
  }

  try {
    console.log(`📄 Reading HTML from: ${absoluteInputPath}`);
    let htmlString = fs.readFileSync(absoluteInputPath, 'utf-8');
    
    console.log('🖼️  Inlining local images to base64...');
    htmlString = inlineImages(htmlString, path.dirname(absoluteInputPath));
    
    console.log('⏳ Converting HTML to PDF and DOCX (this may take a moment)...');
    
    // We import and use our server-side converter utility directly
    const { pdfBuffer, docxBuffer } = await convertHtmlToDocuments(htmlString);
    
    const parsedPath = path.parse(absoluteInputPath);
    const outputPdfPath = path.join(parsedPath.dir, `${parsedPath.name}.pdf`);
    const outputDocxPath = path.join(parsedPath.dir, `${parsedPath.name}.docx`);
    
    // Write buffers to the file system natively
    fs.writeFileSync(outputPdfPath, pdfBuffer);
    fs.writeFileSync(outputDocxPath, docxBuffer);
    
    console.log(`✅ Success! Created the following files:`);
    console.log(`   - PDF:  ${outputPdfPath}`);
    console.log(`   - DOCX: ${outputDocxPath}`);
  } catch (error) {
    console.error('❌ Error during document conversion:', error);
    process.exit(1);
  }
}

main();
