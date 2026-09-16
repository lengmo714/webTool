function expandTabs(text, size, mode) {
  if (text.length > 100000) throw new Error('Use at most 100,000 input characters.');
  if (!/^\d{1,2}$/.test(size) || Number(size) < 1 || Number(size) > 16) throw new Error('Choose a tab width from 1 to 16.');
  if (!['all', 'indent'].includes(mode)) throw new Error('Choose a conversion mode.');
  const width = Number(size);
  return text.replace(/\r\n?/g, '\n').split('\n').map(line => {
    let column = 0, leading = true, output = '';
    for (const char of line) {
      if (char === '\t') {
        const spaces = width - column % width;
        output += mode === 'all' || leading ? ' '.repeat(spaces) : char;
        column += spaces;
      } else { output += char; column++; if (char !== ' ') leading = false; }
    }
    return output;
  }).join('\n');
}
const $ = id => document.getElementById(id);
function update() {
  try { $('output').value = expandTabs($('source').value, $('size').value, $('mode').value); $('status').textContent = $('source').value ? 'Conversion ready. ' + ($('source').value.match(/\t/g) || []).length + ' tab characters in input.' : 'Paste text with tabs to begin.'; $('status').className = 'status-note info'; }
  catch (error) { $('output').value = ''; $('status').textContent = error.message; $('status').className = 'status-note error'; }
}
for (const id of ['source', 'size', 'mode']) $(id).addEventListener('input', update);
$('sample').addEventListener('click', () => { $('source').value = '\tfunction hello() {\n\t\treturn "Hello";\n\t}\nname\tvalue'; $('size').value = '4'; $('mode').value = 'all'; update(); });
$('clear').addEventListener('click', () => { $('source').value = ''; update(); $('source').focus(); });
$('copy').addEventListener('click', async () => { try { await navigator.clipboard.writeText($('output').value); $('status').textContent = 'Result copied.'; } catch { $('status').textContent = 'Select and copy the result manually.'; $('output').focus(); $('output').select(); } });
update();
