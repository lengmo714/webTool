'use strict';
function findGaps(text) {
  if (text.length > 100000) throw new Error('Input is limited to 100,000 characters.');
  const values = text.replace(/\r\n?/g, '\n').split('\n').filter((line) => line.trim() !== '');
  if (values.length < 2) throw new Error('Enter at least two integer values on separate lines.');
  const nums = values.map((line, index) => { if (!/^[+-]?\d+$/.test(line.trim())) throw new Error(`Line ${index + 1} is not an integer.`); return BigInt(line.trim()); });
  let direction = 0, missing = 0n, ranges = [];
  for (let i = 1; i < nums.length; i++) {
    const delta = nums[i] - nums[i - 1];
    if (delta === 0n) throw new Error(`Lines ${i} and ${i + 1} repeat the same value.`);
    const step = delta > 0n ? 1 : -1;
    if (direction === 0) direction = step;
    if (step !== direction) throw new Error('Values must be consistently ascending or descending.');
    const count = (delta * BigInt(step)) - 1n;
    if (count > 0n) { missing += count; ranges.push(`${nums[i - 1] + BigInt(step)}${count === 1n ? '' : ' through ' + (nums[i] - BigInt(step))}`); }
  }
  const shown = ranges.slice(0, 100);
  return `Values read: ${nums.length}\nOrder: ${direction > 0 ? 'ascending' : 'descending'}\nMissing integers: ${missing}\nGaps found: ${ranges.length}\n\n${ranges.length ? 'Missing ranges:\n' + shown.map((range, index) => `${index + 1}. ${range}`).join('\n') + (ranges.length > shown.length ? `\n… ${ranges.length - shown.length} more ranges not shown.` : '') : 'No gaps — every adjacent value differs by one.'}`;
}
const source = document.querySelector('#source'), output = document.querySelector('#output'), status = document.querySelector('#status');
function update() { output.value = ''; status.className = 'status-note info'; try { output.value = findGaps(source.value); status.textContent = 'Checked exactly with browser BigInt arithmetic.'; } catch (error) { status.textContent = error.message; status.className = 'status-note error'; } }
source.addEventListener('input', update); source.addEventListener('change', update);
document.querySelector('#sample').addEventListener('click', () => { source.value = '100\n101\n105\n106\n110'; update(); });
document.querySelector('#clear').addEventListener('click', () => { source.value = ''; output.value = ''; status.textContent = 'Enter integer values to check.'; status.className = 'status-note info'; source.focus(); });
document.querySelector('#copy').addEventListener('click', async () => { if (!output.value) return; try { await navigator.clipboard.writeText(output.value); status.textContent = 'Report copied.'; } catch { status.textContent = 'Copy unavailable. Select and copy the report manually.'; } });
update();
