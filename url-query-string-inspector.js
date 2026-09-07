function inspectQuery(input) {
  let query = input.trim();
  if (/^https?:\/\//i.test(query)) {
    try { query = new URL(query).search; }
    catch { throw new Error('Enter a valid absolute HTTP or HTTPS URL.'); }
  } else if (query.includes('?') && !query.startsWith('?')) {
    throw new Error('Paste an absolute HTTP/HTTPS URL or only its query string.');
  }
  query = query.replace(/^\?/, '').split('#')[0];
  const decode = value => decodeURIComponent(value.replace(/\+/g, ' '));
  try {
    return query.split('&').filter(Boolean).map(part => {
      const index = part.indexOf('=');
      return { key: decode(index < 0 ? part : part.slice(0, index)), value: decode(index < 0 ? '' : part.slice(index + 1)) };
    });
  } catch { throw new Error('Invalid percent escape or UTF-8 encoding in the query.'); }
}
function convert(text) { return text.trim() ? JSON.stringify(inspectQuery(text), null, 2) : ''; }
function loadSample() { source.value = 'https://example.com/search?q=hello+world&tag=red&tag=blue&empty=#results'; update(); }

const source = document.getElementById('source');
const output = document.getElementById('output');
const status = document.getElementById('status');
function update() {
  try { output.value = convert(source.value); status.textContent = source.value ? 'Result ready.' : 'Paste input to begin.'; status.className = 'status-note info'; }
  catch (error) { output.value = ''; status.textContent = error.message; status.className = 'status-note error'; }
}
source.addEventListener('input', update);
document.getElementById('sample').addEventListener('click', loadSample);
document.getElementById('clear').addEventListener('click', () => { source.value = ''; update(); source.focus(); });
document.getElementById('copy').addEventListener('click', async () => {
  try { await navigator.clipboard.writeText(output.value); status.textContent = 'Result copied.'; }
  catch { status.textContent = 'Copy unavailable. Select and copy the result manually.'; output.focus(); output.select(); }
});
update();
