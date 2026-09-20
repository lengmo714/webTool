const id = document.body.dataset.tool;
const catalog = {
  'age-calculator':['Age Calculator','Calculate your age from a birth date and see the result in years, months, and days.','Enter birth date, then press Calculate.'],
  'bmi-calculator':['BMI Calculator','Calculate body mass index from height and weight with a clear healthy-range reference.','Enter height in cm and weight in kg.'],
  'tip-calculator':['Tip Calculator','Calculate a tip, total bill, and per-person split from a bill amount and party size.','Enter bill, tip percentage, and people separated by commas.'],
  'discount-calculator':['Discount Calculator','Calculate sale price and savings from an original price and discount percentage.','Enter price and discount percentage separated by a comma.'],
  'sales-tax-calculator':['Sales Tax Calculator','Add sales tax to a price and see the tax amount and final total.','Enter price and tax percentage separated by a comma.'],
  'compound-interest-calculator':['Compound Interest Calculator','Estimate compound growth from principal, rate, years, and compounding frequency.','Enter principal, annual rate, years, frequency separated by commas.'],
  'simple-interest-calculator':['Simple Interest Calculator','Calculate simple interest and the final balance from principal, rate, and time.','Enter principal, annual rate, and years separated by commas.'],
  'ratio-simplifier':['Ratio Simplifier','Reduce a ratio to its simplest whole-number form.','Enter two numbers separated by a colon or comma.'],
  'average-calculator':['Average Calculator','Calculate the count, sum, and arithmetic mean of a list of numbers.','Enter numbers separated by commas or new lines.'],
  'median-mode-calculator':['Median and Mode Calculator','Find the median, mode, range, and sorted values for a number list.','Enter numbers separated by commas or new lines.'],
  'prime-checker':['Prime Number Checker','Check whether an integer is prime and see its factors when it is not.','Enter a whole number.'],
  'prime-factorization':['Prime Factorization','Break a positive integer into its prime factors.','Enter a positive whole number.'],
  'perfect-number-checker':['Perfect Number Checker','Check whether a number equals the sum of its proper divisors.','Enter a positive whole number.'],
  'fibonacci-generator':['Fibonacci Generator','Generate the first N Fibonacci numbers in your browser.','Enter the number of terms to generate.'],
  'random-number-generator':['Random Number Generator','Generate a random integer between a minimum and maximum value.','Enter minimum and maximum separated by a comma.'],
  'text-reverser':['Text Reverser','Reverse characters, words, or lines in pasted text.','Paste text to reverse.'],
  'remove-punctuation':['Remove Punctuation','Remove punctuation marks while preserving letters, numbers, spaces, and line breaks.','Paste text to clean.'],
  'whitespace-visualizer':['Whitespace Visualizer','Make spaces, tabs, and line breaks visible so formatting issues are easy to spot.','Paste text to inspect.'],
  'newline-to-comma':['Newline to Comma Converter','Turn a line-separated list into a comma-separated list.','Paste one item per line.'],
  'comma-to-newline':['Comma to Newline Converter','Turn comma-separated values into one item per line.','Paste comma-separated values.'],
  'extract-numbers':['Number Extractor','Extract every integer or decimal number from a block of text.','Paste text containing numbers.'],
  'extract-urls':['URL Extractor','Find and list HTTP, HTTPS, and www URLs in pasted text.','Paste text containing links.'],
  'extract-hashtags':['Hashtag Extractor','Extract unique hashtags from social copy while preserving their original spelling.','Paste text containing hashtags.'],
  'text-trimmer':['Text Trimmer','Trim leading and trailing whitespace from every line of pasted text.','Paste text to trim.'],
  'word-capitalizer':['Word Capitalizer','Capitalize the first letter of every word while keeping the rest readable.','Paste text to capitalize.'],
  'palindrome-checker':['Palindrome Checker','Check whether text reads the same forward and backward after normalization.','Enter a word or phrase.'],
  'anagram-checker':['Anagram Checker','Check whether two phrases contain the same letters.','Enter two phrases separated by a new line.'],
  'alphabetize-words':['Alphabetize Words','Sort words alphabetically and remove optional duplicate entries.','Enter words separated by spaces or new lines.'],
  'count-lines':['Line Counter','Count total, non-empty, and unique lines in pasted text.','Paste one item per line.'],
  'count-vowels-consonants':['Vowel and Consonant Counter','Count vowels, consonants, digits, spaces, and punctuation in text.','Paste text to analyze.'],
  'json-to-yaml':['JSON to YAML Converter','Convert a JSON object or array into readable YAML without uploading your data.','Paste valid JSON.'],
  'yaml-to-json':['YAML to JSON Notes','Turn simple key-value YAML into JSON for quick configuration experiments.','Enter simple key: value lines.'],
  'html-minifier':['HTML Minifier','Remove comments and unnecessary whitespace from an HTML snippet.','Paste HTML to minify.'],
  'css-minifier':['CSS Minifier','Minify CSS by removing comments, line breaks, and redundant whitespace.','Paste CSS to minify.'],
  'javascript-minifier':['JavaScript Minifier','Apply a conservative whitespace cleanup to JavaScript snippets.','Paste JavaScript to minify.'],
  'url-parser':['URL Parser','Inspect the protocol, host, path, query, hash, and origin of a URL.','Enter an absolute URL.'],
  'query-string-builder':['Query String Builder','Build an encoded query string from one key=value pair per line.','Enter key=value pairs, one per line.'],
  'html-tag-stripper':['HTML Tag Stripper','Remove HTML tags and decode the most common entities from markup.','Paste HTML to extract readable text.'],
  'color-hex-validator':['HEX Color Validator','Validate HEX color notation and normalize shorthand colors to six digits.','Enter a HEX color such as #09f.'],
  'rgb-to-hex':['RGB to HEX Converter','Convert red, green, and blue channel values into a CSS HEX color.','Enter R, G, B values separated by commas.'],
  'hsl-to-hex':['HSL to HEX Converter','Convert hue, saturation, and lightness into a CSS HEX color.','Enter H, S%, L% separated by commas.'],
  'decimal-to-fraction':['Decimal to Fraction Converter','Convert a terminating decimal into a reduced fraction.','Enter a decimal number.'],
  'fraction-to-decimal':['Fraction to Decimal Converter','Convert a fraction into a decimal and percentage.','Enter numerator/denominator.'],
  'binary-to-decimal':['Binary to Decimal Converter','Convert binary, decimal, hexadecimal, and octal values with clear output.','Enter a binary number.'],
  'decimal-to-binary':['Decimal to Binary Converter','Convert a whole number into binary, hexadecimal, and octal representations.','Enter a whole number.'],
  'modulo-calculator':['Modulo Calculator','Calculate the remainder of one integer divided by another.','Enter dividend and divisor separated by a comma.'],
  'power-calculator':['Power Calculator','Calculate a number raised to an exponent with a precise result.','Enter base and exponent separated by a comma.'],
  'logarithm-calculator':['Logarithm Calculator','Calculate natural, common, or custom-base logarithms.','Enter value and base separated by a comma.'],
  'date-addition-calculator':['Date Addition Calculator','Add or subtract days from a calendar date and get the resulting date.','Enter YYYY-MM-DD and signed days separated by a comma.'],
  'iso-date-converter':['ISO Date Converter','Convert a date and time into a normalized ISO 8601 string.','Enter a date or date-time value.'],
  'seconds-to-time':['Seconds to Time Converter','Convert a number of seconds into days, hours, minutes, and seconds.','Enter a number of seconds.'],
  'random-string-generator':['Random String Generator','Generate a random alphanumeric string of a chosen length.','Enter a length from 1 to 200.'],
  'slug-word-counter':['Slug Word Counter','Count words and characters in a URL slug, excluding separators.','Enter a URL slug.']
};
const [name, desc, hint] = catalog[id] || ['Browser Tool','Process your input instantly in this browser tab.','Enter or paste a value.'];
document.title = `${name} | Tool Home`;
document.querySelector('#tool-name').textContent = name;
document.querySelector('#tool-description').textContent = desc;
const input = document.querySelector('#text'); const result = document.querySelector('#result');
input.placeholder = hint; result.style.display='block';
const nums = s => (s.match(/-?\d+(?:\.\d+)?/g)||[]).map(Number);
const ints = s => nums(s).map(Math.trunc);
const fmt = n => Number.isFinite(n) ? String(Number(n.toFixed(10))) : 'Invalid input';
function process(){ const x=input.value, n=nums(x), a=x.split(/\r?\n/); let out='';
  if(id==='age-calculator'){const d=new Date(x); if(Number.isNaN(d.getTime())) out='Enter a valid birth date.'; else {const now=new Date(); let y=now.getFullYear()-d.getFullYear(),m=now.getMonth()-d.getMonth(),day=now.getDate()-d.getDate(); if(day<0){m--;day+=new Date(now.getFullYear(),now.getMonth(),0).getDate()} if(m<0){y--;m+=12} out=`Age: ${y} years, ${m} months, ${day} days`;}}
  else if(id==='bmi-calculator'){const [h,w]=n; const bmi=w/((h/100)**2); out=h&&w?`BMI: ${fmt(bmi)}\nReference range: ${bmi<18.5?'Underweight':bmi<25?'Healthy range':bmi<30?'Overweight':'Obesity range'}`:'Enter height and weight.';}
  else if(['tip-calculator','discount-calculator','sales-tax-calculator'].includes(id)){const [p,r=0,people=1]=n; if(!Number.isFinite(p)) out='Enter numeric values.'; else if(id==='tip-calculator'){const tip=p*r/100;out=`Tip: ${fmt(tip)}\nTotal: ${fmt(p+tip)}\nPer person: ${fmt((p+tip)/Math.max(1,people))}`;} else {const amount=id==='discount-calculator'?p*(1-r/100):p*(1+r/100);out=`Result: ${fmt(amount)}\n${id==='discount-calculator'?'Savings':'Tax'}: ${fmt(Math.abs(amount-p))}`;}}
  else if(id==='compound-interest-calculator'){const [p,r,t,f=12]=n;out=`Final amount: ${fmt(p*Math.pow(1+r/100/f,f*t))}\nInterest earned: ${fmt(p*(Math.pow(1+r/100/f,f*t)-1))}`;}
  else if(id==='simple-interest-calculator'){const [p,r,t]=n;out=`Interest: ${fmt(p*r*t/100)}\nFinal amount: ${fmt(p*(1+r*t/100))}`;}
  else if(id==='ratio-simplifier'){const [x1,x2]=n;let g=(a,b)=>b?g(b,a%b):Math.abs(a);const d=g(x1,x2);out=d?`${x1/d}:${x2/d}`:'Enter two numbers.';}
  else if(['average-calculator','median-mode-calculator'].includes(id)){const v=n.filter(Number.isFinite).sort((a,b)=>a-b);const sum=v.reduce((a,b)=>a+b,0);if(id==='average-calculator')out=`Count: ${v.length}\nSum: ${fmt(sum)}\nAverage: ${fmt(sum/v.length)}`;else {const med=v.length%2?v[(v.length-1)/2]:(v[v.length/2-1]+v[v.length/2])/2;const counts={};v.forEach(q=>counts[q]=(counts[q]||0)+1);const max=Math.max(...Object.values(counts));out=`Median: ${fmt(med)}\nMode: ${max>1?Object.keys(counts).filter(q=>counts[q]===max).join(', '):'No mode'}\nRange: ${fmt(v[v.length-1]-v[0])}`;}}
  else if(id==='prime-checker'||id==='prime-factorization'||id==='perfect-number-checker'){let q=Math.abs(ints(x)[0]), f=[];for(let i=1;i<=q;i++)if(q%i===0)f.push(i); if(id==='prime-checker')out=q>1&&f.length===2?`${q} is prime.`:`${q} is not prime. Factors: ${f.join(', ')}`;else if(id==='prime-factorization'){let z=q,p=[],d=2;while(z>1){while(z%d===0){p.push(d);z/=d}d++}out=p.join(' × ')||'Enter a positive integer.';}else out=f.length>0&&f.reduce((a,b)=>a+b,0)-q===q?`${q} is perfect.`:`${q} is not perfect.`;}
  else if(id==='fibonacci-generator'){let q=Math.max(0,Math.min(500,ints(x)[0]||0)), f=[0,1];while(f.length<q)f.push(f.at(-1)+f.at(-2));out=f.slice(0,q).join(', ');}
  else if(id==='random-number-generator'){const [lo,hi]=ints(x);out=Number.isFinite(lo)&&Number.isFinite(hi)?String(Math.floor(Math.random()*(Math.abs(hi-lo)+1))+Math.min(lo,hi)):'Enter two integers.';}
  else if(id==='text-reverser')out=x.split('').reverse().join('');
  else if(id==='remove-punctuation')out=x.replace(/[^\p{L}\p{N}\s]/gu,'');
  else if(id==='whitespace-visualizer')out=x.replace(/ /g,'·').replace(/\t/g,'→→').replace(/\r?\n/g,'↵\n');
  else if(id==='newline-to-comma')out=a.join(', '); else if(id==='comma-to-newline')out=x.split(',').map(q=>q.trim()).join('\n');
  else if(id==='extract-numbers')out=(x.match(/-?\d+(?:\.\d+)?/g)||[]).join('\n'); else if(id==='extract-urls')out=(x.match(/https?:\/\/[^\s]+|www\.[^\s]+/gi)||[]).join('\n'); else if(id==='extract-hashtags')out=[...new Set(x.match(/#[\p{L}\p{N}_-]+/gu)||[])].join('\n');
  else if(id==='text-trimmer')out=a.map(q=>q.trim()).join('\n'); else if(id==='word-capitalizer')out=x.toLowerCase().replace(/\b\p{L}/gu,c=>c.toUpperCase()); else if(id==='palindrome-checker'){const q=x.toLowerCase().replace(/[^\p{L}\p{N}]/gu,'');out=q===q.split('').reverse().join('')?'Palindrome':'Not a palindrome';} else if(id==='anagram-checker'){const [p,q]=a; const clean=v=>(v||'').toLowerCase().replace(/[^\p{L}\p{N}]/gu,'').split('').sort().join('');out=clean(p)===clean(q)?'Anagrams':'Not anagrams';}
  else if(id==='alphabetize-words')out=[...new Set(x.split(/[\s,]+/).filter(Boolean))].sort((a,b)=>a.localeCompare(b)).join('\n'); else if(id==='count-lines')out=`Total lines: ${a.length}\nNon-empty lines: ${a.filter(q=>q.trim()).length}\nUnique lines: ${new Set(a).size}`; else if(id==='count-vowels-consonants')out=`Vowels: ${(x.match(/[aeiou]/gi)||[]).length}\nConsonants: ${(x.match(/[b-df-hj-np-tv-z]/gi)||[]).length}\nDigits: ${(x.match(/\d/g)||[]).length}`;
  else if(id==='json-to-yaml'){try{const o=JSON.parse(x);out=Object.entries(o).map(([k,v])=>`${k}: ${typeof v==='object'?JSON.stringify(v):v}`).join('\n')}catch{out='Invalid JSON.';}} else if(id==='yaml-to-json'){const o={};a.forEach(q=>{const m=q.match(/^\s*([^:#]+):\s*(.*)$/);if(m)o[m[1].trim()]=m[2].trim()});out=JSON.stringify(o,null,2);}
  else if(['html-minifier','css-minifier','javascript-minifier'].includes(id))out=x.replace(/\/\*[\s\S]*?\*\/|<!--[\s\S]*?-->/g,'').replace(/\s+/g,' ').replace(/\s*([{};,:>])\s*/g,'$1').trim(); else if(id==='url-parser'){try{const u=new URL(x);out=`Protocol: ${u.protocol}\nHost: ${u.host}\nPath: ${u.pathname}\nQuery: ${u.search}\nHash: ${u.hash}\nOrigin: ${u.origin}`}catch{out='Enter a valid absolute URL.';}} else if(id==='query-string-builder')out='?'+a.filter(q=>q.includes('=')).map(q=>q.split('=').map(encodeURIComponent).join('=')).join('&'); else if(id==='html-tag-stripper')out=x.replace(/<[^>]*>/g,'').replace(/&amp;/g,'&').replace(/&lt;/g,'<').replace(/&gt;/g,'>');
  else if(id==='color-hex-validator'){const q=x.trim().replace(/^#/,'');out=/^[0-9a-f]{3,6}$/i.test(q)?`Valid HEX: #${q.length===3?q.split('').map(c=>c+c).join(''):q.toLowerCase()}`:'Invalid HEX color.';} else if(id==='rgb-to-hex'){const [r,g,b]=ints(x);out=[r,g,b].every(q=>q>=0&&q<=255)?'#'+[r,g,b].map(q=>q.toString(16).padStart(2,'0')).join(''):'Enter RGB values from 0 to 255.';} else if(id==='hsl-to-hex'){let [h,s,l]=n;s/=100;l/=100;const k=t=>(t+h/30)%12;const a=s*Math.min(l,1-l);const f=t=>l-a*Math.max(-1,Math.min(k(t)-3,Math.min(9-k(t),1)));out='#'+[f(0),f(8),f(4)].map(q=>Math.round(255*q).toString(16).padStart(2,'0')).join('');}
  else if(id==='decimal-to-fraction'){const q=String(n[0]);const d=(q.split('.')[1]||'').length, den=10**d;let num=Math.round(n[0]*den),g=(a,b)=>b?g(b,a%b):Math.abs(a);const z=g(num,den);out=`${num/z}/${den/z}`;} else if(id==='fraction-to-decimal'){const [p,q]=n;out=`Decimal: ${fmt(p/q)}\nPercent: ${fmt(p/q*100)}%`;} else if(id==='binary-to-decimal'){const q=x.trim();const d=parseInt(q,2);out=Number.isFinite(d)?`Decimal: ${d}\nHex: ${d.toString(16).toUpperCase()}\nOctal: ${d.toString(8)}`:'Invalid binary.';} else if(id==='decimal-to-binary'){const q=ints(x)[0];out=Number.isFinite(q)?`Binary: ${q.toString(2)}\nHex: ${q.toString(16).toUpperCase()}\nOctal: ${q.toString(8)}`:'Enter an integer.';} else if(id==='modulo-calculator'){const [p,q]=ints(x);out=q?String(p%q):'Divisor cannot be zero.';} else if(id==='power-calculator'){const [p,q]=n;out=fmt(Math.pow(p,q));} else if(id==='logarithm-calculator'){const [v,b]=n;out=fmt(Math.log(v)/Math.log(b||10));} else if(id==='date-addition-calculator'){const [d,days]=x.split(',').map(q=>q.trim());const z=new Date(d);z.setDate(z.getDate()+Number(days));out=Number.isNaN(z.getTime())?'Invalid date.':z.toISOString().slice(0,10);} else if(id==='iso-date-converter'){const z=new Date(x);out=Number.isNaN(z.getTime())?'Invalid date.':z.toISOString();} else if(id==='seconds-to-time'){let q=Math.max(0,ints(x)[0]||0),d=Math.floor(q/86400);q%=86400;const h=Math.floor(q/3600);q%=3600;const m=Math.floor(q/60);out=`${d} days, ${h} hours, ${m} minutes, ${q%60} seconds`;} else if(id==='random-string-generator'){const q=Math.max(1,Math.min(200,ints(x)[0]||16)), chars='ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz23456789';out=Array.from({length:q},()=>chars[Math.floor(Math.random()*chars.length)]).join('');} else if(id==='slug-word-counter'){const q=x.trim().split('-').filter(Boolean);out=`Words: ${q.length}\nCharacters: ${x.length}`;}
  result.textContent=out||'Your result will appear here.';
}
input.addEventListener('input',process); process();
document.querySelector('[data-action="clear"]').addEventListener('click',()=>{input.value='';process();input.focus();});
document.querySelector('[data-action="copy"]').addEventListener('click',async e=>{await navigator.clipboard?.writeText(result.textContent);e.target.textContent='Copied ✓';setTimeout(()=>e.target.textContent='Copy result',1200);});
