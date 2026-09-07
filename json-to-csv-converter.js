function jsonToCsv(text, protect = true) {
  const rows = JSON.parse(text);
  if (!Array.isArray(rows) || rows.some(row => row === null || typeof row !== 'object' || Array.isArray(row))) throw new Error('Enter a JSON array of objects.');
  const keys = [...new Set(rows.flatMap(row => Object.keys(row)))];
  const cell = value => {
    let text = value == null ? '' : typeof value === 'object' ? JSON.stringify(value) : String(value);
    if (protect && typeof value === 'string' && /^[\s]*[=+@-]/u.test(text)) text = "'" + text;
    return /[",\r\n]/.test(text) ? '"' + text.replaceAll('"', '""') + '"' : text;
  };
  if (!keys.length) return '';
  return [keys.map(cell).join(','), ...rows.map(row => keys.map(key => cell(Object.hasOwn(row, key) ? row[key] : null)).join(','))].join('\r\n');
}
const source = document.getElementById('source');
const output = document.getElementById('output');
const status = document.getElementById('status');
const protect = document.getElementById('protect');
function update() {
  try {
    output.value = source.value.trim() ? jsonToCsv(source.value, protect.checked) : '';
    status.textContent = source.value.trim() ? 'CSV ready. Missing and null values become empty cells.' : 'Paste a JSON array of objects to begin.';
    status.className = 'status-note info';
  } catch (error) { output.value = ''; status.textContent = error.message; status.className = 'status-note error'; }
}
source.addEventListener('input', update);
protect.addEventListener('change', update);
document.getElementById('sample').addEventListener('click', () => { source.value = '[{"name":"Ada","city":"London"},{"name":"Lin","city":"Taipei","active":true}]'; update(); });
document.getElementById('clear').addEventListener('click', () => { source.value = ''; update(); source.focus(); });
document.getElementById('copy').addEventListener('click', async () => {
  try { await navigator.clipboard.writeText(output.value); status.textContent = 'Result copied.'; }
  catch { status.textContent = 'Copy unavailable. Select and copy the result manually.'; output.focus(); output.select(); }
});
update();
