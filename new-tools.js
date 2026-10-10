/* Thirty self-contained browser tools. The calculation functions also run in Node for verification. */
const newToolDefinitions = [
  ['sentence-counter','analysis','Sentence Counter','Count sentences using terminal punctuation, including Chinese full stops and question marks.','Hello world! How are you?',''],
  ['paragraph-counter','analysis','Paragraph Counter','Count nonempty paragraphs separated by one or more blank lines.','First paragraph.\n\nSecond paragraph.',''],
  ['text-ngram-generator','analysis','Word N-Gram Generator','List consecutive word pairs, triples, or larger groups with frequency counts.','One two one two three','N-gram size (2–5)'],
  ['longest-word-finder','analysis','Longest Word Finder','Find the longest words in text, counting Unicode letters and numbers.','The extraordinary example is here.',''],
  ['repeated-word-finder','analysis','Repeated Word Finder','Find words used more than once, ignoring case and sorting by frequency.','Blue green blue red green blue',''],
  ['nato-phonetic-converter','transform','NATO Phonetic Alphabet Converter','Spell English letters with the NATO phonetic alphabet while preserving digits and punctuation.','Meet at gate B7.',''],
  ['rot47-cipher','transform','ROT47 Encoder and Decoder','Apply reversible ROT47 substitution to printable ASCII characters.','Hello, World!',''],
  ['regex-escape','transform','Regular Expression Escaper','Escape characters with special meaning in a JavaScript regular expression.','file.name+(draft)?',''],
  ['markdown-heading-outline','analysis','Markdown Heading Outline','Extract ATX headings into a readable outline with their levels.','# Guide\n## Install\n### Windows',''],
  ['markdown-link-extractor','analysis','Markdown Link Extractor','Extract inline Markdown link labels and destinations, including image links.','[Home](https://example.com) ![Logo](logo.svg)',''],
  ['html-heading-extractor','analysis','HTML Heading Extractor','List h1 through h6 headings from pasted HTML, with text content and level.','<h1>Welcome</h1><h2>About <em>us</em></h2>',''],
  ['css-specificity-calculator','analysis','CSS Specificity Calculator','Calculate the ID, class, and type specificity of a basic CSS selector.','#app .card > h2',''],
  ['css-px-rem-converter','utility','CSS PX to REM Converter','Convert pixel values to rem and back using a chosen root font size.','24px','Root font size in px (default 16)'],
  ['json-key-sorter','transform','JSON Key Sorter','Sort object keys recursively while preserving array order and values.','{"z":1,"a":{"y":2,"b":3}}',''],
  ['json-flattener','transform','JSON Flattener','Flatten nested JSON into JSON Pointer paths with values.','{"user":{"name":"Ada"},"tags":["a","b"]}',''],
  ['json-array-deduplicator','clean','JSON Array Deduplicator','Remove duplicate JSON array entries by structural value while preserving first occurrences.','[1,2,1,{"a":1},{"a":1}]',''],
  ['csv-column-extractor','transform','CSV Column Extractor','Extract one CSV column by header name or one-based position, respecting quoted fields.','name,age\nAda,36\nGrace,41','Column name or number'],
  ['csv-row-counter','analysis','CSV Row Counter','Count CSV records and blank records with quote-aware parsing.','name,note\nAda,"Hello, world"\nGrace,Hi',''],
  ['csv-column-profiler','analysis','CSV Column Profiler','Show each CSV header, filled cell count, and distinct value count.','name,city\nAda,London\nGrace,London',''],
  ['iso-week-calculator','utility','ISO Week Calculator','Find the ISO week number and week year for a calendar date.','2026-10-10',''],
  ['day-of-year-calculator','utility','Day of Year Calculator','Find a date’s ordinal day and days remaining in the year.','2026-10-10',''],
  ['weekday-calculator','utility','Weekday Calculator','Find the weekday for a calendar date using UTC date arithmetic.','2026-10-10',''],
  ['business-day-calculator','utility','Business Day Calculator','Count Monday to Friday dates in an inclusive date range; public holidays are not deducted.','2026-10-05, 2026-10-09',''],
  ['prime-range-generator','utility','Prime Range Generator','List prime numbers in an inclusive integer range up to one million.','10, 50',''],
  ['divisor-list-generator','utility','Divisor List Generator','List all positive divisors of a positive integer up to one trillion.','360',''],
  ['triangular-number-calculator','utility','Triangular Number Calculator','Calculate the nth triangular number exactly using big integer arithmetic.','1000000',''],
  ['distance-converter','utility','Distance Converter','Convert between metres, kilometres, miles, feet, and inches.','5 km to mi',''],
  ['speed-converter','utility','Speed Converter','Convert between metres per second, kilometres per hour, miles per hour, and knots.','60 mph to km/h',''],
  ['area-converter','utility','Area Converter','Convert between square metres, square kilometres, square feet, acres, and hectares.','2 acre to m2',''],
  ['pressure-converter','utility','Pressure Converter','Convert between pascals, kilopascals, bar, PSI, and atmospheres.','32 psi to kpa','']
];

