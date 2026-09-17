function generateRange(startText, endText, stepText, mode) {
  if (!['lines', 'csv', 'json'].includes(mode)) throw new Error('Choose a valid output format.');
  const values = [startText, endText, stepText].map(text => {
    const clean = text.trim();
    if (!/^[+-]?\d{1,100}$/.test(clean)) throw new Error('Enter integers of up to 100 digits in all three fields.');
    return BigInt(clean);
  });
  const [start, end, step] = values;
  if (step === 0n) throw new Error('Step must not be zero.');
  if ((end > start && step < 0n) || (end < start && step > 0n)) throw new Error('Step must point from the start toward the end.');
  const count = (end - start) / step + 1n;
  if (count > 10000n) throw new Error('Limit the sequence to 10,000 values by narrowing the bounds or increasing the step.');
  const result = Array.from({ length: Number(count) }, (_, index) => String(start + BigInt(index) * step));
  return { count: result.length, text: mode === 'json' ? JSON.stringify(result, null, 2) : result.join(mode === 'csv' ? ', ' : '\n') };
}
const $ = id => document.getElementById(id);
function update() {
  try { const result = generateRange($('start').value, $('end').value, $('step').value, $('mode').value); $('output').value = result.text; $('status').textContent = result.count + ' values generated.'; $('status').className = 'status-note info'; }
  catch (error) { $('output').value = ''; $('status').textContent = error.message; $('status').className = 'status-note error'; }
}
for (const id of ['start', 'end', 'step', 'mode']) $(id).addEventListener('input', update);
$('sample').addEventListener('click', () => { $('start').value = '10'; $('end').value = '-2'; $('step').value = '-3'; $('mode').value = 'lines'; update(); });
$('clear').addEventListener('click', () => { for (const id of ['start', 'end', 'step']) $(id).value = ''; $('output').value = ''; $('status').textContent = 'Enter bounds and a step to begin.'; $('status').className = 'status-note info'; $('start').focus(); });
$('copy').addEventListener('click', async () => { try { await navigator.clipboard.writeText($('output').value); $('status').textContent = 'Result copied.'; } catch { $('status').textContent = 'Select and copy the result manually.'; $('output').focus(); $('output').select(); } });
update();
