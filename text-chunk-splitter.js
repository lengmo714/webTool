function convert(input, sizeText) {
  if (input.length > 100000) throw new Error('Limit input to 100,000 UTF-16 units.');
  if (!/^\d+$/.test(sizeText)) throw new Error('Enter a whole chunk size from 1 to 10,000.');
  const size = Number(sizeText);
  if (size < 1 || size > 10000) throw new Error('Enter a whole chunk size from 1 to 10,000.');
  const points = Array.from(input);
  const count = Math.ceil(points.length / size);
  if (count > 10000) throw new Error('Increase the chunk size to keep output within 10,000 chunks.');
  const chunks = [];
  for (let i = 0; i < points.length; i += size) chunks.push(points.slice(i, i + size).join(''));
  return { text: JSON.stringify(chunks, null, 2), status: count + ' chunks from ' + points.length + ' code points.' };
}

const $ = id => document.getElementById(id);
function update() {
  try { const result = convert($('input').value, $('size').value); $('output').value = result.text; $('status').textContent = result.status; $('status').className = 'status-note info'; }
  catch (error) { $('output').value = ''; $('status').textContent = error.message; $('status').className = 'status-note error'; }
}
for (const id of ['input', 'size']) $(id).addEventListener('input', update);
$('sample').addEventListener('click', () => { $('size').value = '5'; $('input').value = 'Hello 🌍! Keep every space.'; update(); });
$('clear').addEventListener('click', () => { $('input').value = ''; update(); $('input').focus(); });
$('copy').addEventListener('click', async () => { try { await navigator.clipboard.writeText($('output').value); $('status').textContent = 'Result copied.'; } catch { $('status').textContent = 'Select and copy the result manually.'; $('output').focus(); $('output').select(); } });
update();
