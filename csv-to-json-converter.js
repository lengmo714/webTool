function parseCsvText(source, delimiter) {
  const rows = [];
  let row = [];
  let cell = '';
  let inQuotes = false;

  for (let index = 0; index < source.length; index += 1) {
    const character = source[index];
    const nextCharacter = source[index + 1];

    if (character === '"') {
      if (inQuotes && nextCharacter === '"') {
        cell += '"';
        index += 1;
      } else {
        inQuotes = !inQuotes;
      }
      continue;
    }

    if (!inQuotes && character === delimiter) {
      row.push(cell);
      cell = '';
      continue;
    }

    if (!inQuotes && (character === '\n' || character === '\r')) {
      if (character === '\r' && nextCharacter === '\n') {
        index += 1;
      }

      row.push(cell);
      rows.push(row);
      row = [];
      cell = '';
      continue;
    }

    cell += character;
  }

  if (inQuotes) {
    throw new Error('The CSV input has an unmatched quote.');
  }

  row.push(cell);
  rows.push(row);

  while (rows.length && rows[rows.length - 1].length === 1 && rows[rows.length - 1][0] === '') {
    rows.pop();
  }

  return rows;
}

function detectDelimiter(source) {
  const candidates = [',', ';', '\t', '|'];
  let best = ',';
  let bestScore = -1;

  for (const candidate of candidates) {
    try {
      const rows = parseCsvText(source, candidate).filter((row) => row.some((cell) => cell !== ''));
      const widths = rows.map((row) => row.length);

      if (!widths.length) {
        continue;
      }

      const average = widths.reduce((sum, width) => sum + width, 0) / widths.length;
      const variance = widths.reduce((sum, width) => sum + Math.abs(width - average), 0);
      const score = average > 1 ? average * 10 - variance : 0;

      if (score > bestScore) {
        best = candidate;
        bestScore = score;
      }
    } catch {
      // Ignore failed delimiter guesses.
    }
  }

  return best;
}

function makeUniqueHeaders(headerRow) {
  const counts = new Map();

  return headerRow.map((value, index) => {
    const normalized = value.trim() || `column_${index + 1}`;
    const currentCount = counts.get(normalized) || 0;
    counts.set(normalized, currentCount + 1);
    return currentCount ? `${normalized}_${currentCount + 1}` : normalized;
  });
}

function rowsToJson(rows, useHeaders) {
  if (!rows.length) {
    return [];
  }

  if (!useHeaders) {
    return rows;
  }

  const headers = makeUniqueHeaders(rows[0]);
  const dataRows = rows.slice(1);

  return dataRows.map((row) => {
    const entry = {};

    headers.forEach((header, index) => {
      entry[header] = row[index] ?? '';
    });

    return entry;
  });
}

function initCsvToJsonConverter(doc = document) {
  const source = doc.querySelector('#csv-source');
  const resultField = doc.querySelector('#csv-result');
  const status = doc.querySelector('#csv-status');
  const facts = doc.querySelector('#csv-facts');
  const delimiterField = doc.querySelector('#csv-delimiter');
  const headerToggle = doc.querySelector('#csv-headers');

  if (!source || !resultField || !status || !facts || !delimiterField || !headerToggle) {
    return null;
  }

  function setStatus(kind, message) {
    status.className = `status-note ${kind}`;
    status.textContent = message;
  }

  function clearOutput(message) {
    resultField.value = '';
    facts.innerHTML = '';
    setStatus('info', message);
  }

  function renderFacts(rows, delimiter) {
    const hasHeaders = headerToggle.checked;
    const dataRowCount = hasHeaders ? Math.max(rows.length - 1, 0) : rows.length;
    const columnCount = rows.reduce((max, row) => Math.max(max, row.length), 0);
    const delimiterLabels = { ',': 'Comma', ';': 'Semicolon', '\t': 'Tab', '|': 'Pipe' };

    facts.innerHTML = [
      ['Delimiter', delimiterLabels[delimiter] || delimiter],
      ['Rows', String(dataRowCount)],
      ['Columns', String(columnCount)],
      ['Headers', hasHeaders ? 'First row used as keys' : 'Output as arrays']
    ]
      .map(([label, value]) => `<li><b>${label}</b>${value}</li>`)
      .join('');
  }

  function resolveDelimiter() {
    if (delimiterField.value === 'auto') {
      return detectDelimiter(source.value);
    }

    return delimiterField.value === 'tab' ? '\t' : delimiterField.value;
  }

  function convert(mode) {
    if (!source.value.trim()) {
      clearOutput('Paste CSV text to convert it into JSON.');
      return;
    }

    try {
      const delimiter = resolveDelimiter();
      const rows = parseCsvText(source.value, delimiter);
      const output = rowsToJson(rows, headerToggle.checked);

      resultField.value = mode === 'compact' ? JSON.stringify(output) : JSON.stringify(output, null, 2);
      renderFacts(rows, delimiter);
      setStatus('success', 'CSV converted to JSON locally in your browser.');
    } catch (error) {
      resultField.value = '';
      facts.innerHTML = '';
      setStatus('error', error.message || 'Unable to parse this CSV input.');
    }
  }

  async function copyOutput(event) {
    if (!resultField.value) {
      return;
    }

    try {
      await navigator.clipboard.writeText(resultField.value);
    } catch {
      resultField.select();
      doc.execCommand('copy');
    }

    const button = event.target;
    button.textContent = 'Copied ✓';
    setTimeout(() => {
      button.textContent = 'Copy JSON';
    }, 1400);
  }

  doc.querySelector('#csv-convert').addEventListener('click', () => convert('pretty'));
  doc.querySelector('#csv-compact').addEventListener('click', () => convert('compact'));
  doc.querySelector('#csv-copy').addEventListener('click', copyOutput);
  doc.querySelector('#csv-sample').addEventListener('click', () => {
    source.value = [
      'name,email,plan',
      '"Ada Lovelace",ada@example.com,Pro',
      '"Grace Hopper",grace@example.com,Team',
      '"Linus Torvalds",linus@example.com,Free'
    ].join('\n');
    convert('pretty');
  });
  doc.querySelector('#csv-clear').addEventListener('click', () => {
    source.value = '';
    clearOutput('Paste CSV text to convert it into JSON.');
    source.focus();
  });

  clearOutput('Paste CSV text to convert it into JSON.');

  return { convert, clearOutput };
}

if (typeof document !== 'undefined') {
  initCsvToJsonConverter(document);
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { parseCsvText, detectDelimiter, makeUniqueHeaders, rowsToJson, initCsvToJsonConverter };
}
