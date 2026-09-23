'use strict';
function calculateBits(aText, bText, widthText, shiftText) {
  const width = Number(widthText);
  if (![8, 16, 32, 64].includes(width)) throw new Error('Choose 8, 16, 32, or 64 bits.');
  if (!/^\d{1,2}$/.test(shiftText.trim()) || Number(shiftText) > width) throw new Error('Shift count must be a whole number from 0 through the bit width.');
  const mask = (1n << BigInt(width)) - 1n;
  function parse(text) {
    text = text.trim();
    if (text.length > 66 || !/^(?:\d+|0x[\da-f]+|0b[01]+)$/i.test(text)) throw new Error('Enter unsigned decimal, 0x hexadecimal, or 0b binary integers.');
    const value = BigInt(text);
    if (value > mask) throw new Error(`Operands must be between 0 and ${mask} for ${width} bits.`);
    return value;
  }
  const a = parse(aText), b = parse(bText), shift = BigInt(shiftText);
  return { width, values: { 'A AND B': a & b, 'A OR B': a | b, 'A XOR B': a ^ b, 'NOT A': (~a) & mask, 'A << shift': (a << shift) & mask, 'A >> shift': a >> shift } };
}
const fields = ['a', 'b', 'width', 'shift'].map(id => document.querySelector('#' + id));
const output = document.querySelector('#output'), status = document.querySelector('#status');
function update() {
  output.value = ''; status.className = 'status-note info';
  try {
    const result = calculateBits(...fields.map(field => field.value));
    output.value = Object.entries(result.values).map(([label, value]) => `${label}\nDecimal: ${value}\nHex: 0x${value.toString(16).toUpperCase().padStart(result.width / 4, '0')}\nBinary: ${value.toString(2).padStart(result.width, '0')}`).join('\n\n');
    status.textContent = `Exact unsigned ${result.width}-bit results.`;
  } catch (error) { status.textContent = error.message; status.className = 'status-note error'; }
}
fields.forEach(field => { field.addEventListener('input', update); field.addEventListener('change', update); });
document.querySelector('#sample').addEventListener('click', () => { ['170', '15', '8', '1'].forEach((value, i) => { fields[i].value = value; }); update(); });
document.querySelector('#copy').addEventListener('click', async () => { if (!output.value) return; try { await navigator.clipboard.writeText(output.value); status.textContent = 'Result copied.'; } catch { status.textContent = 'Copy unavailable. Select and copy the result manually.'; } });
update();
