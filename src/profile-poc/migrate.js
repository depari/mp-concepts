const fs = require('fs');
const path = require('path');

function walk(dir) {
  let results = [];
  if (!fs.existsSync(dir)) return results;
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    file = dir + '/' + file;
    const stat = fs.statSync(file);
    if (stat && stat.isDirectory()) { 
      results = results.concat(walk(file));
    } else { 
      if (file.endsWith('.svelte') || file.endsWith('.ts')) results.push(file);
    }
  });
  return results;
}

const files = walk('./src').concat(['./src/App.svelte', './src/main.ts']);
files.filter(f => fs.existsSync(f)).forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  if (file.endsWith('.svelte')) {
    content = content.replace(/<script>/g, '<script lang="ts">');
  }
  content = content.replace(/\.js(['"])/g, '$1');
  fs.writeFileSync(file, content, 'utf8');
});

if (fs.existsSync('./src/main.js')) {
    fs.renameSync('./src/main.js', './src/main.ts');
}

let html = fs.readFileSync('./index.html', 'utf8');
html = html.replace('/src/main.js', '/src/main.ts');
fs.writeFileSync('./index.html', html, 'utf8');
