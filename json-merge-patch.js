'use strict';
function isObject(value) { return value !== null && typeof value === 'object' && !Array.isArray(value); }
function checkDepth(value, depth = 0) {
  if (depth > 100) throw new Error('JSON must be no more than 100 levels deep.');
  if (value !== null && typeof value === 'object') Object.values(value).forEach(v => checkDepth(v, depth + 1));
}
function merge(target, patch) {
  if (!isObject(patch)) return patch;
  const result = Object.create(null);
  if (isObject(target)) for (const key of Object.keys(target)) result[key] = target[key];
  for (const key of Object.keys(patch)) {
    if (patch[key] === null) delete result[key];
    else result[key] = merge(result[key], patch[key]);
  }
  return result;
}
function calculate(a, b) {
  if (a.length > 100000 || b.length > 100000) throw new Error('Each JSON input is limited to 100,000 characters.');
  let target, patch;
  try { target = JSON.parse(a); } catch { throw new Error('Target is not valid JSON.'); }
  try { patch = JSON.parse(b); } catch { throw new Error('Patch is not valid JSON.'); }
  checkDepth(target); checkDepth(patch);
  return JSON.stringify(merge(target, patch), null, 2);
}
const fields = ["input0","input1"].map(id => document.querySelector('#'+id));
const output = document.querySelector('#output'), status = document.querySelector('#status');
function update() {
  output.value = ''; status.className = 'status-note info';
  try { output.value = calculate(...fields.map(field => field.value)); status.textContent = 'Calculated locally in your browser.'; }
  catch(error) { status.textContent = error.message; status.className = 'status-note error'; }
}
fields.forEach(field => { field.addEventListener('input', update); field.addEventListener('change', update); });
document.querySelector('#sample').addEventListener('click', () => { ["{\"title\":\"Draft\",\"tags\":[\"old\"],\"author\":{\"name\":\"Alex\",\"email\":\"old@example.com\"}}","{\"title\":\"Published\",\"tags\":[\"new\"],\"author\":{\"email\":null}}"].forEach((value,i) => { fields[i].value = value; }); update(); });
document.querySelector('#clear').addEventListener('click', () => { fields.forEach(field => { field.value = ''; }); output.value = ''; status.textContent = 'Enter values to calculate.'; status.className = 'status-note info'; fields[0].focus(); });
document.querySelector('#copy').addEventListener('click', async () => { if (!output.value) return; try { await navigator.clipboard.writeText(output.value); status.textContent = 'Result copied.'; } catch { status.textContent = 'Copy unavailable. Select and copy the result manually.'; } });
update();