const wordList = value => value.match(/[\p{L}\p{N}]+(?:['’][\p{L}\p{N}]+)*/gu) || [];
const lines = value => value.replace(/\r\n?/g, '\n').split('\n');
const pretty = value => JSON.stringify(value, null, 2);
const date = value => {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(value.trim());
  if (!match) throw Error('Enter a date as YYYY-MM-DD.');
  const [year, month, day] = match.slice(1).map(Number);
  const result = new Date(0); result.setUTCFullYear(year, month - 1, day); result.setUTCHours(0, 0, 0, 0);
  if (result.getUTCFullYear() !== year || result.getUTCMonth() !== month - 1 || result.getUTCDate() !== day) throw Error('Enter a valid calendar date.');
  return result;
};
const parseCsv = source => {
  const rows = []; let row = [], cell = '', quoted = false;
  for (let i = 0; i < source.length; i++) {
    const c = source[i];
    if (quoted) { if (c === '"' && source[i+1] === '"') { cell += '"'; i++; } else if (c === '"') quoted = false; else cell += c; }
    else if (c === '"') { if (cell) throw Error('A quote must start a CSV field.'); quoted = true; }
    else if (c === ',') { row.push(cell); cell = ''; }
    else if (c === '\n' || c === '\r') { if (c === '\r' && source[i+1] === '\n') i++; row.push(cell); rows.push(row); row = []; cell = ''; }
    else cell += c;
  }
  if (quoted) throw Error('CSV has an unclosed quoted field.');
  if (cell || row.length || (source && !/[\r\n]$/.test(source))) { row.push(cell); rows.push(row); }
  return rows;
};
const requireInteger = (text, min, max) => {
  if (!/^\d+$/.test(text.trim())) throw Error('Enter a positive whole number.');
  const value = Number(text.trim());
  if (!Number.isSafeInteger(value) || value < min || value > max) throw Error(`Enter an integer from ${min} to ${max}.`);
  return value;
};
const parseRange = source => {
  const match = /^\s*(\d+)\s*[,\n]\s*(\d+)\s*$/.exec(source);
  if (!match) throw Error('Enter two whole numbers separated by a comma.');
  return match.slice(1).map(Number);
};
const convert = (source, factors) => {
  const match = /^\s*([+-]?(?:\d+(?:\.\d*)?|\.\d+))\s*([\w/²]+)\s+to\s+([\w/²]+)\s*$/i.exec(source);
  if (!match) throw Error(`Use: 5 ${Object.keys(factors)[0]} to ${Object.keys(factors)[1]}`);
  const from = match[2].toLowerCase(), to = match[3].toLowerCase(), value = Number(match[1]);
  if (!(from in factors) || !(to in factors)) throw Error(`Supported units: ${Object.keys(factors).join(', ')}.`);
  return `${match[1]} ${from} = ${Number((value * factors[from] / factors[to]).toPrecision(12))} ${to}`;
};
const nato = 'Alfa Bravo Charlie Delta Echo Foxtrot Golf Hotel India Juliett Kilo Lima Mike November Oscar Papa Quebec Romeo Sierra Tango Uniform Victor Whiskey X-ray Yankee Zulu'.split(' ');
const handlers = {
  'sentence-counter': s => `Sentences: ${(s.match(/[^.!?。！？…\s][^.!?。！？…]*[.!?。！？…]+|[^.!?。！？…\s][^.!?。！？…]*$/gm) || []).length}`,
  'paragraph-counter': s => `Paragraphs: ${s.trim() ? s.trim().split(/\r?\n\s*\r?\n+/).length : 0}`,
  'text-ngram-generator': (s,p) => { const n = requireInteger(p || '2', 2, 5), words = wordList(s).map(w=>w.toLocaleLowerCase()), counts = new Map(); for(let i=0;i<=words.length-n;i++){const gram=words.slice(i,i+n).join(' ');counts.set(gram,(counts.get(gram)||0)+1);} return [...counts].sort((a,b)=>b[1]-a[1]||a[0].localeCompare(b[0])).map(([g,c])=>`${c}\t${g}`).join('\n') || 'No matching word groups.'; },
  'longest-word-finder': s => { const words=wordList(s), max=Math.max(0,...words.map(w=>[...w].length)); return `Longest length: ${max}\nWords: ${[...new Set(words.filter(w=>[...w].length===max))].join(', ') || 'None'}`; },
  'repeated-word-finder': s => {const counts=new Map();wordList(s).forEach(w=>{w=w.toLocaleLowerCase();counts.set(w,(counts.get(w)||0)+1)});return [...counts].filter(([,n])=>n>1).sort((a,b)=>b[1]-a[1]||a[0].localeCompare(b[0])).map(([w,n])=>`${w}: ${n}`).join('\n')||'No repeated words.';},
  'nato-phonetic-converter': s => [...s].map(c=>/[a-z]/i.test(c)&&c.length===1?nato[c.toUpperCase().charCodeAt(0)-65]:c).join(' '),
  'rot47-cipher': s => [...s].map(c=>{const n=c.codePointAt(0);return n>=33&&n<=126?String.fromCodePoint(33+(n-33+47)%94):c}).join(''),
  'regex-escape': s => s.replace(/[.*+?^${}()|[\]\\]/g,'\\$&'),
  'markdown-heading-outline': s => lines(s).map(line=>/^(#{1,6})[ \t]+(.+?)[ \t]*#*[ \t]*$/.exec(line)).filter(Boolean).map(m=>`${'  '.repeat(m[1].length-1)}${m[1].length}. ${m[2]}`).join('\n')||'No ATX headings found.',
  'markdown-link-extractor': s => [...s.matchAll(/(!?)\[([^\]\n]+)\]\((<[^>\n]+>|[^()\s]+)(?:\s+"[^"]*")?\)/g)].map(m=>`${m[1]?'Image':'Link'}: ${m[2]} → ${m[3].replace(/^<|>$/g,'')}`).join('\n')||'No inline links found.',
  'html-heading-extractor': s => {const doc=new DOMParser().parseFromString(s,'text/html');return [...doc.querySelectorAll('h1,h2,h3,h4,h5,h6')].map(h=>`${h.tagName}: ${h.textContent.trim()}`).join('\n')||'No headings found.';},
  'css-specificity-calculator': s => {let selector=s.trim();if(!selector)throw Error('Enter one CSS selector.');if(/[(),]/.test(selector))throw Error('Use one basic selector without functional pseudo-classes or selector lists.');const ids=(selector.match(/#[\w-]+/g)||[]).length;const classes=(selector.match(/\.[\w-]+|\[[^\]]+\]|:(?!:)[\w-]+/g)||[]).length;const types=(selector.match(/::[\w-]+/g)||[]).length;selector=selector.replace(/#[\w-]+|\.[\w-]+|\[[^\]]+\]|::?[\w-]+/g,' ');const elements=(selector.match(/(?:^|[\s>+~])([a-z][\w-]*)/gi)||[]).length;return `Specificity: ${ids}-${classes}-${types+elements}\nIDs: ${ids}\nClasses, attributes, pseudo-classes: ${classes}\nElements, pseudo-elements: ${types+elements}`;},
  'css-px-rem-converter': (s,p) => {const root=Number(p||16),m=/^\s*([+-]?(?:\d+(?:\.\d*)?|\.\d+))\s*(px|rem)\s*$/i.exec(s);if(!Number.isFinite(root)||root<=0)throw Error('Root size must be positive.');if(!m)throw Error('Enter a value such as 24px or 1.5rem.');const value=Number(m[1]);return m[2].toLowerCase()==='px'?`${value}px = ${Number((value/root).toPrecision(12))}rem`:`${value}rem = ${Number((value*root).toPrecision(12))}px`;},
  'json-key-sorter': s => {const sort=v=>Array.isArray(v)?v.map(sort):v&&typeof v==='object'?Object.fromEntries(Object.keys(v).sort().map(k=>[k,sort(v[k])])):v;return pretty(sort(JSON.parse(s)));},
  'json-flattener': s => {const out={};const walk=(v,path)=>{if(v&&typeof v==='object'&&Object.keys(v).length){for(const [k,x] of Object.entries(v))walk(x,`${path}/${k.replace(/~/g,'~0').replace(/\//g,'~1')}`)}else out[path]=v};walk(JSON.parse(s),'');return pretty(out);},
  'json-array-deduplicator': s => {const data=JSON.parse(s);if(!Array.isArray(data))throw Error('Enter a JSON array.');const canon=v=>JSON.stringify(v&&typeof v==='object'&&!Array.isArray(v)?Object.fromEntries(Object.keys(v).sort().map(k=>[k,JSON.parse(canon(v[k]))])):Array.isArray(v)?v.map(x=>JSON.parse(canon(x))):v);const seen=new Set();return pretty(data.filter(v=>{const key=canon(v);if(seen.has(key))return false;seen.add(key);return true}));},
  'csv-column-extractor': (s,p) => {const rows=parseCsv(s);if(!rows.length)throw Error('Paste CSV data.');const key=p.trim();if(!key)throw Error('Enter a column name or one-based number.');const index=/^\d+$/.test(key)?Number(key)-1:rows[0].indexOf(key);if(index<0||index>=rows[0].length)throw Error('Column not found.');return rows.map(r=>r[index]??'').join('\n');},
  'csv-row-counter': s => {const rows=parseCsv(s);return `Records: ${rows.length}\nData records (excluding first row): ${Math.max(0,rows.length-1)}\nBlank records: ${rows.filter(r=>r.every(c=>!c.trim())).length}`;},
  'csv-column-profiler': s => {const rows=parseCsv(s);if(!rows.length)throw Error('Paste CSV data.');return rows[0].map((h,i)=>`${h||`Column ${i+1}`}: ${rows.slice(1).filter(r=>(r[i]??'').trim()).length} filled, ${new Set(rows.slice(1).map(r=>r[i]??'')).size} distinct`).join('\n');},
  'iso-week-calculator': s => {const d=date(s),target=new Date(d);target.setUTCDate(d.getUTCDate()+4-(d.getUTCDay()||7));const year=target.getUTCFullYear(),start=new Date(0);start.setUTCFullYear(year,0,1);return `ISO week: ${year}-W${String(Math.ceil((((target-start)/86400000)+1)/7)).padStart(2,'0')}`;},
  'day-of-year-calculator': s => {const d=date(s),start=new Date(0);start.setUTCFullYear(d.getUTCFullYear(),0,1);const next=new Date(0);next.setUTCFullYear(d.getUTCFullYear()+1,0,1);return `Day of year: ${Math.floor((d-start)/86400000)+1}\nDays remaining: ${Math.floor((next-d)/86400000)-1}`;},
  'weekday-calculator': s => `Weekday: ${['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'][date(s).getUTCDay()]}`,
  'business-day-calculator': s => {const parts=s.split(',');if(parts.length!==2)throw Error('Enter start and end dates separated by a comma.');let start=date(parts[0]),end=date(parts[1]);if(end<start)throw Error('End date must be on or after start date.');if((end-start)/86400000>36600)throw Error('Range must be at most 100 years.');let count=0;for(let d=new Date(start);d<=end;d.setUTCDate(d.getUTCDate()+1))if(d.getUTCDay()!==0&&d.getUTCDay()!==6)count++;return `Weekdays (inclusive): ${count}\nPublic holidays are not excluded.`;},
  'prime-range-generator': s => {const [a,b]=parseRange(s);if(!Number.isSafeInteger(a)||!Number.isSafeInteger(b)||a>b||b>1000000)throw Error('Use an ascending range within 0–1,000,000.');const composite=new Uint8Array(b+1);for(let p=2;p*p<=b;p++)if(!composite[p])for(let n=p*p;n<=b;n+=p)composite[n]=1;const primes=[];for(let n=Math.max(2,a);n<=b;n++)if(!composite[n])primes.push(n);return `Count: ${primes.length}\n${primes.join(', ')}`;},
  'divisor-list-generator': s => {const n=requireInteger(s,1,1000000000000),small=[],large=[];for(let i=1;i<=Math.sqrt(n);i++)if(n%i===0){small.push(i);if(i!==n/i)large.push(n/i)}const all=small.concat(large.reverse());return `Count: ${all.length}\n${all.join(', ')}`;},
  'triangular-number-calculator': s => {if(!/^\d+$/.test(s.trim()))throw Error('Enter a nonnegative whole number.');const n=BigInt(s.trim());if(n>1000000000000000000000000n)throw Error('Enter a value up to 10²⁴.');return `T(${n}) = ${(n*(n+1n)/2n).toString()}`;},
  'distance-converter': s => convert(s,{m:1,km:1000,mi:1609.344,ft:0.3048,in:0.0254}),
  'speed-converter': s => convert(s,{'m/s':1,'km/h':1/3.6,mph:0.44704,kn:0.5144444444444445}),
  'area-converter': s => convert(s,{m2:1,km2:1000000,ft2:0.09290304,acre:4046.8564224,ha:10000}),
  'pressure-converter': s => convert(s,{pa:1,kpa:1000,bar:100000,psi:6894.757293168,atm:101325})
};

function runNewTool(slug, source, parameter='') {
  if (!handlers[slug]) throw Error('Unknown tool.');
  if (source.length > 50000) throw Error('Please use 50,000 characters or fewer.');
  return handlers[slug](source, parameter);
}

if (typeof module !== 'undefined') module.exports = {newToolDefinitions, runNewTool};
if (typeof document !== 'undefined') {
  const slug = document.body.dataset.tool;
  const definition = newToolDefinitions.find(item=>item[0]===slug);
  const input = document.querySelector('#source'), parameter=document.querySelector('#parameter'), output=document.querySelector('#output'), status=document.querySelector('#status');
  if (definition && input && output) {
    const update = () => {try {output.value=input.value?runNewTool(slug,input.value,parameter?.value||''):'';status.textContent=input.value?'Ready.':'Enter or paste input to begin.';status.className='status-note info';}catch(error){output.value='';status.textContent=error instanceof SyntaxError?'Invalid JSON: '+error.message:error.message;status.className='status-note error';}};
    input.addEventListener('input',update);parameter?.addEventListener('input',update);
    document.querySelector('#sample').addEventListener('click',()=>{input.value=definition[4];if(parameter)parameter.value=slug==='text-ngram-generator'?'2':slug==='css-px-rem-converter'?'16':slug==='csv-column-extractor'?'name':'';update();});
    document.querySelector('#clear').addEventListener('click',()=>{input.value='';output.value='';status.textContent='Enter or paste input to begin.';input.focus();});
    document.querySelector('#copy').addEventListener('click',async()=>{if(!output.value)return;await navigator.clipboard.writeText(output.value);status.textContent='Result copied.';});
    update();
  }
}
