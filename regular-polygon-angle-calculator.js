'use strict';
function calculate(text) {
  if (!/^\d{1,7}$/.test(text.trim())) throw new Error('Enter a whole side count from 3 to 1,000,000.');
  const n=BigInt(text.trim());
  if(n<3n || n>1000000n) throw new Error('Enter a whole side count from 3 to 1,000,000.');
  function angle(p,q) { let a=p,b=q; while(b) [a,b]=[b,a%b]; const exact=q/a===1n?String(p/a):p/a+'/'+(q/a); return exact+'°'+(q/a===1n?'':' (≈ '+(Number(p)/Number(q)).toFixed(6)+'°)'); }
  return 'Interior angle: '+angle((n-2n)*180n,n)+'\nExterior angle: '+angle(360n,n)+'\nCentral angle: '+angle(360n,n)+'\nInterior angle sum: '+((n-2n)*180n)+'°\nDiagonals: '+(n*(n-3n)/2n);
}

const fields = ["sides"].map(id => document.querySelector('#'+id));
const output = document.querySelector('#output'), status = document.querySelector('#status');
function update() {
  output.value = ''; status.className = 'status-note info';
  try { output.value = calculate(...fields.map(field => field.value)); status.textContent = 'Calculated locally in your browser.'; }
  catch(error) { status.textContent = error.message; status.className = 'status-note error'; }
}
fields.forEach(field => { field.addEventListener('input', update); field.addEventListener('change', update); });
document.querySelector('#sample').addEventListener('click', () => { ["6"].forEach((value,i) => { fields[i].value = value; }); update(); });
document.querySelector('#clear').addEventListener('click', () => { fields.forEach(field => { field.value = ''; }); output.value = ''; status.textContent = 'Enter values to calculate.'; status.className = 'status-note info'; fields[0].focus(); });
document.querySelector('#copy').addEventListener('click', async () => { if (!output.value) return; try { await navigator.clipboard.writeText(output.value); status.textContent = 'Result copied.'; } catch { status.textContent = 'Copy unavailable. Select and copy the result manually.'; } });
update();
