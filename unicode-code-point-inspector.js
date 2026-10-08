'use strict';
function inspect(text) {
  if (text.length > 50000) throw new Error('Input is limited to 50,000 UTF-16 code units.');
  if (!text) throw new Error('Enter text to inspect.');
  const points = Array.from(text);
  const rows = points.slice(0, 1000).map((character, index) => {
    const code = character.codePointAt(0).toString(16).toUpperCase().padStart(4, '0');
    const shown = character === '\n' ? 'LINE FEED' : character === '\r' ? 'CARRIAGE RETURN' : character === '\t' ? 'TAB' : character === ' ' ? 'SPACE' : character;
    return `${index + 1}\tU+${code}\t${JSON.stringify(character)}\t${shown}`;
  });
  const bytes = new TextEncoder().encode(text).length;
  return `Code points: ${points.length}\nUTF-16 code units: ${text.length}\nUTF-8 bytes: ${bytes}\nShown rows: ${rows.length}${points.length > rows.length ? ' (first 1,000)' : ''}\n\n#\tCode point\tJSON\tDisplay\n${rows.join('\n')}`;
}
const source = document.querySelector('#source'), output = document.querySelector('#output'), status = document.querySelector('#status');
function update() { output.value = ''; status.className = 'status-note info'; try { output.value = inspect(source.value); status.textContent = 'Inspected locally in your browser.'; } catch (error) { status.textContent = error.message; status.className = 'status-note error'; } }
source.addEventListener('input', update); source.addEventListener('change', update);
document.querySelector('#sample').addEventListener('click', () => { source.value = 'A café\n😀\tZ'; update(); });
document.querySelector('#clear').addEventListener('click', () => { source.value = ''; output.value = ''; status.textContent = 'Enter text to inspect.'; status.className = 'status-note info'; source.focus(); });
document.querySelector('#copy').addEventListener('click', async () => { if (!output.value) return; try { await navigator.clipboard.writeText(output.value); status.textContent = 'Report copied.'; } catch { status.textContent = 'Copy unavailable. Select and copy the report manually.'; } });
update();
