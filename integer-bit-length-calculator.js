'use strict';
function calculate(raw) {
  const value = raw.trim();
  if (value.length > 100001) throw new Error('Input is limited to 100,000 decimal digits.');
  if (!/^[+-]?\d+$/.test(value)) throw new Error('Enter a base-10 integer with an optional plus or minus sign.');
  const number = BigInt(value), magnitude = number < 0n ? -number : number;
  const binary = magnitude.toString(2), bits = magnitude === 0n ? 1 : binary.length;
  const unsignedBytes = Math.ceil(bits / 8);
  const signedBits = number === 0n ? 1 : number > 0n ? bits + 1 : (-number - 1n).toString(2).length + 1;
  const signedBytes = Math.ceil(signedBits / 8);
  return `Decimal: ${number}\nSign: ${number < 0n ? 'negative' : number > 0n ? 'positive' : 'zero'}\nMagnitude bit length: ${bits}\nUnsigned bytes needed: ${unsignedBytes}\nSigned two's-complement bits needed: ${signedBits}\nSigned two's-complement bytes needed: ${signedBytes}\n\nBinary magnitude:\n${binary}`;
}
const source = document.querySelector('#source'), output = document.querySelector('#output'), status = document.querySelector('#status');
function update() { output.value = ''; status.className = 'status-note info'; try { output.value = calculate(source.value); status.textContent = 'Calculated exactly with BigInt in your browser.'; } catch (error) { status.textContent = error.message; status.className = 'status-note error'; } }
source.addEventListener('input', update); source.addEventListener('change', update);
document.querySelector('#sample').addEventListener('click', () => { source.value = '-129'; update(); });
document.querySelector('#clear').addEventListener('click', () => { source.value = ''; output.value = ''; status.textContent = 'Enter an integer to calculate.'; status.className = 'status-note info'; source.focus(); });
document.querySelector('#copy').addEventListener('click', async () => { if (!output.value) return; try { await navigator.clipboard.writeText(output.value); status.textContent = 'Result copied.'; } catch { status.textContent = 'Copy unavailable. Select and copy the result manually.'; } });
update();
