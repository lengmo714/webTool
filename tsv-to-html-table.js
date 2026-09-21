'use strict';
function tableMarkup(input, header, caption) {
  if (input.length > 200000) throw new Error('Limit input to 200,000 characters.');
  if (caption.length > 500) throw new Error('Limit the caption to 500 characters.');
  if (!input) return '';
  const lines = input.replace(/\r\n?/g, '\n').split('\n');
  if (lines.length > 1 && lines.at(-1) === '') lines.pop();
  if (lines.length > 1000) throw new Error('Limit input to 1,000 rows.');
  const rows = lines.map(line => line.split('\t'));
  const width = Math.max(...rows.map(row => row.length));
  if (width > 100 || width * rows.length > 20000) throw new Error('Limit input to 100 columns and 20,000 output cells.');
  const escape = value => value.replace(/[&<>"']/g, char => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));
  const rowHTML = (row, heading) => '    <tr>' + Array.from({length:width}, (_, i) => heading ? `<th scope="col">${escape(row[i] || '')}</th>` : `<td>${escape(row[i] || '')}</td>`).join('') + '</tr>';
  const result = ['<table>'];
  if (caption) result.push(`  <caption>${escape(caption)}</caption>`);
  if (header) result.push('  <thead>', rowHTML(rows.shift(), true), '  </thead>');
  result.push('  <tbody>', ...rows.map(row => rowHTML(row, false)), '  </tbody>', '</table>');
  return result.join('\n');
}
const source = document.querySelector('#source'), header = document.querySelector('#header'), caption = document.querySelector('#caption'), output = document.querySelector('#output'), status = document.querySelector('#status');
function update() {
  output.value = ''; status.className = 'status-note info';
  try { output.value = tableMarkup(source.value, header.checked, caption.value); status.textContent = output.value ? 'HTML generated. Cell content is escaped as text.' : 'Paste tab-separated cells to begin.'; }
  catch (error) { status.textContent = error.message; status.className = 'status-note error'; }
}
source.addEventListener('input', update); header.addEventListener('change', update); caption.addEventListener('input', update);
document.querySelector('#sample').addEventListener('click', () => { source.value = 'Product\tQuantity\nPencils\t12\nNotebooks\t4'; header.checked = true; caption.value = 'Inventory'; update(); });
document.querySelector('#clear').addEventListener('click', () => { source.value = ''; caption.value = ''; update(); });
document.querySelector('#copy').addEventListener('click', async () => { if (!output.value) return; try { await navigator.clipboard.writeText(output.value); status.textContent = 'HTML copied.'; } catch { status.textContent = 'Copy unavailable. Select and copy the HTML manually.'; } });
update();
