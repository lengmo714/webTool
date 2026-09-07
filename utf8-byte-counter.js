function measureText(text) {
  return { bytes: new TextEncoder().encode(text).length, points: Array.from(text).length, units: text.length };
}

const source = document.getElementById('source');
const limit = document.getElementById('limit');
const output = document.getElementById('output');
const status = document.getElementById('status');
function update() {
  const { bytes, points, units } = measureText(source.value);
  output.value = `UTF-8 bytes: ${bytes}\nKiB: ${(bytes / 1024).toFixed(3)}\nUnicode code points: ${points}\nUTF-16 code units: ${units}`;
  status.className = 'status-note info';
  if (limit.validity.badInput || (limit.value !== '' && (!Number.isSafeInteger(Number(limit.value)) || Number(limit.value) < 0))) {
    status.textContent = 'Enter a non-negative whole-number byte limit.';
    status.className = 'status-note error';
  } else if (limit.value !== '') {
    const remaining = Number(limit.value) - bytes;
    status.textContent = remaining >= 0 ? `${remaining} bytes remaining.` : `${-remaining} bytes over the limit.`;
    status.className = `status-note ${remaining >= 0 ? 'success' : 'error'}`;
  } else status.textContent = 'UTF-8 size without a byte-order mark. Results update as you type.';
}
source.addEventListener('input', update);
limit.addEventListener('input', update);
document.getElementById('sample').addEventListener('click', () => { source.value = 'Hello, 世界 🌍'; limit.value = '20'; update(); });
document.getElementById('clear').addEventListener('click', () => { source.value = ''; limit.value = ''; update(); source.focus(); });
document.getElementById('copy').addEventListener('click', async () => {
  try { await navigator.clipboard.writeText(output.value); status.textContent = 'Report copied.'; }
  catch { status.textContent = 'Copy unavailable. Select and copy the report manually.'; output.focus(); output.select(); }
});
update();
