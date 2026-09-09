function normalizeText(text, form) {
  if (!['NFC', 'NFD', 'NFKC', 'NFKD'].includes(form)) throw new Error('Choose a supported normalization form.');
  if (text.length > 100000) throw new Error('Enter at most 100,000 UTF-16 units.');
  return text.normalize(form);
}
function inspectPoints(text) {
  const points = Array.from(text);
  return `${points.length} code points: ${points.slice(0, 200).map(c => 'U+' + c.codePointAt(0).toString(16).toUpperCase().padStart(4, '0')).join(' ')}${points.length > 200 ? ' … (first 200 shown)' : ''}`;
}
const source = document.getElementById('source');
const output = document.getElementById('output');
const status = document.getElementById('status');
const mode = document.getElementById('mode');
const details = document.getElementById('details');
function update() {
  try {
    output.value = normalizeText(source.value, mode.value);
    details.value = source.value ? `Before: ${inspectPoints(source.value)}\nAfter: ${inspectPoints(output.value)}` : '';
    status.textContent = source.value ? (source.value === output.value ? 'Text is already in the selected form.' : 'Text normalized. Copy result copies only the normalized text.') : 'Enter text to normalize.';
    status.className = 'status-note info';
  } catch (error) { output.value = ''; details.value = ''; status.textContent = error.message; status.className = 'status-note error'; }
}
source.addEventListener('input', update);
mode.addEventListener('change', update);
document.getElementById('sample').addEventListener('click', () => { source.value = 'Cafe\u0301 \uFF21\uFF22\uFF23 \uFB01'; mode.value = 'NFC'; update(); });
document.getElementById('clear').addEventListener('click', () => { source.value = ''; update(); source.focus(); });
document.getElementById('copy').addEventListener('click', async () => {
  try { await navigator.clipboard.writeText(output.value); status.textContent = 'Result copied.'; }
  catch { status.textContent = 'Select and copy the result manually.'; output.focus(); output.select(); }
});
update();
