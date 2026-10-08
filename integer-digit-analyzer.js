'use strict';
function calculate(text) {
 const value=text.trim();
 if(value.length>100001) throw new Error('Input is limited to 100,000 digits.');
 if(!/^[+-]?\d+$/.test(value)) throw new Error('Enter a decimal integer with an optional plus or minus sign.');
 const digits=value.replace(/^[+-]/,'');
 if(digits.length>100000) throw new Error('Input is limited to 100,000 digits.');
 const counts=Array(10).fill(0); let sum=0;
 for(const digit of digits) { const n=Number(digit); counts[n]++; sum+=n; }
 const root=sum===0?0:1+(sum-1)%9;
 return 'Digit count: '+digits.length+'\nDigit sum: '+sum+'\nDigital root: '+root+'\n\nDigit frequencies\n'+counts.map((n,i)=>i+': '+n).join('\n');
}
const fields = ["input0"].map(id => document.querySelector('#'+id));
const output = document.querySelector('#output'), status = document.querySelector('#status');
function update() {
  output.value = ''; status.className = 'status-note info';
  try { output.value = calculate(...fields.map(field => field.value)); status.textContent = 'Calculated locally in your browser.'; }
  catch(error) { status.textContent = error.message; status.className = 'status-note error'; }
}
fields.forEach(field => { field.addEventListener('input', update); field.addEventListener('change', update); });
document.querySelector('#sample').addEventListener('click', () => { ["-1002933"].forEach((value,i) => { fields[i].value = value; }); update(); });
document.querySelector('#clear').addEventListener('click', () => { fields[0].value = '';  output.value = ''; status.textContent = 'Enter values to calculate.'; status.className = 'status-note info'; fields[0].focus(); });
document.querySelector('#copy').addEventListener('click', async () => { if (!output.value) return; try { await navigator.clipboard.writeText(output.value); status.textContent = 'Result copied.'; } catch { status.textContent = 'Copy unavailable. Select and copy the result manually.'; } });
update();
