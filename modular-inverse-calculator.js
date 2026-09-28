'use strict';
function calculate(aText, mText) {
  const parse = text => { if (!/^[+-]?\d{1,200}$/.test(text.trim())) throw new Error('Enter integers of at most 200 digits.'); return BigInt(text.trim()); };
  const a = parse(aText), m = parse(mText);
  if (m <= 1n) throw new Error('Modulus must be greater than 1.');
  const residue = ((a % m) + m) % m;
  let r=m, next=residue, t=0n, nextT=1n;
  while(next !== 0n) { const q=r/next; [r,next]=[next,r-q*next]; [t,nextT]=[nextT,t-q*nextT]; }
  if(r !== 1n) return 'No modular inverse exists.\nGCD: '+r+'\nThe integer and modulus must be coprime.';
  const x=((t%m)+m)%m;
  return 'Modular inverse: '+x+'\nNormalized integer: '+residue+'\nGCD: 1\nVerification: '+residue+' × '+x+' = '+((residue*x-1n)/m)+' × '+m+' + 1';
}

const fields = ["number","modulus"].map(id => document.querySelector('#'+id));
const output = document.querySelector('#output'), status = document.querySelector('#status');
function update() {
  output.value = ''; status.className = 'status-note info';
  try { output.value = calculate(...fields.map(field => field.value)); status.textContent = 'Calculated locally in your browser.'; }
  catch(error) { status.textContent = error.message; status.className = 'status-note error'; }
}
fields.forEach(field => { field.addEventListener('input', update); field.addEventListener('change', update); });
document.querySelector('#sample').addEventListener('click', () => { ["3","11"].forEach((value,i) => { fields[i].value = value; }); update(); });
document.querySelector('#clear').addEventListener('click', () => { fields.forEach(field => { field.value = ''; }); output.value = ''; status.textContent = 'Enter values to calculate.'; status.className = 'status-note info'; fields[0].focus(); });
document.querySelector('#copy').addEventListener('click', async () => { if (!output.value) return; try { await navigator.clipboard.writeText(output.value); status.textContent = 'Result copied.'; } catch { status.textContent = 'Copy unavailable. Select and copy the result manually.'; } });
update();
