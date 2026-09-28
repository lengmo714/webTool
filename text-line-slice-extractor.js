'use strict';
function calculate(text, first, last) {
 if(text.length>100000) throw new Error('Text is limited to 100,000 characters.');
 const parse=s=>{if(!/^[1-9]\d*$/.test(s.trim()) || !Number.isSafeInteger(Number(s))) throw new Error('Enter positive safe integer line numbers.'); return Number(s);};
 const start=parse(first),end=parse(last);
 if(end<start) throw new Error('Last line must be at least the first line.');
 if(!text) return '';
 const rows=text.replace(/\r\n?/g,'\n').split('\n');
 if(rows.at(-1)==='') rows.pop();
 const result=rows.slice(start-1,end);
 return result.length?result.join('\n')+'\n':'';
}
const fields = ["input0","input1","input2"].map(id => document.querySelector('#'+id));
const output = document.querySelector('#output'), status = document.querySelector('#status');
function update() {
  output.value = ''; status.className = 'status-note info';
  try { output.value = calculate(...fields.map(field => field.value)); status.textContent = 'Calculated locally in your browser.'; }
  catch(error) { status.textContent = error.message; status.className = 'status-note error'; }
}
fields.forEach(field => { field.addEventListener('input', update); field.addEventListener('change', update); });
document.querySelector('#sample').addEventListener('click', () => { ["alpha\nbeta\ngamma\ndelta","2","3"].forEach((value,i) => { fields[i].value = value; }); update(); });
document.querySelector('#clear').addEventListener('click', () => { fields[0].value = '';  output.value = ''; status.textContent = 'Enter values to calculate.'; status.className = 'status-note info'; fields[0].focus(); });
document.querySelector('#copy').addEventListener('click', async () => { if (!output.value) return; try { await navigator.clipboard.writeText(output.value); status.textContent = 'Result copied.'; } catch { status.textContent = 'Copy unavailable. Select and copy the result manually.'; } });
update();
