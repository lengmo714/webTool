function transposeTSV(text, pad) {
  if (text.length > 200000) throw new Error('Use at most 200,000 input characters.');
  if (!text) return { text: '', rows: 0, columns: 0 };
  const normalized = text.replace(/\r\n?/g, '\n').replace(/\n$/, '');
  const rows = normalized.split('\n').map(line => line.split('\t'));
  const width = rows.reduce((max, row) => Math.max(max, row.length), 0);
  if (rows.length * width > 50000) throw new Error('The padded table must contain at most 50,000 cells.');
  if (!pad && rows.some(row => row.length !== width)) throw new Error('Rows have different cell counts. Enable padding or correct your table.');
  const result = [];
  for (let c = 0; c < width; c++) result.push(rows.map(row => row[c] ?? '').join('\t'));
  // A final terminator preserves an empty final output row on the next transpose.
  return { text: result.join('\n') + '\n', rows: rows.length, columns: width };
}
const source = document.getElementById('source');
const pad = document.getElementById('pad');
const output = document.getElementById('output');
const status = document.getElementById('status');
function update() {
  output.value = '';
  status.className = 'status-note info';
  try {
    const result = transposeTSV(source.value, pad.checked);
    output.value = result.text;
    status.textContent = result.rows ? `${result.rows} rows × ${result.columns} columns → ${result.columns} rows × ${result.rows} columns. Output includes a final line ending.` : 'Paste a tab-separated table to begin.';
  } catch (error) { status.textContent = error.message; status.className = 'status-note error'; }
}
source.addEventListener('input', update);
pad.addEventListener('change', update);
document.getElementById('sample').addEventListener('click', () => { source.value = 'Name\tQ1\tQ2\nMaple\t12\t18\nCedar\t9\t15'; update(); });
document.getElementById('clear').addEventListener('click', () => { source.value = ''; update(); source.focus(); });
document.getElementById('copy').addEventListener('click', async () => {
  try { await navigator.clipboard.writeText(output.value); status.textContent = 'Transposed table copied.'; }
  catch { status.textContent = 'Select and copy the result manually.'; output.focus(); output.select(); }
});
update();
