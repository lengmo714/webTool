const sha256TextEncoder = typeof TextEncoder === 'function' ? new TextEncoder() : new (require('node:util').TextEncoder)();

function getCryptoProvider() {
  if (globalThis.crypto && globalThis.crypto.subtle) {
    return globalThis.crypto;
  }

  if (typeof require === 'function') {
    return require('node:crypto').webcrypto;
  }

  throw new Error('Web Crypto is not available in this browser.');
}

function bytesToHex(bytes) {
  return Array.from(bytes, (byte) => byte.toString(16).padStart(2, '0')).join('');
}

function bytesToBase64(bytes) {
  let binary = '';
  const chunkSize = 32768;

  for (let index = 0; index < bytes.length; index += chunkSize) {
    binary += String.fromCharCode(...bytes.subarray(index, index + chunkSize));
  }

  if (typeof btoa === 'function') {
    return btoa(binary);
  }

  if (typeof Buffer !== 'undefined') {
    return Buffer.from(binary, 'binary').toString('base64');
  }

  throw new Error('Base64 output is not available in this environment.');
}

async function createSha256Result(input) {
  const bytes = sha256TextEncoder.encode(input);
  const digestBuffer = await getCryptoProvider().subtle.digest('SHA-256', bytes);
  const digestBytes = new Uint8Array(digestBuffer);

  return {
    hex: bytesToHex(digestBytes),
    base64: bytesToBase64(digestBytes),
    bytes: bytes.length,
    characters: [...input].length,
    lines: input ? input.split(/\r?\n/).length : 0
  };
}

function initSha256HashGenerator(doc = document) {
  const source = doc.querySelector('#sha-source');
  const hexOutput = doc.querySelector('#sha-hex');
  const base64Output = doc.querySelector('#sha-base64');
  const status = doc.querySelector('#sha-status');
  const facts = doc.querySelector('#sha-facts');

  if (!source || !hexOutput || !base64Output || !status || !facts) {
    return null;
  }

  function setStatus(kind, message) {
    status.className = `status-note ${kind}`;
    status.textContent = message;
  }

  function clearOutputs(message) {
    hexOutput.value = '';
    base64Output.value = '';
    facts.innerHTML = '';
    setStatus('info', message);
  }

  function renderFacts(result) {
    facts.innerHTML = [
      ['Input characters', String(result.characters)],
      ['Input bytes', String(result.bytes)],
      ['Input lines', String(result.lines)],
      ['Hex length', String(result.hex.length)]
    ]
      .map(([label, value]) => `<li><b>${label}</b>${value}</li>`)
      .join('');
  }

  async function updateHash() {
    try {
      const result = await createSha256Result(source.value);
      hexOutput.value = result.hex;
      base64Output.value = result.base64;
      renderFacts(result);
      setStatus('success', 'SHA-256 hash generated locally in your browser.');
    } catch (error) {
      clearOutputs(error.message || 'Unable to generate a SHA-256 hash for this input.');
      setStatus('error', error.message || 'Unable to generate a SHA-256 hash for this input.');
    }
  }

  async function copyValue(button, value, fallbackField) {
    if (!value) {
      return;
    }

    try {
      await navigator.clipboard.writeText(value);
    } catch {
      fallbackField.select();
      doc.execCommand('copy');
    }

    const originalLabel = button.textContent;
    button.textContent = 'Copied ✓';
    setTimeout(() => {
      button.textContent = originalLabel;
    }, 1400);
  }

  doc.querySelector('#sha-generate').addEventListener('click', updateHash);
  doc.querySelector('#sha-sample').addEventListener('click', () => {
    source.value = `Debug Leaf
Client-side tools
September 1, 2026`;
    updateHash();
  });
  doc.querySelector('#sha-copy-hex').addEventListener('click', (event) => copyValue(event.target, hexOutput.value, hexOutput));
  doc.querySelector('#sha-copy-base64').addEventListener('click', (event) => copyValue(event.target, base64Output.value, base64Output));
  doc.querySelector('#sha-clear').addEventListener('click', () => {
    source.value = '';
    clearOutputs('Type or paste text to generate its SHA-256 digest.');
    source.focus();
  });

  clearOutputs('Type or paste text to generate its SHA-256 digest.');

  return { updateHash, clearOutputs };
}

if (typeof document !== 'undefined') {
  initSha256HashGenerator(document);
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { bytesToHex, bytesToBase64, createSha256Result, initSha256HashGenerator };
}
