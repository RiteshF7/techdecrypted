#!/usr/bin/env node
// Script to fetch a Notion page, convert to MDX, and save in content/blogs/<page-id>/
const { Client } = require('@notionhq/client');
const { NotionToMarkdown } = require('notion-to-md');
const fs = require('fs');
const path = require('path');

// Load environment variables from process.env
const NOTION_API_KEY = process.env.NOTION_API_KEY;
const NOTION_PAGE_ID = process.env.NOTION_PAGE_ID;

if (!NOTION_API_KEY || !NOTION_PAGE_ID) {
  console.error('Please set NOTION_API_KEY and NOTION_PAGE_ID environment variables.');
  process.exit(1);
}

const notion = new Client({ auth: NOTION_API_KEY });
const n2m = new NotionToMarkdown({ notionClient: notion });

async function main() {
  try {
    // Convert page to markdown blocks
    const mdblocks = await n2m.pageToMarkdown(NOTION_PAGE_ID);
    // Convert to markdown string
    const mdString = n2m.toMarkdownString(mdblocks).parent;

    // Generate a subfolder name based on the page ID
    const subFolder = `notion-${NOTION_PAGE_ID.slice(0, 8)}`;
    // Generate a filename based on the page ID and current date
    const fileName = `post-${Date.now()}.mdx`;
    // Define the output directory and subfolder path
    const outputDir = path.join(__dirname, '../content/blogs/', subFolder);
    const outputPath = path.join(outputDir, fileName);

    // Ensure output directory and subfolder exist
    fs.mkdirSync(outputDir, { recursive: true });

    // Write the MDX file
    fs.writeFileSync(outputPath, mdString, 'utf8');
    console.log(`MDX file saved to: ${outputPath}`);
  } catch (err) {
    console.error('Error fetching or saving Notion page:', err);
    process.exit(1);
  }
}

main();