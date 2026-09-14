function caesar(text, shift, direction) {
  if (text.length > 100000) throw new Error('Use at most 100,000 characters.');
  if (!/^[+-]?\d+$/.test(String(shift)) || Math.abs(Number(shift)) > 1000000) throw new Error('Enter an integer shift between -1,000,000 and 1,000,000.');
  const offset = ((Number(shift) * (direction === 'decode' ? -1 : 1)) % 26 + 26) % 26;
  return text.replace(/[A-Za-z]/g, letter => { const base = letter <= 'Z' ? 65 : 97; return String.fromCharCode(base + (letter.charCodeAt(0) - base + offset) % 26); });
}
const source = document.getElementById('source');
const output = document.getElementById('output');
const status = document.getElementById('status');
function update() {
  try {
    output.value = source.value ? caesar(source.value, document.getElementById('shift').value, document.getElementById('direction').value) : '';
    status.textContent = output.value ? 'Result ready.' : 'Enter text and choose a letter shift.';
    status.className = 'status-note info';
  } catch (error) { output.value = ''; status.textContent = error.message; status.className = 'status-note error'; }
}
source.addEventListener('input', update);
document.getElementById('sample').addEventListener('click', () => { source.value = "Hello, World!"; update(); });
document.getElementById('clear').addEventListener('click', () => { source.value = ''; update(); source.focus(); });
document.getElementById('copy').addEventListener('click', async () => {
  try { await navigator.clipboard.writeText(output.value); status.textContent = 'Result copied.'; }
  catch { status.textContent = 'Select and copy the result manually.'; output.focus(); output.select(); }
});
update();

for (const id of ['shift', 'direction']) document.getElementById(id).addEventListener('input', update);
