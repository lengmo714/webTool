'use strict';
function countSelections(nText, rText) {
  const inputs = [nText.trim(), rText.trim()];
  if (inputs.some(value => !/^\d{1,4}$/.test(value) || Number(value) > 1000)) throw new Error('Enter whole numbers from 0 to 1,000.');
  const [n, r] = inputs.map(Number);
  if (r > n) throw new Error('Items selected (r) cannot exceed total items (n).');
  let permutations = 1n, combinations = 1n;
  for (let i = 0; i < r; i++) permutations *= BigInt(n - i);
  const k = Math.min(r, n - r);
  for (let i = 1; i <= k; i++) combinations = combinations * BigInt(n - k + i) / BigInt(i);
  return { combinations: combinations.toString(), permutations: permutations.toString() };
}
const source = document.querySelector('#source'), chosen = document.querySelector('#chosen'), output = document.querySelector('#output'), status = document.querySelector('#status');
function update() {
  output.value = ''; status.className = 'status-note info'; status.textContent = 'Enter the total number of items to begin.';
  if (!source.value.trim()) return;
  try { const result = countSelections(source.value, chosen.value); output.value = `Combinations (nCr): ${result.combinations}\n\nPermutations (nPr): ${result.permutations}`; status.textContent = 'Exact counts without repetition.'; }
  catch (error) { status.textContent = error.message; status.className = 'status-note error'; }
}
source.addEventListener('input', update); chosen.addEventListener('input', update);
document.querySelector('#sample').addEventListener('click', () => { source.value = '52'; chosen.value = '5'; update(); });
document.querySelector('#clear').addEventListener('click', () => { source.value = ''; update(); });
document.querySelector('#copy').addEventListener('click', async () => { if (!output.value) return; try { await navigator.clipboard.writeText(output.value); status.textContent = 'Result copied.'; } catch { status.textContent = 'Copy unavailable. Select and copy the result manually.'; } });
update();
