import fs from 'fs';
import path from 'path';

const componentsDir = './src/lib/components';
const svelteFiles = fs.readdirSync(componentsDir).filter(f => f.endsWith('.svelte'));

for (const file of svelteFiles) {
  const filePath = path.join(componentsDir, file);
  let content = fs.readFileSync(filePath, 'utf-8');
  if (content.includes('<script>') && !content.includes('<script lang="ts">')) {
    content = content.replace(/<script>/g, '<script lang="ts">');
    fs.writeFileSync(filePath, content, 'utf-8');
    console.log(`Updated ${file}`);
  }
}

const mainJsPath = './src/main.js';
const mainTsPath = './src/main.ts';
if (fs.existsSync(mainJsPath)) {
  fs.renameSync(mainJsPath, mainTsPath);
  console.log('Renamed main.js to main.ts');
}

const indexHtmlPath = './index.html';
if (fs.existsSync(indexHtmlPath)) {
  let indexContent = fs.readFileSync(indexHtmlPath, 'utf-8');
  if (indexContent.includes('src/main.js')) {
    indexContent = indexContent.replace('src/main.js', 'src/main.ts');
    fs.writeFileSync(indexHtmlPath, indexContent, 'utf-8');
    console.log('Updated index.html mapping main.js to main.ts');
  }
}

// Add vite-env.d.ts to fix CSS imports
const envTypePath = './src/vite-env.d.ts';
if (!fs.existsSync(envTypePath)) {
  fs.writeFileSync(envTypePath, '/// <reference types="svelte" />\n/// <reference types="vite/client" />\n', 'utf-8');
  console.log('Created vite-env.d.ts');
}
