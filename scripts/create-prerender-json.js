const fs = require('fs');
const path = require('path');
const jsPath = path.join('.next','prerender-manifest.js');
const jsonPath = path.join('.next','prerender-manifest.json');
const s = fs.readFileSync(jsPath,'utf8');
const firstQuote = s.indexOf('"');
const lastQuote = s.lastIndexOf('"');
if (firstQuote === -1 || lastQuote === -1 || lastQuote <= firstQuote) {
  console.error('Could not locate JSON string in JS manifest');
  process.exit(1);
}
const raw = s.slice(firstQuote+1, lastQuote);
let obj;
try {
  const unescaped = JSON.parse(`"${raw}"`);
  obj = JSON.parse(unescaped);
} catch (e) {
  console.error('Failed to parse JSON string:', e.message);
  console.error('Raw (first 120 chars):', raw.slice(0,120));
  console.error('Raw JSON-escaped:', JSON.stringify(raw.slice(0,120)));
  process.exit(1);
}
fs.writeFileSync(jsonPath, JSON.stringify(obj));
console.log('Wrote', jsonPath);
