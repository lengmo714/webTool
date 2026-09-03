const romanPairs = [
  ['M', 1000],
  ['CM', 900],
  ['D', 500],
  ['CD', 400],
  ['C', 100],
  ['XC', 90],
  ['L', 50],
  ['XL', 40],
  ['X', 10],
  ['IX', 9],
  ['V', 5],
  ['IV', 4],
  ['I', 1]
];

const romanPattern = /^(M{0,3})(CM|CD|D?C{0,3})(XC|XL|L?X{0,3})(IX|IV|V?I{0,3})$/;

function normalizeRomanInput(value) {
  return String(value || '')
    .toUpperCase()
    .replace(/\s+/g, '')
    .trim();
}

function integerToRoman(value) {
  const number = Number(value);

  if (!Number.isInteger(number) || number < 1 || number > 3999) {
    throw new Error('Enter a whole number from 1 to 3999.');
  }

  let remaining = number;
  let roman = '';

  for (const [symbol, amount] of romanPairs) {
    while (remaining >= amount) {
      roman += symbol;
      remaining -= amount;
    }
  }

  return roman;
}

function romanToInteger(value) {
  const roman = normalizeRomanInput(value);

  if (!roman) {
    throw new Error('Enter a Roman numeral to convert.');
  }

  if (!romanPattern.test(roman)) {
    throw new Error('Use a standard Roman numeral from I to MMMCMXCIX.');
  }

  let remaining = roman;
  let total = 0;

  for (const [symbol, amount] of romanPairs) {
    while (remaining.startsWith(symbol)) {
      total += amount;
      remaining = remaining.slice(symbol.length);
    }
  }

  return total;
}

function initRomanNumeralConverter(doc = document) {
  const numberInput = doc.querySelector('#roman-number');
  const numeralInput = doc.querySelector('#roman-text');
  const output = doc.querySelector('#roman-output');
  const status = doc.querySelector('#roman-status');
  const facts = doc.querySelector('#roman-facts');

  if (!numberInput || !numeralInput || !output || !status || !facts) {
    return null;
  }

  function setStatus(kind, message) {
    status.className = `status-note ${kind}`;
    status.textContent = message;
  }

  function renderFacts(entries) {
    facts.innerHTML = entries
      .map(([label, value]) => `<li><b>${label}</b>${value}</li>`)
      .join('');
  }

  function convertToRoman() {
    try {
      const numeral = integerToRoman(numberInput.value);
      output.value = numeral;
      numeralInput.value = numeral;
      renderFacts([
        ['Conversion', 'Number to Roman'],
        ['Input value', String(Number(numberInput.value))],
        ['Output length', `${numeral.length} characters`],
        ['Standard range', '1 to 3999']
      ]);
      setStatus('success', 'Converted the number into a standard Roman numeral.');
    } catch (error) {
      output.value = '';
      facts.innerHTML = '';
      setStatus('error', error.message || 'Unable to convert this number.');
    }
  }

  function convertToNumber() {
    try {
      const numericValue = romanToInteger(numeralInput.value);
      const normalized = normalizeRomanInput(numeralInput.value);
      output.value = String(numericValue);
      numberInput.value = String(numericValue);
      numeralInput.value = normalized;
      renderFacts([
        ['Conversion', 'Roman to number'],
        ['Normalized numeral', normalized],
        ['Numeric value', String(numericValue)],
        ['Standard range', 'I to MMMCMXCIX']
      ]);
      setStatus('success', 'Converted the Roman numeral into its numeric value.');
    } catch (error) {
      output.value = '';
      facts.innerHTML = '';
      setStatus('error', error.message || 'Unable to convert this Roman numeral.');
    }
  }

  async function copyOutput(event) {
    if (!output.value) {
      return;
    }

    try {
      await navigator.clipboard.writeText(output.value);
    } catch {
      output.select();
      doc.execCommand('copy');
    }

    const button = event.target;
    const originalLabel = button.textContent;
    button.textContent = 'Copied ✓';
    setTimeout(() => {
      button.textContent = originalLabel;
    }, 1400);
  }

  doc.querySelector('#roman-to-roman').addEventListener('click', convertToRoman);
  doc.querySelector('#roman-to-number').addEventListener('click', convertToNumber);
  doc.querySelector('#roman-copy').addEventListener('click', copyOutput);
  doc.querySelector('#roman-sample').addEventListener('click', () => {
    numberInput.value = '2026';
    numeralInput.value = 'MMXXVI';
    output.value = 'MMXXVI';
    renderFacts([
      ['Conversion', 'Number to Roman'],
      ['Input value', '2026'],
      ['Output length', '6 characters'],
      ['Standard range', '1 to 3999']
    ]);
    setStatus('success', 'Loaded a sample conversion for 2026.');
  });
  doc.querySelector('#roman-clear').addEventListener('click', () => {
    numberInput.value = '';
    numeralInput.value = '';
    output.value = '';
    facts.innerHTML = '';
    setStatus('info', 'Enter a number or Roman numeral, then choose a conversion.');
    numberInput.focus();
  });

  setStatus('info', 'Enter a number or Roman numeral, then choose a conversion.');

  return { convertToRoman, convertToNumber };
}

if (typeof document !== 'undefined') {
  initRomanNumeralConverter(document);
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { normalizeRomanInput, integerToRoman, romanToInteger, initRomanNumeralConverter };
}
