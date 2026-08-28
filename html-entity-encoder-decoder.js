const entitySource = document.querySelector('#entity-source');
const entityResult = document.querySelector('#entity-result');
const entityStatus = document.querySelector('#entity-status');
const entityFacts = document.querySelector('#entity-facts');

function setEntityStatus(kind, message) {
  entityStatus.className = `status-note ${kind}`;
  entityStatus.textContent = message;
}

function encodeHtmlEntities(value) {
  return value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#39;');
}

function decodeHtmlEntities(value) {
  const textarea = document.createElement('textarea');
  textarea.innerHTML = value;
  return textarea.value;
}

function renderEntityFacts(mode, input, output) {
  const entities = (output.match(/&(?:#\d+|#x[\da-f]+|[a-z][\da-z]+);/gi) || []).length;
  const facts = [['Mode', mode], ['Input characters', String([...input].length)], ['Output characters', String([...output].length)], ['Entities in output', String(entities)]];
  entityFacts.innerHTML = facts.map(([label, value]) => `<li><b>${label}</b>${value}</li>`).join('');
}

function convertEntities(mode) {
  const source = entitySource.value;
  if (!source) {
    entityResult.value = '';
    entityFacts.innerHTML = '';
    setEntityStatus('info', 'Paste text, then choose whether to encode or decode it.');
    return;
  }
  const output = mode === 'encode' ? encodeHtmlEntities(source) : decodeHtmlEntities(source);
  entityResult.value = output;
  renderEntityFacts(mode === 'encode' ? 'Encode HTML text' : 'Decode entities', source, output);
  setEntityStatus('success', mode === 'encode' ? 'HTML-sensitive characters encoded.' : 'HTML entities decoded successfully.');
}

async function copyEntityOutput(event) {
  if (!entityResult.value) return;
  try { await navigator.clipboard.writeText(entityResult.value); } catch { entityResult.select(); document.execCommand('copy'); }
  event.target.textContent = 'Copied ✓';
  setTimeout(() => { event.target.textContent = 'Copy output'; }, 1400);
}

document.querySelector('#entity-encode').addEventListener('click', () => convertEntities('encode'));
document.querySelector('#entity-decode').addEventListener('click', () => convertEntities('decode'));
document.querySelector('#entity-copy').addEventListener('click', copyEntityOutput);
document.querySelector('#entity-swap').addEventListener('click', () => {
  if (!entityResult.value) return;
  entitySource.value = entityResult.value;
  entityResult.value = '';
  entityFacts.innerHTML = '';
  setEntityStatus('info', 'Output moved to the input. Choose the next action to continue.');
  entitySource.focus();
});
document.querySelector('#entity-clear').addEventListener('click', () => {
  entitySource.value = '';
  entityResult.value = '';
  entityFacts.innerHTML = '';
  setEntityStatus('info', 'Paste text, then choose whether to encode or decode it.');
  entitySource.focus();
});
