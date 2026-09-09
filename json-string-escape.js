function convertJsonString(text, mode) {
  if (mode === 'escape') return JSON.stringify(text);
  const value = JSON.parse(text);
  if (typeof value !== 'string') throw new Error('Enter a JSON string enclosed in double quotes, not an object, array, or number.');
  return value;
}
const source = document.getElementById('source');
const mode = document.getElementById('mode');
const output = document.getElementById('output');
const status = document.getElementById('status');
function update() {
  try {
    output.value = convertJsonString(source.value, mode.value);
    status.textContent = 'Converted locally. Escape output includes the surrounding double quotes.';
    status.className = 'status-note success';
  } catch (error) {
    output.value = '';
    status.textContent = 'Invalid JSON string: ' + error.message;
    status.className = 'status-note error';
  }
}
source.addEventListener('input', update);
mode.addEventListener('change', update);
document.getElementById('sample').addEventListener('click', () => { source.value = mode.value === 'escape' ? 'Hello "world"!\nPath: C:\\notes' : '"Hello \\"world\\"!\\nPath: C:\\\\notes"'; update(); });
document.getElementById('clear').addEventListener('click', () => { source.value = ''; output.value = ''; status.textContent = 'Input cleared. Enter text to convert.'; source.focus(); });
document.getElementById('copy').addEventListener('click', async () => {
  try { await navigator.clipboard.writeText(output.value); status.textContent = 'Result copied.'; }
  catch { status.textContent = 'Select and copy the result manually.'; output.focus(); output.select(); }
});
update();
