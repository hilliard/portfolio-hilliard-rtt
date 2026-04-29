const mammoth = require("mammoth");
const fs = require("fs");
const path = require("path");
const { basename } = require("path");

const inputFile = "public/resume/Hilliard-M-Scott-Resume-2025.docx";
const outputFile = "public/resume/resume-hilliard-m-scott-2025.html";

async function convertResume() {
  try {
    const result = await mammoth.convertToHtml({
      path: path.join(process.cwd(), inputFile),
    });

    // Create template with basic styling
    const title = basename(inputFile, ".docx");
    const isWarningFree = result.messages.length === 0;
    const warningText = result.messages.length > 0 
      ? result.messages.map(m => "<small>Warning: " + m.message + "</small>").join(" | ")
      : "";
    
    const footer = `
  <div class="footer">
    <p>File: ${title}</p>
    <p>Generated: ${new Date().toLocaleDateString()}</p>
    <p>Status: ${isWarningFree ? "No parsing warnings" : "With warnings"} ${warningText}</p>
  </div>`;

    const html = `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${title}</title>
  <style>
    body {
      font-family: Arial, Helvetica, sans-serif;
      max-width: 800px;
      margin: 0 auto;
      padding: 2rem;
      line-height: 1.6;
      color: #333;
    }
    .footer {
      margin-top: 3rem;
      padding-top: 1rem;
      border-top: 1px solid #eee;
      font-size: 0.9em;
      color: #666;
    }
    h1, h2, h3 { color: #1a1a1a; }
    a { color: #16bbe0; text-decoration: none; }
    a:hover { text-decoration: underline; }
    img { max-width: 100%; height: auto; }
  </style>
</head>
<body>
${result.value}

${footer}
</body>
</html>`;

    console.log(`✅ HTML conversion complete`);
    console.log(`📤 Output: ${outputFile}`);

    fs.writeFileSync(outputFile, html);

    const stats = fs.statSync(outputFile);
    console.log(`📊 Size: ${stats.size} bytes`);
    console.log(`📝 Messages: ${result.messages.length} ${result.messages.length === 0 ? "warnings" : "items (see above)"}`);

    return { output: outputFile, messages: result.messages };
  } catch (error) {
    console.error("❌ Conversion failed:", error.message);
    throw error;
  }
}

convertResume().catch((err) => {
  console.error(err);
  process.exit(1);
});
