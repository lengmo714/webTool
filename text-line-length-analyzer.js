'use strict';
const encoder = new TextEncoder();
function analyze(text) {
  if (text.length > 200000) throw new Error('Input is limited to 200,000 UTF-16 code units.');
  if (text === '') throw new Error('Enter one or more text lines.');
  const lines = text.replace(/\r\n?/g, '\n').split('\n');
  const sizes = lines.map((line) => ({ units: line.length, points: Array.from(line).length, bytes: encoder.encode(line).length }));
  const total = sizes.reduce((sum, item) => sum + item.points, 0);
  const longest = Math.max(...sizes.map((item) => item.points));
  const shortest = Math.min(...sizes.map((item) => item.points));
  const widest = sizes.reduce((best, item, index) => item.bytes > best.item.bytes ? { item, index } : best, { item: sizes[0], index: 0 });
  const rows = sizes.map((item, index) => `${index + 1}\t${item.points}\t${item.units}\t${item.bytes}`).join('\n');
  return `Lines: ${lines.length}\nTotal code points: ${total}\nAverage code points per line: ${(total / lines.length).toFixed(2)}\nShortest line: ${shortest} code points\nLongest line: ${longest} code points\nLargest UTF-8 line: ${widest.index + 1} (${widest.item.bytes} bytes)\n\nLine\tCode points\tUTF-16 units\tUTF-8 bytes\n${rows}`;
}
const source = document.querySelector('#source'), output = document.querySelector('#output'), status = document.querySelector('#status');
function update() { output.value = ''; status.className = 'status-note info'; try { output.value = analyze(source.value); status.textContent = 'Analyzed locally in your browser.'; } catch (error) { status.textContent = error.message; status.className = 'status-note error'; } }
source.addEventListener('input', update); source.addEventListener('change', update);
document.querySelector('#sample').addEventListener('click', () => { source.value = 'Plain ASCII\ncafé\n😀 emoji'; update(); });
document.querySelector('#clear').addEventListener('click', () => { source.value = ''; output.value = ''; status.textContent = 'Enter text to analyze.'; status.className = 'status-note info'; source.focus(); });
document.querySelector('#copy').addEventListener('click', async () => { if (!output.value) return; try { await navigator.clipboard.writeText(output.value); status.textContent = 'Report copied.'; } catch { status.textContent = 'Copy unavailable. Select and copy the report manually.'; } });
update();
