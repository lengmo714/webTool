const jwtTextDecoder = typeof TextDecoder === 'function' ? new TextDecoder() : new (require('node:util').TextDecoder)();

function normalizeBase64Url(segment) {
  const normalized = segment.replace(/-/g, '+').replace(/_/g, '/');
  const remainder = normalized.length % 4;
  return remainder ? normalized.padEnd(normalized.length + (4 - remainder), '=') : normalized;
}

function decodeBase64UrlToText(segment) {
  const normalized = normalizeBase64Url(segment);

  if (typeof atob === 'function') {
    const binary = atob(normalized);
    const bytes = Uint8Array.from(binary, (character) => character.charCodeAt(0));
    return jwtTextDecoder.decode(bytes);
  }

  if (typeof Buffer !== 'undefined') {
    return Buffer.from(normalized, 'base64').toString('utf8');
  }

  throw new Error('Base64 decoding is not available in this environment.');
}

function parseJwt(token) {
  const trimmed = String(token || '').trim();

  if (!trimmed) {
    throw new Error('Paste a JWT to decode its header and payload.');
  }

  const segments = trimmed.split('.');
  if (segments.length < 2) {
    throw new Error('A JWT needs at least a header and payload separated by periods.');
  }

  const [headerSegment, payloadSegment, signatureSegment = ''] = segments;
  const headerText = decodeBase64UrlToText(headerSegment);
  const payloadText = decodeBase64UrlToText(payloadSegment);

  let header;
  let payload;

  try {
    header = JSON.parse(headerText);
  } catch {
    throw new Error('The JWT header is not valid JSON.');
  }

  try {
    payload = JSON.parse(payloadText);
  } catch {
    throw new Error('The JWT payload is not valid JSON.');
  }

  return {
    header,
    payload,
    signature: signatureSegment,
    segmentCount: segments.length
  };
}

function formatUnixDate(value) {
  if (!Number.isFinite(value)) {
    return 'Not provided';
  }

  return new Date(value * 1000).toISOString();
}

function initJwtDecoder(doc = document) {
  const source = doc.querySelector('#jwt-source');
  const headerOutput = doc.querySelector('#jwt-header');
  const payloadOutput = doc.querySelector('#jwt-payload');
  const status = doc.querySelector('#jwt-status');
  const facts = doc.querySelector('#jwt-facts');

  if (!source || !headerOutput || !payloadOutput || !status || !facts) {
    return null;
  }

  function setStatus(kind, message) {
    status.className = `status-note ${kind}`;
    status.textContent = message;
  }

  function clearOutputs(message) {
    headerOutput.value = '';
    payloadOutput.value = '';
    facts.innerHTML = '';
    setStatus('info', message);
  }

  function renderFacts(result) {
    const payload = result.payload || {};
    const signatureLength = result.signature ? result.signature.length : 0;

    facts.innerHTML = [
      ['Algorithm', result.header.alg || 'Not provided'],
      ['Type', result.header.typ || 'Not provided'],
      ['Issued at', Number.isFinite(payload.iat) ? formatUnixDate(payload.iat) : 'Not provided'],
      ['Not before', Number.isFinite(payload.nbf) ? formatUnixDate(payload.nbf) : 'Not provided'],
      ['Expires at', Number.isFinite(payload.exp) ? formatUnixDate(payload.exp) : 'Not provided'],
      ['Signature length', signatureLength ? `${signatureLength} characters` : 'No signature segment']
    ]
      .map(([label, value]) => `<li><b>${label}</b>${value}</li>`)
      .join('');
  }

  function decodeToken() {
    try {
      const result = parseJwt(source.value);
      headerOutput.value = JSON.stringify(result.header, null, 2);
      payloadOutput.value = JSON.stringify(result.payload, null, 2);
      renderFacts(result);
      setStatus('success', 'JWT header and payload decoded locally. Signature verification is not included.');
    } catch (error) {
      headerOutput.value = '';
      payloadOutput.value = '';
      facts.innerHTML = '';
      setStatus('error', error.message || 'Unable to decode this JWT.');
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

  doc.querySelector('#jwt-decode').addEventListener('click', decodeToken);
  doc.querySelector('#jwt-sample').addEventListener('click', () => {
    source.value =
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkZWJ1Z2xlYWYiLCJyb2xlIjoiZWRpdG9yIiwiaWF0IjoxNzU2NzYxNjAwLCJleHAiOjE3NTY3NjUyMDB9.signature-placeholder';
    decodeToken();
  });
  doc.querySelector('#jwt-copy-header').addEventListener('click', (event) => copyValue(event.target, headerOutput.value, headerOutput));
  doc.querySelector('#jwt-copy-payload').addEventListener('click', (event) => copyValue(event.target, payloadOutput.value, payloadOutput));
  doc.querySelector('#jwt-clear').addEventListener('click', () => {
    source.value = '';
    clearOutputs('Paste a JWT to inspect its decoded header and payload.');
    source.focus();
  });

  clearOutputs('Paste a JWT to inspect its decoded header and payload.');

  return { decodeToken, clearOutputs };
}

if (typeof document !== 'undefined') {
  initJwtDecoder(document);
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { normalizeBase64Url, decodeBase64UrlToText, parseJwt, formatUnixDate, initJwtDecoder };
}
