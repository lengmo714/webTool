'use strict';
function lines(text) {
  if (text === '') return [];
  const result = text.replace(/\r\n?/g, '\n').split('\n');
  if (result[result.length - 1] === '') result.pop();
  return result;
}
function calculate(a, b) {
  if (a.length > 100000 || b.length > 100000) throw new Error('Each list is limited to 100,000 characters.');
  const left = lines(a), right = lines(b), result = [];
  for (let i = 0; i < Math.max(left.length, right.length); i++) {
    if (i < left.length) result.push(left[i]);
    if (i < right.length) result.push(right[i]);
  }
  return result.length ? result.join('\n') + '\n' : '';
}
const fields = ["input0","input1"].map(id => document.querySelector('#'+id));
const output = document.querySelector('#output'), status = document.querySelector('#status');
function update() {
  output.value = ''; status.className = 'status-note info';
  try { output.value = calculate(...fields.map(field => field.value)); status.textContent = 'Calculated locally in your browser.'; }
  catch(error) { status.textContent = error.message; status.className = 'status-note error'; }
}
fields.forEach(field => { field.addEventListener('input', update); field.addEventListener('change', update); });
document.querySelector('#sample').addEventListener('click', () => { ["Question 1\nQuestion 2\nQuestion 3","Answer 1\nAnswer 2"].forEach((value,i) => { fields[i].value = value; }); update(); });
document.querySelector('#clear').addEventListener('click', () => { fields.forEach(field => { field.value = ''; }); output.value = ''; status.textContent = 'Enter values to calculate.'; status.className = 'status-note info'; fields[0].focus(); });
document.querySelector('#copy').addEventListener('click', async () => { if (!output.value) return; try { await navigator.clipboard.writeText(output.value); status.textContent = 'Result copied.'; } catch { status.textContent = 'Copy unavailable. Select and copy the result manually.'; } });
update();
