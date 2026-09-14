function percentageChange(text) {
  const match = text.trim().match(/^(\d{1,12}(?:\.\d{1,6})?)\s*,\s*(\d{1,12}(?:\.\d{1,6})?)$/);
  if (!match) throw new Error('Enter two nonnegative decimals separated by a comma, such as 80, 100.');
  const scale = value => { const [whole, part = ''] = value.split('.'); return BigInt(whole) * 1000000n + BigInt(part.padEnd(6, '0')); };
  const original = scale(match[1]), next = scale(match[2]), difference = next - original;
  function format(value) { const abs = value < 0n ? -value : value; const decimals = String(abs % 1000000n).padStart(6, '0').replace(/0+$/, ''); return `${value < 0n ? '-' : ''}${abs / 1000000n}${decimals ? '.' + decimals : ''}`; }
  const absDifference = difference < 0n ? -difference : difference;
  const percent = original === 0n ? null : (absDifference * 100000000n + original / 2n) / original;
  return `Percentage change: ${percent === null ? 'undefined (zero original value)' : format(percent) + '% ' + (difference > 0n ? 'increase' : difference < 0n ? 'decrease' : '(no change)')}\nDifference (new - original): ${format(difference)}\nFormula: (${match[2]} - ${match[1]}) / ${match[1]} × 100\nPercentage rounded to six decimal places.`;
}
const source = document.getElementById('source');
const output = document.getElementById('output');
const status = document.getElementById('status');
function update() {
  try {
    output.value = source.value.trim() ? percentageChange(source.value) : '';
    status.textContent = output.value ? 'Result ready.' : 'Enter original and new values, such as 80, 100.';
    status.className = 'status-note info';
  } catch (error) { output.value = ''; status.textContent = error.message; status.className = 'status-note error'; }
}
source.addEventListener('input', update);
document.getElementById('sample').addEventListener('click', () => { source.value = "80, 100"; update(); });
document.getElementById('clear').addEventListener('click', () => { source.value = ''; update(); source.focus(); });
document.getElementById('copy').addEventListener('click', async () => {
  try { await navigator.clipboard.writeText(output.value); status.textContent = 'Result copied.'; }
  catch { status.textContent = 'Select and copy the result manually.'; output.focus(); output.select(); }
});
update();
