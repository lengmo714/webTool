function convertDuration(text, unit) {
  const factors = { milliseconds: 1n, seconds: 1000n, minutes: 60000n, hours: 3600000n, days: 86400000n };
  const match = /^([+-]?)(\d+)(?:\.(\d{1,3}))?$/.exec(text.trim());
  if (!match || text.length > 100) throw new Error('Enter a decimal number with up to three decimal places and at most 100 characters.');
  if (!Object.hasOwn(factors, unit)) throw new Error('Choose a supported unit.');
  const scaled = (BigInt(match[2]) * 1000n + BigInt((match[3] || '').padEnd(3, '0'))) * factors[unit];
  if (scaled % 1000n) throw new Error('The duration must resolve to a whole number of milliseconds.');
  const total = scaled / 1000n;
  const sign = match[1] === '-' && total !== 0n ? '-' : '';
  let remaining = total;
  const parts = [86400000n, 3600000n, 60000n, 1000n, 1n].map(factor => { const part = remaining / factor; remaining %= factor; return part; });
  return `${sign}${parts[0]} days, ${parts[1]} hours, ${parts[2]} minutes, ${parts[3]} seconds, ${parts[4]} milliseconds\nTotal milliseconds: ${sign}${total}\nTotal seconds: ${sign}${total / 1000n}${total % 1000n ? '.' + String(total % 1000n).padStart(3, '0').replace(/0+$/, '') : ''}`;
}
const source = document.getElementById('source');
const unit = document.getElementById('unit');
const output = document.getElementById('output');
const status = document.getElementById('status');
function update() {
  try {
    output.value = source.value.trim() ? convertDuration(source.value, unit.value) : '';
    status.textContent = output.value ? 'Converted exactly to millisecond precision. A minus sign applies to the entire duration.' : 'Enter a duration to convert.';
    status.className = 'status-note info';
  } catch (error) { output.value = ''; status.textContent = error.message; status.className = 'status-note error'; }
}
source.addEventListener('input', update);
unit.addEventListener('change', update);
document.getElementById('sample').addEventListener('click', () => { source.value = '90061.125'; unit.value = 'seconds'; update(); });
document.getElementById('clear').addEventListener('click', () => { source.value = ''; update(); source.focus(); });
document.getElementById('copy').addEventListener('click', async () => {
  try { await navigator.clipboard.writeText(output.value); status.textContent = 'Result copied.'; }
  catch { status.textContent = 'Select and copy the result manually.'; output.focus(); output.select(); }
});
update();
