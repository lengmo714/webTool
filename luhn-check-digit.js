'use strict';
function luhnReport(input, mode) {
  if (input.length > 5000) throw new Error('Input is too long.');
  if (!/^[0-9 -]+$/.test(input)) throw new Error('Use digits, spaces, and hyphens only.');
  const digits = input.replace(/[ -]/g, '');
  if (!digits || digits.length > 1000) throw new Error('Enter between 1 and 1,000 digits.');
  if (mode === 'validate' && digits.length < 2) throw new Error('Validation needs at least two digits.');
  const payload = mode === 'validate' ? digits.slice(0, -1) : digits;
  let sum = 0, double = true;
  for (let i = payload.length - 1; i >= 0; i--, double = !double) {
    let n = Number(payload[i]);
    if (double) { n *= 2; if (n > 9) n -= 9; }
    sum += n;
  }
  const check = String((10 - sum % 10) % 10);
  return mode === 'validate'
    ? `${digits.endsWith(check) ? 'Valid' : 'Invalid'} Luhn checksum\nIdentifier: ${digits}\nExpected check digit: ${check}\nActual check digit: ${digits.slice(-1)}`
    : `Check digit: ${check}\nComplete identifier: ${payload}${check}`;
}
const source = document.querySelector('#source'), mode = document.querySelector('#mode'), output = document.querySelector('#output'), status = document.querySelector('#status');
function update() {
  output.value = ''; status.className = 'status-note info'; status.textContent = 'Enter an identifier to begin.';
  if (!source.value.trim()) return;
  try { output.value = luhnReport(source.value, mode.value); status.textContent = 'Checksum calculated locally.'; }
  catch (error) { status.textContent = error.message; status.className = 'status-note error'; }
}
source.addEventListener('input', update); mode.addEventListener('change', update);
document.querySelector('#sample').addEventListener('click', () => { source.value = '7992739871'; mode.value = 'generate'; update(); });
document.querySelector('#clear').addEventListener('click', () => { source.value = ''; update(); });
document.querySelector('#copy').addEventListener('click', async () => { if (!output.value) return; try { await navigator.clipboard.writeText(output.value); status.textContent = 'Result copied.'; } catch { status.textContent = 'Copy unavailable. Select and copy the result manually.'; } });
update();
