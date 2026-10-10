const fs = require('node:fs');
const path = require('node:path');
const {newToolDefinitions} = require('./new-tools.js');

const escape = value => value.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
const root = __dirname;
const base = 'https://debugleaf.com/tools/';
for (const [slug, category, name, description, sample, parameter] of newToolDefinitions) {
  const dir=path.join(root,'tools',slug);
  fs.mkdirSync(dir,{recursive:true});
  const html=`<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="description" content="${escape(description)}"><link rel="canonical" href="${base}${slug}/"><title>${escape(name)} | Tool Home</title><link rel="icon" href="../../favicon.svg"><link rel="stylesheet" href="../../style.css"><link rel="stylesheet" href="../../tool.css"><link rel="stylesheet" href="../../ads.css"><link rel="stylesheet" href="../../generator-tools.css"><link rel="stylesheet" href="../../utility-pages.css"></head><body data-tool="${slug}"><header class="topbar"><a class="brand" href="../../"><img src="../../favicon.svg" alt=""><span>Tool<span>Home</span></span></a><nav><a href="../../#tools">All tools</a><a href="../../#faq">FAQ</a></nav></header><main class="tool-page"><p class="crumbs"><a href="../../">Home</a> / <a href="../../#tools">Tools</a> / ${escape(name)}</p><p class="eyebrow">Free browser ${category==='analysis'?'analysis':'utility'}</p><h1>${escape(name)}</h1><p class="lead">${escape(description)} All processing runs in this browser tab.</p><section class="tool-shell"><div class="panel-stack"><label for="source">Input<textarea id="source" rows="8" spellcheck="false" placeholder="${escape(sample)}"></textarea></label>${parameter?`<label for="parameter">${escape(parameter)}<input id="parameter" type="text" autocomplete="off"></label>`:''}<div class="tool-controls"><button id="sample" type="button">Load sample</button><button id="clear" type="button">Clear</button><button id="copy" type="button">Copy result</button></div><div class="summary-card"><p id="status" class="status-note info" aria-live="polite">Enter or paste input to begin.</p><label for="output">Result</label><textarea id="output" rows="12" class="readonly-output" readonly></textarea></div></div></section><aside class="ad-space" aria-label="Advertisement">Advertisement</aside><article class="tool-content"><h2>How to use ${escape(name)}</h2><p>Enter or paste your input, then review the result. Use Load sample to see the expected format and Copy result when you are done.</p><h2>Private browser processing</h2><p>Input is processed locally in this browser tab. The tool does not upload or store your text.</p><h2>Input limit</h2><p>For a responsive result, use up to 50,000 characters at a time.</p></article></main><script src="../../new-tools.js"></script></body></html>`;
  fs.writeFileSync(path.join(dir,'index.html'),html+'\n');
}

const appPath=path.join(root,'app.js');
let app=fs.readFileSync(appPath,'utf8');
const start='// BEGIN 30 NEW TOOLS';
const end='// END 30 NEW TOOLS';
const entries=newToolDefinitions.map(([slug,cat,name,desc])=>`tools.push(${JSON.stringify({slug,cat,icon:cat==='analysis'?'◎':'◇',name,desc,keywords:`${name.toLowerCase()},online ${name.toLowerCase()},free browser tool`})});`).join('\n');
const block=`${start}\n${entries}\n${end}`;
if(app.includes(start))app=app.replace(new RegExp(`${start}[\\s\\S]*?${end}`),block);
else app=app.replace('const grid = document.querySelector',`${block}\n\nconst grid = document.querySelector`);
fs.writeFileSync(appPath,app);

const indexPath=path.join(root,'index.html');
let index=fs.readFileSync(indexPath,'utf8');
index=index.replaceAll('135',String(135+newToolDefinitions.length));
fs.writeFileSync(indexPath,index);

const sitemapPath=path.join(root,'sitemap.xml');
let sitemap=fs.readFileSync(sitemapPath,'utf8');
const entryStart='  <!-- BEGIN 30 NEW TOOLS -->';
const entryEnd='  <!-- END 30 NEW TOOLS -->';
const sites=`${entryStart}\n${newToolDefinitions.map(([slug])=>`  <url><loc>${base}${slug}/</loc><lastmod>2026-10-10</lastmod></url>`).join('\n')}\n${entryEnd}`;
if(sitemap.includes(entryStart))sitemap=sitemap.replace(new RegExp(`${entryStart}[\\s\\S]*?${entryEnd}`),sites);
else sitemap=sitemap.replace('</urlset>',`${sites}\n</urlset>`);
fs.writeFileSync(sitemapPath,sitemap);
