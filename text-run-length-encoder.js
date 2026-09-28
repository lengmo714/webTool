'use strict';
function calculate(text, mode) {
 if(text.length>2000000) throw new Error('Encoded input is limited to 2,000,000 characters.');
 if(mode==='encode') {
 if(text.length>100000) throw new Error('Text is limited to 100,000 characters.');
 const pairs=[];
 for(const char of text){const last=pairs.at(-1);if(last&&last[0]===char) last[1]++;else pairs.push([char,1]);}
 return JSON.stringify(pairs);
 }
 if(mode!=='decode') throw new Error('Select encode or decode.');
 let pairs;try{pairs=JSON.parse(text);}catch{throw new Error('Enter a valid JSON array of character/count pairs.');}
 if(!Array.isArray(pairs)) throw new Error('Expected an array of pairs.');
 let size=0;const result=[];
 for(const pair of pairs){
 if(!Array.isArray(pair)||pair.length!==2||typeof pair[0]!=='string'||[...pair[0]].length!==1||!Number.isSafeInteger(pair[1])||pair[1]<1) throw new Error('Each pair needs one Unicode code point and a positive integer count.');
 size+=pair[0].length*pair[1];if(size>100000) throw new Error('Decoded output is limited to 100,000 characters.');
 result.push(pair[0].repeat(pair[1]));
 }
 return result.join('');
}
const fields = ["input0","input1"].map(id => document.querySelector('#'+id));
const output = document.querySelector('#output'), status = document.querySelector('#status');
function update() {
  output.value = ''; status.className = 'status-note info';
  try { output.value = calculate(...fields.map(field => field.value)); status.textContent = 'Calculated locally in your browser.'; }
  catch(error) { status.textContent = error.message; status.className = 'status-note error'; }
}
fields.forEach(field => { field.addEventListener('input', update); field.addEventListener('change', update); });
document.querySelector('#sample').addEventListener('click', () => { ["aaabb😀😀","encode"].forEach((value,i) => { fields[i].value = value; }); update(); });
document.querySelector('#clear').addEventListener('click', () => { fields[0].value = '';  output.value = ''; status.textContent = 'Enter values to calculate.'; status.className = 'status-note info'; fields[0].focus(); });
document.querySelector('#copy').addEventListener('click', async () => { if (!output.value) return; try { await navigator.clipboard.writeText(output.value); status.textContent = 'Result copied.'; } catch { status.textContent = 'Copy unavailable. Select and copy the result manually.'; } });
update();

