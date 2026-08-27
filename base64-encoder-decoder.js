const base64Source = document.querySelector('#base64-source');
const base64Result = document.querySelector('#base64-result');
const base64Status = document.querySelector('#base64-status');
const base64Facts = document.querySelector('#base64-facts');

const textEncoder = new TextEncoder();
const textDecoder = new TextDecoder();

function setBase64Status(kind, message) {
  base64Status.className = `status-note ${kind}`;
  base64Status.textContent = message;
}

function bytesToBase64(bytes) {
  let binary = '';
  const chunkSize = 32768;

  for (let index = 0; index < bytes.length; index += chunkSize) {
    binary += String.fromCharCode(...bytes.subarray(index, index + chunkSize));
  }

  return btoa(binary);
}

function base64ToBytes(value) {
  const stripped = value.replace(/\s+/g, '');
  const normalized = stripped.replace(/-/g, '+').replace(/_/g, '/');

  if (!normalized || /[^A-Za-z0-9+/=]/.test(normalized)) {
    throw new Error('Enter a valid Base64 string to decode.');
  }

  const padded = normalized.padEnd(Math.ceil(normalized.length / 4) * 4, '=');
  const binary = atob(padded);
  return Uint8Array.from(binary, (character) => character.charCodeAt(0));
}

function renderBase64Facts(mode, inputValue, outputValue) {
  const facts = [
    ['Mode', mode],
    ['Input characters', String([...inputValue].length)],
    ['Output characters', String([...outputValue].length)],
    ['Input bytes', String(textEncoder.encode(inputValue).length)]
  ];

  base64Facts.innerHTML = facts.map(([label, value]) => `<li><b>${label}</b>${value}</li>`).join('');
}

function updateBase64Output(mode) {
  const source = base64Source.value;
  if (!source.trim()) {
    base64Result.value = '';
    base64Facts.innerHTML = '';
    setBase64Status('info', 'Paste text to encode it or paste Base64 to decode it.');
    return;
  }

  try {
    if (mode === 'decode') {
      const decoded = textDecoder.decode(base64ToBytes(source));
      base64Result.value = decoded;
      renderBase64Facts('Decode Base64', source, decoded);
      setBase64Status('success', 'Base64 decoded successfully.');
      return;
    }

    const encoded = bytesToBase64(textEncoder.encode(source));
    const output = mode === 'encode-url' ? encoded.replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/g, '') : encoded;
    base64Result.value = output;
    renderBase64Facts(mode === 'encode-url' ? 'Encode URL-safe' : 'Encode text', source, output);
    setBase64Status('success', 'Text encoded successfully.');
  } catch (error) {
    base64Result.value = '';
    base64Facts.innerHTML = '';
    setBase64Status('error', error.message || 'Unable to process this value.');
  }
}

async function copyBase64Output(event) {
  if (!base64Result.value) {
    return;
  }

  try {
    await navigator.clipboard.writeText(base64Result.value);
  } catch {
    base64Result.select();
    document.execCommand('copy');
  }

  event.target.textContent = 'Copied ✓';
  setTimeout(() => {
    event.target.textContent = 'Copy output';
  }, 1400);
}

document.querySelector('#base64-encode').addEventListener('click', () => updateBase64Output('encode'));
document.querySelector('#base64-encode-url').addEventListener('click', () => updateBase64Output('encode-url'));
document.querySelector('#base64-decode').addEventListener('click', () => updateBase64Output('decode'));
document.querySelector('#base64-copy').addEventListener('click', copyBase64Output);

document.querySelector('#base64-swap').addEventListener('click', () => {
  if (!base64Result.value) {
    return;
  }

  base64Source.value = base64Result.value;
  base64Result.value = '';
  base64Facts.innerHTML = '';
  setBase64Status('info', 'Output moved back to the input. Choose the next action to continue.');
  base64Source.focus();
});

document.querySelector('#base64-clear').addEventListener('click', () => {
  base64Source.value = '';
  base64Result.value = '';
  base64Facts.innerHTML = '';
  setBase64Status('info', 'Paste text to encode it or paste Base64 to decode it.');
  base64Source.focus();
});
