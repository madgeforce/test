import puppeteer from "puppeteer";
import path from 'path';
import fs from 'fs';

export default async function handler(req, res) {
    // Extract the HTML string from the request body
    const { html } = req.body;
    const imagePath = path.join(process.cwd(), 'public', 'assets', 'images', 'brands', 'OChEn.svg');
    const imageData = fs.readFileSync(imagePath);
    const imageBase64 = imageData.toString('base64');
    const imageUrl = `data:image/svg+xml;base64,${imageBase64}`;
    // Define the @font-face rule and add it to the HTML string
    const htmlWithFont = `
    <html>
    <head>
      <style>
        @font-face {
          font-family: 'Cairo';
          src: url('/assets/font/Cairo/static/Cairo-Regular.ttf') format('truetype');
        }
        html {
          font-family: 'Cairo', sans-serif;
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        } 
        body {
          font-family: 'Cairo', sans-serif;
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        } 
        .value{
            background:transparent !important;
            border:none !important;
        }
      </style>
      </head>
      <body>
       ${html?.replace("/assets/images/brands/OChEn.svg", imageUrl)}
      </body>
      </html>
    `;
    // Launch a new headless browser instance
    const browser = await puppeteer.launch({ headless: "new" });

    // Create a new page
    const page = await browser.newPage();

    // Set the page content to the HTML string
    await page.setContent(htmlWithFont);

    // Generate a PDF from the page content
    const pdfBuffer = await page.pdf();

    // Close the browser instance
    await browser.close();

    // Set the response headers and send the PDF as a download
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'attachment; filename=download.pdf');
    res.send(pdfBuffer);
}
