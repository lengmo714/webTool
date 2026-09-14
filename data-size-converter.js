function convertDataSize(text) {
  const match = text.trim().match(/^(\d{1,100})(?:\.(\d{1,12}))?\s*(B|kB|MB|GB|TB|KiB|MiB|GiB|TiB)$/i);
  if (!match) throw new Error('Enter a nonnegative value and unit, such as 1.5 GiB. Use up to 100 integer digits and 12 decimal places.');
  const units = { b: 1n, kb: 1000n, mb: 1000n ** 2n, gb: 1000n ** 3n, tb: 1000n ** 4n, kib: 1024n, mib: 1024n ** 2n, gib: 1024n ** 3n, tib: 1024n ** 4n };
  const digits = match[2] || '';
  const numerator = BigInt(match[1] + digits) * units[match[3].toLowerCase()];
  const denominator = 10n ** BigInt(digits.length);
  function decimal(n, d) {
    const whole = n / d;
    let remainder = n % d, fraction = '';
    for (let i = 0; i < 12 && remainder; i++) { remainder *= 10n; fraction += remainder / d; remainder %= d; }
    return `${whole}${fraction ? '.' + fraction : ''}${remainder ? '…' : ''}`;
  }
  return ['B', 'kB', 'MB', 'GB', 'TB', 'KiB', 'MiB', 'GiB', 'TiB'].map(unit => `${unit}: ${decimal(numerator, denominator * units[unit.toLowerCase()])}`).join('\n');
}
const source = document.getElementById('source');
const output = document.getElementById('output');
const status = document.getElementById('status');
function update() {
  try {
    output.value = source.value.trim() ? convertDataSize(source.value) : '';
    status.textContent = output.value ? 'Calculated with exact integer arithmetic.' : 'Enter a size with its unit, such as 1.5 GiB.';
    status.className = 'status-note info';
  } catch (error) { output.value = ''; status.textContent = error.message; status.className = 'status-note error'; }
}
source.addEventListener('input', update);
document.getElementById('sample').addEventListener('click', () => { source.value = "1.5 GiB"; update(); });
document.getElementById('clear').addEventListener('click', () => { source.value = ''; update(); source.focus(); });
document.getElementById('copy').addEventListener('click', async () => {
  try { await navigator.clipboard.writeText(output.value); status.textContent = 'Result copied.'; }
  catch { status.textContent = 'Select and copy the result manually.'; output.focus(); output.select(); }
});
update();
