function textToHex(text) {
  return Array.from(new TextEncoder().encode(text), byte => byte.toString(16).padStart(2, '0').toUpperCase()).join(' ');
}
function hexToText(text) {
  const hex = text.replace(/\s/g, '');
  if (!/^(?:[0-9a-fA-F]{2})*$/.test(hex)) throw new Error('Enter complete hex byte pairs using only 0-9, A-F and whitespace.');
  const bytes = Uint8Array.from(hex.match(/../g) || [], pair => parseInt(pair, 16));
  try { return new TextDecoder('utf-8', { fatal: true, ignoreBOM: true }).decode(bytes); }
  catch { throw new Error('These bytes are not valid UTF-8 text.'); }
}
const mode = document.getElementById('mode');
mode.addEventListener('change', update);
function convert(text) { return mode.value === 'decode' ? hexToText(text) : textToHex(text); }
function loadSample() { source.value = mode.value === 'decode' ? '48 69 20 F0 9F 8C 8D' : 'Hi 🌍'; update(); }

const source = document.getElementById('source');
const output = document.getElementById('output');
const status = document.getElementById('status');
function update() {
  try { output.value = convert(source.value); status.textContent = source.value ? 'Result ready.' : 'Paste input to begin.'; status.className = 'status-note info'; }
  catch (error) { output.value = ''; status.textContent = error.message; status.className = 'status-note error'; }
}
source.addEventListener('input', update);
document.getElementById('sample').addEventListener('click', loadSample);
document.getElementById('clear').addEventListener('click', () => { source.value = ''; update(); source.focus(); });
document.getElementById('copy').addEventListener('click', async () => {
  try { await navigator.clipboard.writeText(output.value); status.textContent = 'Result copied.'; }
  catch { status.textContent = 'Copy unavailable. Select and copy the result manually.'; output.focus(); output.select(); }
});
update();
