function calendarDay(value) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) throw new Error('Choose two valid dates from year 0001 through 9999.');
  const [year, month, day] = value.split('-').map(Number);
  const date = new Date(0);
  date.setUTCHours(0, 0, 0, 0);
  date.setUTCFullYear(year, month - 1, day);
  if (year < 1 || date.getUTCFullYear() !== year || date.getUTCMonth() !== month - 1 || date.getUTCDate() !== day) throw new Error('Choose valid Gregorian calendar dates.');
  return date.getTime() / 86400000;
}
function dateDifference(start, end, inclusive) {
  const days = calendarDay(end) - calendarDay(start);
  const absolute = Math.abs(days);
  return `Signed elapsed days: ${days}\nAbsolute span: ${Math.floor(absolute / 7)} weeks and ${absolute % 7} days${inclusive ? `\nInclusive date count: ${absolute + 1}` : ''}`;
}
const $ = id => document.getElementById(id);
function update() {
  try {
    $('output').value = $('start').value && $('end').value ? dateDifference($('start').value, $('end').value, $('inclusive').checked) : '';
    $('status').textContent = $('output').value ? 'Calendar date difference ready.' : 'Choose both dates to calculate.';
    $('status').className = 'status-note info';
  } catch (error) { $('output').value = ''; $('status').textContent = error.message; $('status').className = 'status-note error'; }
}
for (const id of ['start', 'end', 'inclusive']) $(id).addEventListener('input', update);
$('sample').addEventListener('click', () => { $('start').value = '2024-02-28'; $('end').value = '2024-03-01'; $('inclusive').checked = true; update(); });
$('clear').addEventListener('click', () => { $('start').value = ''; $('end').value = ''; update(); $('start').focus(); });
$('copy').addEventListener('click', async () => { try { await navigator.clipboard.writeText($('output').value); $('status').textContent = 'Result copied.'; } catch { $('status').textContent = 'Select and copy the result manually.'; $('output').focus(); $('output').select(); } });
update();
