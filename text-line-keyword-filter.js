'use strict';
function calculate(text, keyword, action, matching) {
 if(text.length>100000 || keyword.length>1000) throw new Error('Use at most 100,000 text characters and 1,000 keyword characters.');
 if(!keyword || /[\r\n]/.test(keyword)) throw new Error('Enter a nonempty, single-line keyword. Spaces are matched literally.');
 if(!['keep','exclude'].includes(action) || !['sensitive','insensitive'].includes(matching)) throw new Error('Choose valid filter options.');
 if(!text) return '';
 const rows=text.replace(/\r\n?/g,'\n').split('\n');
 if(rows.at(-1)==='') rows.pop();
 const fold=s=>matching==='insensitive'?s.toLowerCase():s;
 const needle=fold(keyword);
 const result=rows.filter(row=>fold(row).includes(needle)===(action==='keep'));
 return result.length?result.join('\n')+'\n':'';
}
const fields = ["input0","input1","input2","input3"].map(id => document.querySelector('#'+id));
const output = document.querySelector('#output'), status = document.querySelector('#status');
function update() {
  output.value = ''; status.className = 'status-note info';
  try { output.value = calculate(...fields.map(field => field.value)); status.textContent = 'Calculated locally in your browser.'; }
  catch(error) { status.textContent = error.message; status.className = 'status-note error'; }
}
fields.forEach(field => { field.addEventListener('input', update); field.addEventListener('change', update); });
document.querySelector('#sample').addEventListener('click', () => { ["ERROR connection failed\nINFO ready\nerror retrying\nWARN timeout","error","keep","insensitive"].forEach((value,i) => { fields[i].value = value; }); update(); });
document.querySelector('#clear').addEventListener('click', () => { fields[0].value = '';  output.value = ''; status.textContent = 'Enter values to calculate.'; status.className = 'status-note info'; fields[0].focus(); });
document.querySelector('#copy').addEventListener('click', async () => { if (!output.value) return; try { await navigator.clipboard.writeText(output.value); status.textContent = 'Result copied.'; } catch { status.textContent = 'Copy unavailable. Select and copy the result manually.'; } });
update();
