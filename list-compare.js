function compareLists(a, b, trim, ignoreCase) {
  function entries(text) {
    const result = new Map();
    for (let line of text.split(/\r\n|\n|\r/)) {
      if (trim) line = line.trim();
      if (line === '') continue;
      const key = ignoreCase ? line.toLowerCase() : line;
      if (!result.has(key)) result.set(key, line);
    }
    return result;
  }
  const left = entries(a), right = entries(b);
  const common = [], onlyA = [], onlyB = [];
  for (const [key, value] of left) (right.has(key) ? common : onlyA).push(value);
  for (const [key, value] of right) if (!left.has(key)) onlyB.push(value);
  return { common, onlyA, onlyB, union: [...left.values(), ...onlyB], different: [...onlyA, ...onlyB], countA: left.size, countB: right.size };
}

const source = document.getElementById('source');
const second = document.getElementById('second');
const trim = document.getElementById('trim');
const ignoreCase = document.getElementById('ignore-case');
const mode = document.getElementById('mode');
const output = document.getElementById('output');
const status = document.getElementById('status');
function update() {
  const result = compareLists(source.value, second.value, trim.checked, ignoreCase.checked);
  output.value = result[mode.value].join('\n');
  status.textContent = `${result.countA} unique in A; ${result.countB} unique in B; ${result.common.length} shared. Showing ${result[mode.value].length} entries.`;
}
for (const element of [source, second, trim, ignoreCase, mode]) element.addEventListener('input', update);
document.getElementById('sample').addEventListener('click', () => {
  source.value = 'Apple\nBanana\nCherry\nApple'; second.value = 'banana\nCherry\nDate'; trim.checked = true; ignoreCase.checked = true; mode.value = 'common'; update();
});
document.getElementById('clear').addEventListener('click', () => { source.value = ''; second.value = ''; update(); source.focus(); });
document.getElementById('copy').addEventListener('click', async () => {
  try { await navigator.clipboard.writeText(output.value); status.textContent = 'Selected entries copied.'; }
  catch { status.textContent = 'Copy unavailable. Select and copy the result manually.'; output.focus(); output.select(); }
});
update();
