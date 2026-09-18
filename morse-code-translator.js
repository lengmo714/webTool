const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
const codes = '.- -... -.-. -.. . ..-. --. .... .. .--- -.- .-.. -- -. --- .--. --.- .-. ... - ..- ...- .-- -..- -.-- --.. ----- .---- ..--- ...-- ....- ..... -.... --... ---.. ----.'.split(' ');
function convert(input, mode) {
  if (input.length > 50000) throw new Error('Limit input to 50,000 characters.');
  if (!['encode', 'decode'].includes(mode)) throw new Error('Choose a valid direction.');
  const clean = input.trim();
  if (!clean) return { text: '', status: 'Enter text or Morse code to begin.' };
  let text;
  if (mode === 'encode') {
    if (/[^a-zA-Z0-9\s]/u.test(clean)) throw new Error('Use only English letters, digits, and whitespace.');
    text = clean.toUpperCase().split(/\s+/u).map(word => Array.from(word, letter => codes[alphabet.indexOf(letter)]).join(' ')).join(' / ');
  } else {
    text = clean.split('/').map(word => {
      if (!word.trim()) throw new Error('Each slash must separate nonempty words.');
      return word.trim().split(/\s+/u).map(code => {
        const index = codes.indexOf(code);
        if (index < 0) throw new Error('Unknown Morse token: ' + code.slice(0, 30));
        return alphabet[index];
      }).join('');
    }).join(' ');
  }
  return { text, status: 'Translation ready.' };
}

const $ = id => document.getElementById(id);
function update() {
  try { const result = convert($('input').value, $('mode').value); $('output').value = result.text; $('status').textContent = result.status; $('status').className = 'status-note info'; }
  catch (error) { $('output').value = ''; $('status').textContent = error.message; $('status').className = 'status-note error'; }
}
for (const id of ['input', 'mode']) $(id).addEventListener('input', update);
$('sample').addEventListener('click', () => { $('mode').value = 'encode'; $('input').value = 'Hello World 2026'; update(); });
$('clear').addEventListener('click', () => { $('input').value = ''; update(); $('input').focus(); });
$('copy').addEventListener('click', async () => { try { await navigator.clipboard.writeText($('output').value); $('status').textContent = 'Result copied.'; } catch { $('status').textContent = 'Select and copy the result manually.'; $('output').focus(); $('output').select(); } });
update();
