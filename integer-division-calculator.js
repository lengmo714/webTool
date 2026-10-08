'use strict';
function calculate(a,b,mode) {
 function parse(s) { s=s.trim(); if(!/^[+-]?\d{1,1000}$/.test(s)) throw new Error('Enter signed decimal integers of at most 1,000 digits.'); return BigInt(s); }
 const x=parse(a),y=parse(b); if(y===0n) throw new Error('The divisor must not be zero.');
 if(!['truncate','euclidean'].includes(mode)) throw new Error('Choose a division convention.');
 let q=x/y,r=x%y;
 if(mode==='euclidean' && r<0n) { r+=y<0n?-y:y; q-=y<0n?-1n:1n; }
 return 'Quotient: '+q+'\nRemainder: '+r+'\n\nIdentity: '+x+' = ('+y+') × ('+q+') + ('+r+')';
}
const fields = ["input0","input1","input2"].map(id => document.querySelector('#'+id));
const output = document.querySelector('#output'), status = document.querySelector('#status');
function update() {
  output.value = ''; status.className = 'status-note info';
  try { output.value = calculate(...fields.map(field => field.value)); status.textContent = 'Calculated locally in your browser.'; }
  catch(error) { status.textContent = error.message; status.className = 'status-note error'; }
}
fields.forEach(field => { field.addEventListener('input', update); field.addEventListener('change', update); });
document.querySelector('#sample').addEventListener('click', () => { ["-123456789012345678901","97","truncate"].forEach((value,i) => { fields[i].value = value; }); update(); });
document.querySelector('#clear').addEventListener('click', () => { fields[0].value = ''; fields[1].value = '';  output.value = ''; status.textContent = 'Enter values to calculate.'; status.className = 'status-note info'; fields[0].focus(); });
document.querySelector('#copy').addEventListener('click', async () => { if (!output.value) return; try { await navigator.clipboard.writeText(output.value); status.textContent = 'Result copied.'; } catch { status.textContent = 'Copy unavailable. Select and copy the result manually.'; } });
update();
