'use strict';
function solve(n) {
  if(n < 2n) return n;
  let x = 1n << BigInt(Math.ceil(n.toString(2).length / 2));
  while(true) { const y = (x + n / x) / 2n; if(y >= x) return x; x = y; }
}
function calculate(text) {
  if(!/^\d{1,1000}$/.test(text.trim())) throw new Error('Enter a nonnegative whole number with up to 1000 digits.');
  const n=BigInt(text.trim()), r=solve(n);
  return 'Floor square root: '+r+'\nRoot squared: '+r*r+'\nRemainder: '+(n-r*r)+'\nNext square: '+((r+1n)*(r+1n))+'\nPerfect square: '+(r*r===n?'Yes':'No');
}
const fields = ["number"].map(id => document.querySelector('#'+id));
const output = document.querySelector('#output'), status = document.querySelector('#status');
function update() {
  output.value = ''; status.className = 'status-note info';
  try { output.value = calculate(...fields.map(field => field.value)); status.textContent = 'Calculated locally in your browser.'; }
  catch(error) { status.textContent = error.message; status.className = 'status-note error'; }
}
fields.forEach(field => { field.addEventListener('input', update); field.addEventListener('change', update); });
document.querySelector('#sample').addEventListener('click', () => { ["15241578750190521"].forEach((value,i) => { fields[i].value = value; }); update(); });
document.querySelector('#clear').addEventListener('click', () => { fields.forEach(field => { field.value = ''; }); output.value = ''; status.textContent = 'Enter values to calculate.'; status.className = 'status-note info'; fields[0].focus(); });
document.querySelector('#copy').addEventListener('click', async () => { if (!output.value) return; try { await navigator.clipboard.writeText(output.value); status.textContent = 'Result copied.'; } catch { status.textContent = 'Copy unavailable. Select and copy the result manually.'; } });
update();
