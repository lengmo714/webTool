function calculate(text) {
  if (text.length > 200000) throw new Error('Use at most 200,000 input characters.');
  let root;
  try { root = JSON.parse(text); } catch { throw new Error('Enter valid JSON with quoted keys and no trailing commas.'); }
  const stack = [{value: root, pointer: ''}];
  const lines = [];
  let visited = 0;
  while (stack.length) {
    const {value, pointer} = stack.pop();
    if (++visited > 10000) throw new Error('Use JSON with at most 10,000 values.');
    if (typeof value === 'number' && !Number.isFinite(value)) throw new Error('A number is outside the finite browser range. Quote large numbers to preserve them.');
    const type = value === null ? 'null' : Array.isArray(value) ? 'array' : typeof value;
    const keys = value !== null && typeof value === 'object' ? Object.keys(value) : [];
    if (!keys.length) lines.push(JSON.stringify({pointer, type, value}));
    else for (let i = keys.length - 1; i >= 0; i--) {
      const key = keys[i];
      stack.push({value: value[key], pointer: pointer + '/' + key.replace(/~/g, '~0').replace(/\//g, '~1')});
    }
  }
  return lines.join('\n');
}
const source = document.getElementById('source');
const output = document.getElementById('output');
const status = document.getElementById('status');
function update() {
  try {
    output.value = source.value.trim() ? calculate(source.value) : '';
    status.textContent = output.value ? 'Result ready.' : 'Paste a JSON object, array, or primitive to inspect its leaf paths.';
    status.className = 'status-note info';
  } catch (error) { output.value = ''; status.textContent = error.message; status.className = 'status-note error'; }
}
source.addEventListener('input', update);
document.getElementById('sample').addEventListener('click', () => { source.value = "{\"user\":{\"name\":\"Ada\",\"roles\":[\"editor\",\"reviewer\"]},\"active\":true,\"notes\":null}"; update(); });
document.getElementById('clear').addEventListener('click', () => { source.value = ''; update(); source.focus(); });
document.getElementById('copy').addEventListener('click', async () => {
  try { await navigator.clipboard.writeText(output.value); status.textContent = 'Result copied.'; }
  catch { status.textContent = 'Select and copy the result manually.'; output.focus(); output.select(); }
});
update();
