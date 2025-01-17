import puppeteer from 'puppeteer';
import fs from 'fs';
import path from 'path';

// Define the base URL of your website
const baseUrl = 'https://tklaw-v6.netlify.app';  // Replace with your actual base URL

// Define static pages to crawl
const staticPages = [
  { path: '/en', name: 'HomePageEn' },
  { path: '/vi', name: 'HomePageVi' },
  { path: '/en/practices-and-sectors', name: 'PracticesAndSectorsEn' },
  { path: '/vi/linh-vuc-va-nganh-nghe', name: 'PracticesAndSectorsVi' },
  { path: '/en/contact', name: 'ContactPageEn' },
  { path: '/vi/lien-he', name: 'ContactPageVi' },
  { path: '/en/blog', name: 'BlogPageEn' },
  { path: '/vi/blog', name: 'BlogPageVi' },
  { path: '/en/attorneys', name: 'OurTeamPageEn' },
  { path: '/vi/luat-su', name: 'OurTeamPageVi' },
  { path: '/en/policies', name: 'PoliciesPageEn' },
  { path: '/vi/chinh-sach', name: 'PoliciesPageVi' }
];

// Function to extract and structure content from the page
async function extractContentWithTags(page, url) {
  await page.goto(url, { waitUntil: 'networkidle2' });

  // Extract and structure content by tag
  const contentStructure = await page.evaluate(() => {
    const tags = ['h1', 'h2', 'h3', 'p'];
    const contentMap = {};

    tags.forEach(tag => {
      const elements = Array.from(document.querySelectorAll(tag));
      if (elements.length > 0) {
        contentMap[tag] = elements.map(el => el.innerText).filter(text => text.trim() !== '');
      }
    });

    return contentMap;
  });

  return contentStructure;
}

// Main function to run the crawler
(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  const structuredData = {};

  for (const { path, name } of staticPages) {
    const url = `${baseUrl}${path}`;
    const content = await extractContentWithTags(page, url);
    structuredData[name] = content;
    console.log(`Extracted content for ${name}`, content);

    // Here you could send content to an NLP model or save it for future use
    // Example: sendToNLPModel(name, content);
  }

  fs.writeFileSync(
    path.join(process.cwd(), 'extractedContent.json'),
    JSON.stringify(structuredData, null, 2),
    'utf8'
  );

  await browser.close();
  console.log('Content extraction completed, saved to extractedContent.json');
})();