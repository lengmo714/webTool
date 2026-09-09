function gcd(a, b) { while (b) { [a, b] = [b, a % b]; } return a; }
function calculateGcdLcm(text) {
  if (text.length > 11000) throw new Error('Input is too long. Use up to 100 integers of at most 100 digits each.');
  const tokens = text.trim().split(/[\s,]+/);
  if (tokens.length < 2 || tokens.length > 100) throw new Error('Enter 2 to 100 integers separated by spaces, commas, or newlines.');
  if (tokens.some(token => !/^[+-]?\d{1,100}$/.test(token))) throw new Error('Use whole numbers of at most 100 digits, without decimals or exponent notation.');
  const numbers = tokens.map(token => { const n = BigInt(token); return n < 0n ? -n : n; });
  const divisor = numbers.reduce(gcd);
  const multiple = numbers.reduce((a, b) => a === 0n || b === 0n ? 0n : (a / gcd(a, b)) * b);
  return `Greatest common divisor (GCD): ${divisor}\nLeast common multiple (LCM): ${multiple}\nIntegers processed: ${numbers.length}`;
}
const source = document.getElementById('source');
const output = document.getElementById('output');
const status = document.getElementById('status');
function update() {
  try {
    output.value = source.value.trim() ? calculateGcdLcm(source.value) : '';
    status.textContent = output.value ? 'Calculated with exact integer arithmetic.' : 'Enter at least two integers.';
    status.className = 'status-note info';
  } catch (error) { output.value = ''; status.textContent = error.message; status.className = 'status-note error'; }
}
source.addEventListener('input', update);
document.getElementById('sample').addEventListener('click', () => { source.value = '12, 18, 30'; update(); });
document.getElementById('clear').addEventListener('click', () => { source.value = ''; update(); source.focus(); });
document.getElementById('copy').addEventListener('click', async () => {
  try { await navigator.clipboard.writeText(output.value); status.textContent = 'Result copied.'; }
  catch { status.textContent = 'Select and copy the result manually.'; output.focus(); output.select(); }
});
update();
