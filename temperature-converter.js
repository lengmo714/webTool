function convertTemperature(raw, unit) {
  const text = raw.trim();
  if (!text || text.length > 100 || !/^[+-]?(?:\d+(?:\.\d*)?|\.\d+)(?:e[+-]?\d+)?$/i.test(text)) throw new Error('Enter a valid decimal temperature (up to 100 characters).');
  const value = Number(text);
  const minimum = { C: -273.15, F: -459.67, K: 0 };
  if (!(unit in minimum) || !Number.isFinite(value) || Math.abs(value) > 1e15) throw new Error('Choose a valid unit and a finite temperature no larger than 10^15 in magnitude.');
  if (value < minimum[unit]) throw new Error('Temperature cannot be below absolute zero.');
  const c = unit === 'C' ? value : unit === 'F' ? (value - 32) * 5 / 9 : value - 273.15;
  const values = { C: c, F: c * 9 / 5 + 32, K: Math.max(0, c + 273.15) };
  values[unit] = value;
  if (Object.values(values).some(v => Math.abs(v) > 1e15)) throw new Error('Converted temperature exceeds the supported magnitude of 10^15.');
  return values;
}
const source = document.getElementById('source');
const unit = document.getElementById('unit');
const output = document.getElementById('output');
const status = document.getElementById('status');
function update() {
  output.value = '';
  status.className = 'status-note info';
  if (!source.value.trim()) { status.textContent = 'Enter a temperature to begin.'; return; }
  try {
    const t = convertTemperature(source.value, unit.value);
    const format = n => String(Number(n.toPrecision(12)));
    output.value = `Celsius: ${format(t.C)} °C\nFahrenheit: ${format(t.F)} °F\nKelvin: ${format(t.K)} K`;
    status.textContent = 'Converted locally. Results rounded to 12 significant digits.';
  } catch (error) { status.textContent = error.message; status.className = 'status-note error'; }
}
source.addEventListener('input', update);
unit.addEventListener('change', update);
document.getElementById('sample').addEventListener('click', () => { source.value = '98.6'; unit.value = 'F'; update(); });
document.getElementById('clear').addEventListener('click', () => { source.value = ''; update(); source.focus(); });
document.getElementById('copy').addEventListener('click', async () => {
  try { await navigator.clipboard.writeText(output.value); status.textContent = 'Result copied.'; }
  catch { status.textContent = 'Select and copy the result manually.'; output.focus(); output.select(); }
});
update();
