function numberLines(text, start, step, separator, skip) {
  if (text.length > 100000) throw new Error('Use at most 100,000 characters.');
  if (![start, step].every(value => /^[+-]?\d{1,30}$/.test(value))) throw new Error('Enter a starting number and increment with at most 30 digits each.');
  if (separator.length > 50) throw new Error('Use at most 50 separator characters.');
  if (!text) return '';
  let next = BigInt(start);
  const increment = BigInt(step);
  const lines = text.replace(/\r\n?/g, '\n').split('\n');
  return lines.map((line, index) => {
    if ((index === lines.length - 1 && line === '') || (skip && !line.trim())) return line;
    const result = `${next}${separator}${line}`;
    next += increment;
    return result;
  }).join('\n');
}
const $ = id => document.getElementById(id);
function update() {
  try {
    $('output').value = numberLines($('source').value, $('start').value, $('step').value, $('separator').value, $('skip').checked);
    $('status').textContent = $('source').value ? 'Numbered text ready.' : 'Enter text to number its lines.';
    $('status').className = 'status-note info';
  } catch (error) { $('output').value = ''; $('status').textContent = error.message; $('status').className = 'status-note error'; }
}
for (const id of ['source', 'start', 'step', 'separator', 'skip']) $(id).addEventListener('input', update);
$('sample').addEventListener('click', () => { $('source').value = 'Apples\n\nOranges\nPears'; $('start').value = '1'; $('step').value = '1'; $('separator').value = '. '; $('skip').checked = true; update(); });
$('clear').addEventListener('click', () => { $('source').value = ''; update(); $('source').focus(); });
$('copy').addEventListener('click', async () => { try { await navigator.clipboard.writeText($('output').value); $('status').textContent = 'Result copied.'; } catch { $('status').textContent = 'Select and copy the result manually.'; $('output').focus(); $('output').select(); } });
update();
