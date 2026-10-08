'use strict';
function calculate(text) {
 if(text.length>200000) throw new Error('Input is limited to 200,000 UTF-16 code units.');
 if(text==='') throw new Error('Enter at least one text line.');
 const lines=text.replace(/\r\n?/g,'\n').split('\n');
 let prefix=Array.from(lines[0]);
 for(let i=1;i<lines.length && prefix.length;i++) { const chars=Array.from(lines[i]); let n=0; while(n<prefix.length && n<chars.length && prefix[n]===chars[n]) n++; prefix.length=n; }
 const shared=prefix.join('');
 return 'Common prefix (JSON): '+JSON.stringify(shared)+'\nPrefix code points: '+prefix.length+'\nLines: '+lines.length+'\n\nLines without prefix:\n'+lines.map(line=>line.slice(shared.length)).join('\n');
}
const fields = ["input0"].map(id => document.querySelector('#'+id));
const output = document.querySelector('#output'), status = document.querySelector('#status');
function update() {
  output.value = ''; status.className = 'status-note info';
  try { output.value = calculate(...fields.map(field => field.value)); status.textContent = 'Calculated locally in your browser.'; }
  catch(error) { status.textContent = error.message; status.className = 'status-note error'; }
}
fields.forEach(field => { field.addEventListener('input', update); field.addEventListener('change', update); });
document.querySelector('#sample').addEventListener('click', () => { ["project/src/main.js\nproject/src/app.js\nproject/src/style.css"].forEach((value,i) => { fields[i].value = value; }); update(); });
document.querySelector('#clear').addEventListener('click', () => { fields[0].value = '';  output.value = ''; status.textContent = 'Enter values to calculate.'; status.className = 'status-note info'; fields[0].focus(); });
document.querySelector('#copy').addEventListener('click', async () => { if (!output.value) return; try { await navigator.clipboard.writeText(output.value); status.textContent = 'Result copied.'; } catch { status.textContent = 'Copy unavailable. Select and copy the result manually.'; } });
update();
