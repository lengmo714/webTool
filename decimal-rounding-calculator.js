'use strict';
function roundDecimal(input, places, mode) {
  const text = input.trim();
  if (!/^[+-]?(?:\d+(?:\.\d*)?|\.\d+)$/.test(text)) throw new Error('Enter a plain decimal number without commas or exponents.');
  if (text.replace(/\D/g, '').length > 1000) throw new Error('Use at most 1,000 digits.');
  if (!/^\d+$/.test(String(places)) || Number(places) > 100) throw new Error('Decimal places must be a whole number from 0 to 100.');
  if (!['nearest', 'floor', 'ceil', 'trunc'].includes(mode)) throw new Error('Choose a rounding rule.');
  const precision = Number(places), negative = text.startsWith('-');
  const [whole, fraction = ''] = text.replace(/^[+-]/, '').split('.');
  let magnitude = BigInt((whole || '0') + fraction.slice(0, precision).padEnd(precision, '0'));
  const discarded = fraction.slice(precision);
  const nonzero = /[1-9]/.test(discarded);
  const increment = mode === 'nearest' ? /^[5-9]/.test(discarded) : mode === 'floor' ? negative && nonzero : mode === 'ceil' ? !negative && nonzero : false;
  if (increment) magnitude++;
  const digits = magnitude.toString().padStart(precision + 1, '0');
  return (negative && magnitude !== 0n ? '-' : '') + (precision ? digits.slice(0, -precision) + '.' + digits.slice(-precision) : digits);
}
const source = document.querySelector('#source'), places = document.querySelector('#places'), mode = document.querySelector('#mode'), output = document.querySelector('#output'), status = document.querySelector('#status');
function update() {
  output.value = ''; status.className = 'status-note info'; status.textContent = 'Enter a decimal number to begin.';
  if (!source.value.trim()) return;
  try { output.value = roundDecimal(source.value, places.value, mode.value); status.textContent = 'Rounded exactly using decimal digits.'; }
  catch (error) { status.textContent = error.message; status.className = 'status-note error'; }
}
source.addEventListener('input', update); places.addEventListener('input', update); mode.addEventListener('change', update);
document.querySelector('#sample').addEventListener('click', () => { source.value = '1.005'; places.value = '2'; mode.value = 'nearest'; update(); });
document.querySelector('#clear').addEventListener('click', () => { source.value = ''; update(); });
document.querySelector('#copy').addEventListener('click', async () => { if (!output.value) return; try { await navigator.clipboard.writeText(output.value); status.textContent = 'Result copied.'; } catch { status.textContent = 'Copy unavailable. Select and copy the result manually.'; } });
update();
