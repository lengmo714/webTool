const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
const {newToolDefinitions,runNewTool}=require('./new-tools.js');

const cases={
  'sentence-counter':['Hello! How are you?','Sentences: 2'],
  'paragraph-counter':['One\n\nTwo','Paragraphs: 2'],
  'text-ngram-generator':['one two one two','2','2\tone two'],
  'longest-word-finder':['cat elephant dog','Longest length: 8'],
  'repeated-word-finder':['Blue blue red','blue: 2'],
  'nato-phonetic-converter':['AB','Alfa Bravo'],
  'rot47-cipher':['Hello!','w6==@P'],
  'regex-escape':['a.b+(c)','a\\.b\\+\\(c\\)'],
  'markdown-heading-outline':['# Main\n## Sub','1. Main'],
  'markdown-link-extractor':['[Example](https://example.com)','Link: Example → https://example.com'],
  'css-specificity-calculator':['#app .card > h2','Specificity: 1-1-1'],
  'css-px-rem-converter':['24px','16','1.5rem'],
  'json-key-sorter':['{"z":1,"a":2}','"a": 2'],
  'json-flattener':['{"a":{"b":2}}','"/a/b": 2'],
  'json-array-deduplicator':['[1,2,1]','[\n  1,\n  2\n]'],
  'csv-column-extractor':['name,note\nAda,"Hello, world"','note','Hello, world'],
  'csv-row-counter':['name,note\nAda,"Hello,\nworld"','Records: 2'],
  'csv-column-profiler':['name,city\nAda,London\nGrace,London','city: 2 filled, 1 distinct'],
  'iso-week-calculator':['2021-01-01','2020-W53'],
  'day-of-year-calculator':['2024-12-31','Day of year: 366'],
  'weekday-calculator':['2026-10-10','Saturday'],
  'business-day-calculator':['2026-10-05, 2026-10-09','Weekdays (inclusive): 5'],
  'prime-range-generator':['10, 20','11, 13, 17, 19'],
  'divisor-list-generator':['12','1, 2, 3, 4, 6, 12'],
  'triangular-number-calculator':['1000000','500000500000'],
  'distance-converter':['1 km to m','1000 m'],
  'speed-converter':['36 km/h to m/s','10 m/s'],
  'area-converter':['1 ha to m2','10000 m2'],
  'pressure-converter':['1 bar to kpa','100 kpa']
};
assert.equal(newToolDefinitions.length,30);
assert.equal(new Set(newToolDefinitions.map(x=>x[0])).size,30);
for(const [slug,category,name,description,sample] of newToolDefinitions){
  const page=fs.readFileSync(path.join(__dirname,'tools',slug,'index.html'),'utf8');
  assert.ok(page.includes(`data-tool="${slug}"`),slug);
  assert.ok(page.includes(name),slug);
  assert.ok(page.includes('../../new-tools.js'),slug);
  assert.ok(sample,slug);
  if(slug==='html-heading-extractor')continue; // DOMParser is a browser API.
  const [input,a,b]=cases[slug];
  const actual=runNewTool(slug,input,b===undefined?'':a);
  assert.ok(actual.includes(b===undefined?a:b),`${slug}: ${actual}`);
}
const app=fs.readFileSync(path.join(__dirname,'app.js'),'utf8');
const sitemap=fs.readFileSync(path.join(__dirname,'sitemap.xml'),'utf8');
for(const [slug] of newToolDefinitions){assert.ok(app.includes(`"slug":"${slug}"`),slug);assert.ok(sitemap.includes(`/tools/${slug}/`),slug);}
assert.throws(()=>runNewTool('weekday-calculator','2026-02-30'),/valid calendar date/);
assert.throws(()=>runNewTool('csv-column-extractor','a,b\n1,2','missing'),/Column not found/);
console.log('30 pages, catalog entries, sitemap entries, and calculation checks passed.');
