const baseDigits = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';

function normalizeBaseInput(value) {
  return String(value || '')
    .trim()
    .replace(/[\s_]+/g, '')
    .toUpperCase();
}

function ensureSupportedBase(base) {
  const numericBase = Number(base);

  if (!Number.isInteger(numericBase) || numericBase < 2 || numericBase > 36) {
    throw new Error('Choose a base between 2 and 36.');
  }

  return numericBase;
}

function parseBaseInteger(rawValue, base) {
  const numericBase = ensureSupportedBase(base);
  const normalized = normalizeBaseInput(rawValue);

  if (!normalized) {
    throw new Error('Enter an integer to convert.');
  }

  const sign = normalized.startsWith('-') ? -1n : 1n;
  const unsigned = normalized.replace(/^[+-]/, '');

  if (!unsigned) {
    throw new Error('Enter at least one digit after the sign.');
  }

  let result = 0n;

  for (const character of unsigned) {
    const digit = baseDigits.indexOf(character);

    if (digit < 0 || digit >= numericBase) {
      throw new Error(`"${character}" is not valid in base ${numericBase}.`);
    }

    result = result * BigInt(numericBase) + BigInt(digit);
  }

  return sign * result;
}

function formatInBase(value, base) {
  const numericBase = ensureSupportedBase(base);

  return value.toString(numericBase).toUpperCase();
}

function groupDigits(value, size) {
  const text = String(value);
  const sign = text.startsWith('-') ? '-' : '';
  const body = sign ? text.slice(1) : text;

  return `${sign}${body.replace(new RegExp(`(.{${size}})(?=.)`, 'g'), '$1 ').trim()}`;
}

function createBaseConversion(rawValue, sourceBase, targetBase) {
  const parsed = parseBaseInteger(rawValue, sourceBase);
  const decimal = formatInBase(parsed, 10);
  const binary = formatInBase(parsed, 2);
  const octal = formatInBase(parsed, 8);
  const hexadecimal = formatInBase(parsed, 16);
  const target = formatInBase(parsed, targetBase);
  const absoluteBinaryLength = binary.replace('-', '').length;

  return {
    normalizedInput: normalizeBaseInput(rawValue),
    decimal,
    binary,
    octal,
    hexadecimal,
    target,
    targetBase: Number(targetBase),
    isNegative: parsed < 0n,
    digitCount: normalizeBaseInput(rawValue).replace(/^[+-]/, '').length,
    bitLength: parsed === 0n ? 1 : absoluteBinaryLength,
    groupedBinary: groupDigits(binary, 4),
    groupedHexadecimal: groupDigits(hexadecimal, 4)
  };
}

function initNumberBaseConverter(doc = document) {
  const sourceValue = doc.querySelector('#base-source-value');
  const sourceBase = doc.querySelector('#base-source-base');
  const targetBase = doc.querySelector('#base-target-base');
  const status = doc.querySelector('#base-status');
  const output = doc.querySelector('#base-output');
  const facts = doc.querySelector('#base-facts');

  if (!sourceValue || !sourceBase || !targetBase || !status || !output || !facts) {
    return null;
  }

  const decimalCard = doc.querySelector('#base-decimal');
  const binaryCard = doc.querySelector('#base-binary');
  const octalCard = doc.querySelector('#base-octal');
  const hexadecimalCard = doc.querySelector('#base-hex');

  function setStatus(kind, message) {
    status.className = `status-note ${kind}`;
    status.textContent = message;
  }

  function clearCards() {
    output.value = '';
    decimalCard.textContent = '--';
    binaryCard.textContent = '--';
    octalCard.textContent = '--';
    hexadecimalCard.textContent = '--';
    facts.innerHTML = '';
  }

  function renderFacts(result) {
    facts.innerHTML = [
      ['Detected sign', result.isNegative ? 'Negative integer' : 'Non-negative integer'],
      ['Source digits', String(result.digitCount)],
      ['Binary bits', String(result.bitLength)],
      [`Base ${result.targetBase} output`, `${result.target.length} digit(s)`]
    ]
      .map(([label, value]) => `<li><b>${label}</b>${value}</li>`)
      .join('');
  }

  function convert() {
    try {
      const result = createBaseConversion(sourceValue.value, sourceBase.value, targetBase.value);
      output.value = result.target;
      decimalCard.textContent = result.decimal;
      binaryCard.textContent = result.groupedBinary;
      octalCard.textContent = result.octal;
      hexadecimalCard.textContent = result.groupedHexadecimal;
      renderFacts(result);
      setStatus('success', `Converted from base ${sourceBase.value} to base ${targetBase.value} locally in your browser.`);
    } catch (error) {
      clearCards();
      setStatus('error', error.message || 'Unable to convert this number.');
    }
  }

  async function copyResult(button) {
    if (!output.value) {
      return;
    }

    try {
      await navigator.clipboard.writeText(output.value);
    } catch {
      output.select();
      doc.execCommand('copy');
    }

    const originalLabel = button.textContent;
    button.textContent = 'Copied ✓';
    setTimeout(() => {
      button.textContent = originalLabel;
    }, 1400);
  }

  doc.querySelector('#base-convert').addEventListener('click', convert);
  doc.querySelector('#base-swap').addEventListener('click', () => {
    const previousSource = sourceBase.value;
    sourceBase.value = targetBase.value;
    targetBase.value = previousSource;
    if (output.value) {
      sourceValue.value = output.value;
      convert();
    }
  });
  doc.querySelector('#base-copy').addEventListener('click', (event) => copyResult(event.target));
  doc.querySelector('#base-sample').addEventListener('click', () => {
    sourceValue.value = '111100001111';
    sourceBase.value = '2';
    targetBase.value = '16';
    convert();
  });
  doc.querySelector('#base-clear').addEventListener('click', () => {
    sourceValue.value = '';
    sourceBase.value = '10';
    targetBase.value = '16';
    clearCards();
    setStatus('info', 'Enter an integer, choose the source and target bases, then run the conversion.');
    sourceValue.focus();
  });

  clearCards();
  setStatus('info', 'Enter an integer, choose the source and target bases, then run the conversion.');

  return { convert, clearCards };
}

if (typeof document !== 'undefined') {
  initNumberBaseConverter(document);
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    normalizeBaseInput,
    ensureSupportedBase,
    parseBaseInteger,
    formatInBase,
    groupDigits,
    createBaseConversion,
    initNumberBaseConverter
  };
}
