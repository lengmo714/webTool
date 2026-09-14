function simplifyFraction(text) {
  const match = text.trim().match(/^([+-]?\d{1,200})\s*\/\s*([+-]?\d{1,200})$/);
  if (!match) throw new Error('Enter numerator / denominator, using integers of up to 200 digits.');
  let n = BigInt(match[1]), d = BigInt(match[2]);
  if (d === 0n) throw new Error('The denominator cannot be zero.');
  if (d < 0n) { n = -n; d = -d; }
  let a = n < 0n ? -n : n, b = d;
  while (b) [a, b] = [b, a % b];
  n /= a; d /= a;
  const magnitude = n < 0n ? -n : n;
  const whole = magnitude / d, remainder = magnitude % d;
  const mixed = remainder === 0n ? String(n / d) : `${n < 0n ? '-' : ''}${whole ? whole + ' ' : ''}${remainder}/${d}`;
  return `Simplified fraction: ${n}/${d}\nMixed number: ${mixed}\nCommon factor removed: ${a}`;
}
const source = document.getElementById('source');
const output = document.getElementById('output');
const status = document.getElementById('status');
function update() {
  try {
    output.value = source.value.trim() ? simplifyFraction(source.value) : '';
    status.textContent = output.value ? 'Calculated with exact integer arithmetic.' : 'Enter a fraction such as -84 / 30.';
    status.className = 'status-note info';
  } catch (error) { output.value = ''; status.textContent = error.message; status.className = 'status-note error'; }
}
source.addEventListener('input', update);
document.getElementById('sample').addEventListener('click', () => { source.value = "-84 / 30"; update(); });
document.getElementById('clear').addEventListener('click', () => { source.value = ''; update(); source.focus(); });
document.getElementById('copy').addEventListener('click', async () => {
  try { await navigator.clipboard.writeText(output.value); status.textContent = 'Result copied.'; }
  catch { status.textContent = 'Select and copy the result manually.'; output.focus(); output.select(); }
});
update();
