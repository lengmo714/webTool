function wrapLines(text, prefix, suffix, skipBlank = true) {
  if (!text) return '';
  const normalized = text.replace(/\r\n?/g, '\n');
  const trailing = normalized.endsWith('\n');
  const lines = (trailing ? normalized.slice(0, -1) : normalized).split('\n');
  return lines.map(line => skipBlank && !line.trim() ? line : prefix + line + suffix).join('\n') + (trailing ? '\n' : '');
}
const source = document.getElementById('source');
const output = document.getElementById('output');
const status = document.getElementById('status');
const prefix = document.getElementById('prefix');
const suffix = document.getElementById('suffix');
const skip = document.getElementById('skip');
function update() {
  output.value = wrapLines(source.value, prefix.value, suffix.value, skip.checked);
  status.textContent = source.value ? 'Result ready. Original spaces are preserved.' : 'Paste a list and enter a prefix or suffix.';
}
[source, prefix, suffix].forEach(element => element.addEventListener('input', update));
skip.addEventListener('change', update);
document.getElementById('sample').addEventListener('click', () => { source.value = 'apple\nbanana\n\ncherry\n'; prefix.value = '<li>'; suffix.value = '</li>'; update(); });
document.getElementById('clear').addEventListener('click', () => { source.value = ''; update(); source.focus(); });
document.getElementById('copy').addEventListener('click', async () => {
  try { await navigator.clipboard.writeText(output.value); status.textContent = 'Result copied.'; }
  catch { status.textContent = 'Copy unavailable. Select and copy the result manually.'; output.focus(); output.select(); }
});
update();
