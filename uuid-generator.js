function getUuidCryptoProvider() {
  if (globalThis.crypto && typeof globalThis.crypto.getRandomValues === 'function') {
    return globalThis.crypto;
  }

  if (typeof require === 'function') {
    return require('node:crypto').webcrypto;
  }

  throw new Error('Secure random values are not available in this environment.');
}

function bytesToUuid(bytes, { uppercase = false, hyphenless = false } = {}) {
  const hex = Array.from(bytes, (byte) => byte.toString(16).padStart(2, '0'));
  const canonical = `${hex.slice(0, 4).join('')}-${hex.slice(4, 6).join('')}-${hex.slice(6, 8).join('')}-${hex.slice(8, 10).join('')}-${hex.slice(10).join('')}`;
  const formatted = hyphenless ? canonical.replace(/-/g, '') : canonical;
  return uppercase ? formatted.toUpperCase() : formatted;
}

function generateUuidV4(options = {}) {
  const bytes = new Uint8Array(16);
  getUuidCryptoProvider().getRandomValues(bytes);
  bytes[6] = (bytes[6] & 15) | 64;
  bytes[8] = (bytes[8] & 63) | 128;
  return bytesToUuid(bytes, options);
}

function generateUuidBatch(count, options = {}) {
  const safeCount = Number.isFinite(count) ? Math.min(50, Math.max(1, Math.floor(count))) : 1;
  return Array.from({ length: safeCount }, () => generateUuidV4(options));
}

function initUuidGenerator(doc = document) {
  const amountInput = doc.querySelector('#uuid-count');
  const uppercaseInput = doc.querySelector('#uuid-uppercase');
  const hyphenlessInput = doc.querySelector('#uuid-hyphenless');
  const output = doc.querySelector('#uuid-output');
  const status = doc.querySelector('#uuid-status');
  const facts = doc.querySelector('#uuid-facts');

  if (!amountInput || !uppercaseInput || !hyphenlessInput || !output || !status || !facts) {
    return null;
  }

  function setStatus(kind, message) {
    status.className = `status-note ${kind}`;
    status.textContent = message;
  }

  function renderFacts(uuids) {
    facts.innerHTML = [
      ['UUID version', 'Version 4'],
      ['UUID count', String(uuids.length)],
      ['Character format', hyphenlessInput.checked ? '32 characters' : '36 characters'],
      ['Letter case', uppercaseInput.checked ? 'Uppercase' : 'Lowercase']
    ]
      .map(([label, value]) => `<li><b>${label}</b>${value}</li>`)
      .join('');
  }

  function generate() {
    try {
      const uuids = generateUuidBatch(Number(amountInput.value), {
        uppercase: uppercaseInput.checked,
        hyphenless: hyphenlessInput.checked
      });

      output.value = uuids.join('\n');
      renderFacts(uuids);
      setStatus('success', `Generated ${uuids.length} UUID${uuids.length === 1 ? '' : 's'} locally in your browser.`);
    } catch (error) {
      output.value = '';
      facts.innerHTML = '';
      setStatus('error', error.message || 'Unable to generate UUIDs in this browser.');
    }
  }

  async function copyOutput(button) {
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

  doc.querySelector('#uuid-generate').addEventListener('click', generate);
  doc.querySelector('#uuid-copy').addEventListener('click', (event) => copyOutput(event.target));
  doc.querySelector('#uuid-clear').addEventListener('click', () => {
    amountInput.value = '5';
    uppercaseInput.checked = false;
    hyphenlessInput.checked = false;
    output.value = '';
    facts.innerHTML = '';
    setStatus('info', 'Choose your format and generate a fresh batch of UUIDs.');
    amountInput.focus();
  });

  amountInput.addEventListener('change', () => {
    const clamped = Math.min(50, Math.max(1, Number(amountInput.value) || 1));
    amountInput.value = String(clamped);
  });

  setStatus('info', 'Choose your format and generate a fresh batch of UUIDs.');

  return { generate };
}

if (typeof document !== 'undefined') {
  initUuidGenerator(document);
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { bytesToUuid, generateUuidV4, generateUuidBatch, initUuidGenerator };
}
