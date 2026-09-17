function calculateStatistics(text, mode) {
  if (!['population', 'sample'].includes(mode)) throw new Error('Choose population or sample statistics.');
  if (text.length > 200000) throw new Error('Use at most 200,000 input characters.');
  const tokens = text.trim().split(/[\s,;]+/).filter(Boolean);
  if (!tokens.length) return '';
  if (tokens.length > 10000) throw new Error('Use at most 10,000 numbers.');
  const numbers = tokens.map(token => {
    if (!/^[+-]?(?:\d+(?:\.\d*)?|\.\d+)(?:e[+-]?\d+)?$/i.test(token)) throw new Error('Use valid decimal numbers with a period as the decimal separator.');
    const value = Number(token);
    if (!Number.isFinite(value) || Math.abs(value) > 1e100) throw new Error('Each number must have a magnitude no greater than 1e100.');
    return value;
  }).sort((a, b) => a - b);
  let mean = 0, m2 = 0, sum = 0, correction = 0;
  numbers.forEach((value, index) => {
    const delta = value - mean;
    mean += delta / (index + 1);
    m2 += delta * (value - mean);
    const adjusted = value - correction, next = sum + adjusted;
    correction = (next - sum) - adjusted; sum = next;
  });
  const n = numbers.length, middle = Math.floor(n / 2);
  const variance = mode === 'sample' && n < 2 ? null : Math.max(0, m2 / (mode === 'sample' ? n - 1 : n));
  const format = value => value === null ? 'Not defined (need at least two values)' : String(Number(value.toPrecision(12)));
  return [['Count', n], ['Sum', sum], ['Mean', mean], ['Median', n % 2 ? numbers[middle] : (numbers[middle - 1] + numbers[middle]) / 2], ['Minimum', numbers[0]], ['Maximum', numbers[n - 1]], ['Range', numbers[n - 1] - numbers[0]], [mode === 'sample' ? 'Sample variance' : 'Population variance', variance], ['Standard deviation', variance === null ? null : Math.sqrt(variance)]].map(([label, value]) => label + ': ' + format(value)).join('\n');
}
const $ = id => document.getElementById(id);
function update() {
  try { $('output').value = calculateStatistics($('source').value, $('mode').value); $('status').textContent = $('output').value ? 'Statistics ready.' : 'Enter numbers to begin.'; $('status').className = 'status-note info'; }
  catch (error) { $('output').value = ''; $('status').textContent = error.message; $('status').className = 'status-note error'; }
}
for (const id of ['source', 'mode']) $(id).addEventListener('input', update);
$('sample').addEventListener('click', () => { $('source').value = '2, 4, 4, 4, 5, 5, 7, 9'; $('mode').value = 'population'; update(); });
$('clear').addEventListener('click', () => { $('source').value = ''; update(); $('source').focus(); });
$('copy').addEventListener('click', async () => { try { await navigator.clipboard.writeText($('output').value); $('status').textContent = 'Result copied.'; } catch { $('status').textContent = 'Select and copy the result manually.'; $('output').focus(); $('output').select(); } });
update();
