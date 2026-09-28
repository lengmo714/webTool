'use strict';
function solve(n) {
  let total=0n, power=5n; const terms=[];
  while(power<=n) { const count=n/power; total+=count; terms.push([power,count]); power*=5n; }
  return {total,terms};
}
function calculate(text) {
  if(!/^\d{1,101}$/.test(text.trim())) throw new Error('Enter a whole number from 0 through 10^100.');
  const n=BigInt(text.trim()); if(n>10n**100n) throw new Error('Enter a whole number from 0 through 10^100.');
  const {total,terms}=solve(n);
  return 'Trailing decimal zeros in '+n+'!: '+total+'\n\nPowers of five breakdown:\n'+(terms.length?terms.map(([p,c])=>'floor(n / '+p+') = '+c).join('\n'):'No factors of five; zero trailing zeros.');
}
const fields = ["number"].map(id => document.querySelector('#'+id));
const output = document.querySelector('#output'), status = document.querySelector('#status');
function update() {
  output.value = ''; status.className = 'status-note info';
  try { output.value = calculate(...fields.map(field => field.value)); status.textContent = 'Calculated locally in your browser.'; }
  catch(error) { status.textContent = error.message; status.className = 'status-note error'; }
}
fields.forEach(field => { field.addEventListener('input', update); field.addEventListener('change', update); });
document.querySelector('#sample').addEventListener('click', () => { ["100"].forEach((value,i) => { fields[i].value = value; }); update(); });
document.querySelector('#clear').addEventListener('click', () => { fields.forEach(field => { field.value = ''; }); output.value = ''; status.textContent = 'Enter values to calculate.'; status.className = 'status-note info'; fields[0].focus(); });
document.querySelector('#copy').addEventListener('click', async () => { if (!output.value) return; try { await navigator.clipboard.writeText(output.value); status.textContent = 'Result copied.'; } catch { status.textContent = 'Copy unavailable. Select and copy the result manually.'; } });
update();
