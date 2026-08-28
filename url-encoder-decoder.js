const urlCodeSource = document.querySelector('#url-code-source');
const urlCodeResult = document.querySelector('#url-code-result');
const urlCodeStatus = document.querySelector('#url-code-status');
const urlCodeFacts = document.querySelector('#url-code-facts');

function setUrlCodeStatus(kind, message) {
  urlCodeStatus.className = `status-note ${kind}`;
  urlCodeStatus.textContent = message;
}

function renderUrlCodeFacts(mode, input, output) {
  const encodedSequences = (output.match(/%[0-9A-F]{2}/gi) || []).length;
  const facts = [['Mode', mode], ['Input characters', String([...input].length)], ['Output characters', String([...output].length)], ['Percent sequences', String(encodedSequences)]];
  urlCodeFacts.innerHTML = facts.map(([label, value]) => `<li><b>${label}</b>${value}</li>`).join('');
}

function convertUrlText(mode) {
  const source = urlCodeSource.value;
  if (!source) {
    urlCodeResult.value = '';
    urlCodeFacts.innerHTML = '';
    setUrlCodeStatus('info', 'Paste text, then choose whether to encode or decode it.');
    return;
  }
  try {
    const output = mode === 'encode' ? encodeURIComponent(source) : decodeURIComponent(source);
    urlCodeResult.value = output;
    renderUrlCodeFacts(mode === 'encode' ? 'Encode URL component' : 'Decode URL component', source, output);
    setUrlCodeStatus('success', mode === 'encode' ? 'Text encoded for a URL component.' : 'URL text decoded successfully.');
  } catch {
    urlCodeResult.value = '';
    urlCodeFacts.innerHTML = '';
    setUrlCodeStatus('error', 'That value contains an incomplete or invalid percent-encoded sequence.');
  }
}

async function copyUrlCodeOutput(event) {
  if (!urlCodeResult.value) return;
  try { await navigator.clipboard.writeText(urlCodeResult.value); } catch { urlCodeResult.select(); document.execCommand('copy'); }
  event.target.textContent = 'Copied ✓';
  setTimeout(() => { event.target.textContent = 'Copy output'; }, 1400);
}

document.querySelector('#url-encode').addEventListener('click', () => convertUrlText('encode'));
document.querySelector('#url-decode').addEventListener('click', () => convertUrlText('decode'));
document.querySelector('#url-copy').addEventListener('click', copyUrlCodeOutput);
document.querySelector('#url-swap').addEventListener('click', () => {
  if (!urlCodeResult.value) return;
  urlCodeSource.value = urlCodeResult.value;
  urlCodeResult.value = '';
  urlCodeFacts.innerHTML = '';
  setUrlCodeStatus('info', 'Output moved to the input. Choose the next action to continue.');
  urlCodeSource.focus();
});
document.querySelector('#url-clear').addEventListener('click', () => {
  urlCodeSource.value = '';
  urlCodeResult.value = '';
  urlCodeFacts.innerHTML = '';
  setUrlCodeStatus('info', 'Paste text, then choose whether to encode or decode it.');
  urlCodeSource.focus();
});
