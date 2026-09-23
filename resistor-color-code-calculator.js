'use strict';
const colors = ['Black', 'Brown', 'Red', 'Orange', 'Yellow', 'Green', 'Blue', 'Violet', 'Gray', 'White'];
const tolerances = { Brown: 1, Red: 2, Green: 0.5, Blue: 0.25, Violet: 0.1, Gray: 0.05, Gold: 5, Silver: 10 };
function decodeResistor(first, second, multiplier, tolerance) {
  const a = colors.indexOf(first), b = colors.indexOf(second);
  const exponent = multiplier === 'Gold' ? -1 : multiplier === 'Silver' ? -2 : colors.indexOf(multiplier);
  if (a < 1 || b < 0 || (![...colors, 'Gold', 'Silver'].includes(multiplier)) || !Object.hasOwn(tolerances, tolerance)) throw new Error('Select valid colors for all four bands.');
  const ohms = (10 * a + b) * 10 ** exponent, percent = tolerances[tolerance];
  return { ohms, percent, minimum: ohms * (1 - percent / 100), maximum: ohms * (1 + percent / 100) };
}
const fields = ['first', 'second', 'multiplier', 'tolerance'].map(id => document.querySelector('#' + id));
[colors.slice(1), colors, [...colors, 'Gold', 'Silver'], Object.keys(tolerances)].forEach((choices, i) => {
  choices.forEach(color => { const option = document.createElement('option'); option.value = color; option.textContent = color; fields[i].appendChild(option); });
});
const output = document.querySelector('#output'), status = document.querySelector('#status');
function format(value) { return Number(value.toPrecision(12)).toLocaleString('en-US', { maximumFractionDigits: 10 }); }
function update() {
  output.value = ''; status.className = 'status-note info';
  try {
    const result = decodeResistor(...fields.map(field => field.value));
    const scaled = result.ohms >= 1e9 ? `${format(result.ohms / 1e9)} GΩ` : result.ohms >= 1e6 ? `${format(result.ohms / 1e6)} MΩ` : result.ohms >= 1e3 ? `${format(result.ohms / 1e3)} kΩ` : `${format(result.ohms)} Ω`;
    output.value = `Nominal resistance: ${scaled}\nOhms: ${format(result.ohms)} Ω\nTolerance: ±${result.percent}%\nMinimum: ${format(result.minimum)} Ω\nMaximum: ${format(result.maximum)} Ω`;
    status.textContent = fields.map(field => field.value).join(' → ');
  } catch (error) { status.textContent = error.message; status.className = 'status-note error'; }
}
function sample() { ['Brown', 'Black', 'Red', 'Gold'].forEach((value, i) => { fields[i].value = value; }); update(); }
fields.forEach(field => field.addEventListener('change', update));
document.querySelector('#sample').addEventListener('click', sample);
document.querySelector('#copy').addEventListener('click', async () => { if (!output.value) return; try { await navigator.clipboard.writeText(output.value); status.textContent = 'Result copied.'; } catch { status.textContent = 'Copy unavailable. Select and copy the result manually.'; } });
sample();
