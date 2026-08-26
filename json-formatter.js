const jsonSource = document.querySelector('#json-source');
const jsonResult = document.querySelector('#json-result');
const jsonStatus = document.querySelector('#json-status');
const jsonFacts = document.querySelector('#json-facts');

function setJsonStatus(kind, message) {
  jsonStatus.className = `status-note ${kind}`;
  jsonStatus.textContent = message;
}

function renderJsonFacts(parsed, sourceText) {
  const type = Array.isArray(parsed) ? 'Array' : parsed === null ? 'Null' : typeof parsed === 'object' ? 'Object' : typeof parsed;
  const keys = parsed && typeof parsed === 'object' && !Array.isArray(parsed) ? Object.keys(parsed).length : 0;
  const items = Array.isArray(parsed) ? parsed.length : 0;
  const lines = sourceText ? sourceText.split(/\r?\n/).length : 0;

  jsonFacts.innerHTML = [
    `<li><b>Type</b>${type}</li>`,
    `<li><b>Top-level keys</b>${keys}</li>`,
    `<li><b>Array items</b>${items}</li>`,
    `<li><b>Input lines</b>${lines}</li>`
  ].join('');
}

function deepSortJson(value) {
  if (Array.isArray(value)) {
    return value.map(deepSortJson);
  }

  if (value && typeof value === 'object') {
    return Object.keys(value)
      .sort((left, right) => left.localeCompare(right))
      .reduce((sorted, key) => {
        sorted[key] = deepSortJson(value[key]);
        return sorted;
      }, {});
  }

  return value;
}

function parseJsonInput() {
  const raw = jsonSource.value.trim();
  if (!raw) {
    jsonResult.value = '';
    jsonFacts.innerHTML = '';
    setJsonStatus('info', 'Paste JSON to validate, format, or minify it.');
    return null;
  }

  try {
    const parsed = JSON.parse(jsonSource.value);
    renderJsonFacts(parsed, jsonSource.value);
    setJsonStatus('success', 'Valid JSON detected. Choose an action to format, minify, or sort keys.');
    return parsed;
  } catch (error) {
    jsonResult.value = '';
    jsonFacts.innerHTML = '';
    setJsonStatus('error', error.message);
    return null;
  }
}

function updateJsonOutput(mode) {
  const parsed = parseJsonInput();
  if (parsed === null) {
    return;
  }

  if (mode === 'minify') {
    jsonResult.value = JSON.stringify(parsed);
    return;
  }

  if (mode === 'sort') {
    jsonResult.value = JSON.stringify(deepSortJson(parsed), null, 2);
    return;
  }

  jsonResult.value = JSON.stringify(parsed, null, 2);
}

document.querySelector('#json-format').addEventListener('click', () => updateJsonOutput('format'));
document.querySelector('#json-minify').addEventListener('click', () => updateJsonOutput('minify'));
document.querySelector('#json-sort').addEventListener('click', () => updateJsonOutput('sort'));

document.querySelector('#json-copy').addEventListener('click', async (event) => {
  if (!jsonResult.value) {
    return;
  }

  try {
    await navigator.clipboard.writeText(jsonResult.value);
  } catch {
    jsonResult.select();
    document.execCommand('copy');
  }

  event.target.textContent = 'Copied ✓';
  setTimeout(() => {
    event.target.textContent = 'Copy output';
  }, 1400);
});

document.querySelector('#json-clear').addEventListener('click', () => {
  jsonSource.value = '';
  jsonResult.value = '';
  jsonFacts.innerHTML = '';
  setJsonStatus('info', 'Paste JSON to validate, format, or minify it.');
  jsonSource.focus();
});

jsonSource.addEventListener('input', parseJsonInput);
parseJsonInput();
