'use strict';
function calculate(firstText, differenceText, countText) {
  function integer(text) {
    if (!/^[+-]?\d{1,100}$/.test(text.trim())) throw new Error('First term and difference must be integers of at most 100 digits.');
    return BigInt(text.trim());
  }
  const first = integer(firstText), difference = integer(differenceText);
  if (!/^\d{1,10}$/.test(countText.trim())) throw new Error('Term count must be an integer from 1 to 1,000,000,000.');
  const count = BigInt(countText.trim());
  if (count < 1n || count > 1000000000n) throw new Error('Term count must be an integer from 1 to 1,000,000,000.');
  const last = first + (count-1n)*difference;
  const sum = count*(first+last)/2n;
  const preview = Array.from({length:Number(count < 20n ? count : 20n)}, (_,i) => String(first+BigInt(i)*difference));
  return `Term ${count}: ${last}\nSum of ${count} terms: ${sum}\n\nSequence preview:\n${preview.join(', ')}${count > 20n ? ', …' : ''}`;
}

const fields = ["first","difference","count"].map(id => document.querySelector('#'+id));
const output = document.querySelector('#output'), status = document.querySelector('#status');
function update() {
  output.value = ''; status.className = 'status-note info';
  try { output.value = calculate(...fields.map(field => field.value)); status.textContent = 'Calculated locally in your browser.'; }
  catch(error) { status.textContent = error.message; status.className = 'status-note error'; }
}
fields.forEach(field => { field.addEventListener('input', update); field.addEventListener('change', update); });
document.querySelector('#sample').addEventListener('click', () => { ["3","4","10"].forEach((value,i) => { fields[i].value = value; }); update(); });
document.querySelector('#clear').addEventListener('click', () => { fields.forEach(field => { field.value = ''; }); output.value = ''; status.textContent = 'Enter values to calculate.'; status.className = 'status-note info'; fields[0].focus(); });
document.querySelector('#copy').addEventListener('click', async () => { if (!output.value) return; try { await navigator.clipboard.writeText(output.value); status.textContent = 'Result copied.'; } catch { status.textContent = 'Copy unavailable. Select and copy the result manually.'; } });
update();
