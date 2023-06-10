import puppeteer from "puppeteer";
import path from 'path';
import fs from 'fs';

export default async function handler(req, res) {
  try {


    // Extract the HTML string from the request body
    const { html } = req.body;

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
       hello
      </body>
      </html>
    `;
    // Launch a new headless browser instance
    const browser = await puppeteer.launch({
      args: [
        '--ignore-certificate-errors',
        '--no-sandbox',
        '--disable-setuid-sandbox',
        '--window-size=1920,1080',
        "--disable-accelerated-2d-canvas",
        "--disable-gpu"],
      ignoreHTTPSErrors: true,
    });

    // Create a new page
    const page = await browser.newPage();

    // Set the page content to the HTML string
    console.log(htmlWithFont);
    await page.setContent(htmlWithFont);

    // Generate a PDF from the page content
    const pdfBuffer = await page.pdf();

    // Close the browser instance
    await browser.close();

    // Set the response headers and send the PDF as a download
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'attachment; filename=download.pdf');
    res.send(pdfBuffer);
  } catch (error) {
    res.send(error.toString());

  }
}
