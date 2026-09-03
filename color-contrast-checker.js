function normalizeHexColor(value) {
  const trimmed = String(value || '').trim();
  const withHash = trimmed.startsWith('#') ? trimmed : `#${trimmed}`;

  if (!/^#([\da-f]{3}|[\da-f]{6})$/i.test(withHash)) {
    throw new Error('Enter a valid 3-digit or 6-digit HEX color.');
  }

  if (withHash.length === 4) {
    return `#${withHash
      .slice(1)
      .split('')
      .map((char) => char + char)
      .join('')
      .toUpperCase()}`;
  }

  return withHash.toUpperCase();
}

function hexToRgb(value) {
  const hex = normalizeHexColor(value).slice(1);

  return {
    red: Number.parseInt(hex.slice(0, 2), 16),
    green: Number.parseInt(hex.slice(2, 4), 16),
    blue: Number.parseInt(hex.slice(4, 6), 16)
  };
}

function channelToLinear(channel) {
  const normalized = channel / 255;
  return normalized <= 0.03928 ? normalized / 12.92 : ((normalized + 0.055) / 1.055) ** 2.4;
}

function getRelativeLuminance(color) {
  const rgb = hexToRgb(color);
  return 0.2126 * channelToLinear(rgb.red) + 0.7152 * channelToLinear(rgb.green) + 0.0722 * channelToLinear(rgb.blue);
}

function getContrastRatio(foreground, background) {
  const foregroundLuminance = getRelativeLuminance(foreground);
  const backgroundLuminance = getRelativeLuminance(background);
  const lighter = Math.max(foregroundLuminance, backgroundLuminance);
  const darker = Math.min(foregroundLuminance, backgroundLuminance);
  return (lighter + 0.05) / (darker + 0.05);
}

function assessContrast(ratio) {
  const rounded = Number(ratio.toFixed(2));

  return {
    ratio: rounded,
    normalAA: rounded >= 4.5 ? 'Pass' : 'Fail',
    normalAAA: rounded >= 7 ? 'Pass' : 'Fail',
    largeAA: rounded >= 3 ? 'Pass' : 'Fail',
    largeAAA: rounded >= 4.5 ? 'Pass' : 'Fail'
  };
}

function initColorContrastChecker(doc = document) {
  const foregroundInput = doc.querySelector('#contrast-foreground');
  const backgroundInput = doc.querySelector('#contrast-background');
  const sampleInput = doc.querySelector('#contrast-sample');
  const preview = doc.querySelector('#contrast-preview');
  const ratio = doc.querySelector('#contrast-ratio');
  const status = doc.querySelector('#contrast-status');
  const facts = doc.querySelector('#contrast-facts');

  if (!foregroundInput || !backgroundInput || !sampleInput || !preview || !ratio || !status || !facts) {
    return null;
  }

  function setStatus(kind, message) {
    status.className = `status-note ${kind}`;
    status.textContent = message;
  }

  function setPreview(foreground, background) {
    preview.style.color = foreground;
    preview.style.background = background;
    preview.innerHTML = `
      <p>${sampleInput.value.trim() || 'Accessible design starts with readable contrast.'}</p>
      <span>${foreground} on ${background}</span>
    `;
  }

  function renderFacts(results, foreground, background) {
    const foregroundRgb = hexToRgb(foreground);
    const backgroundRgb = hexToRgb(background);

    facts.innerHTML = [
      ['Contrast ratio', `${results.ratio}:1`],
      ['Normal text AA', results.normalAA],
      ['Normal text AAA', results.normalAAA],
      ['Large text AA', results.largeAA],
      ['Large text AAA', results.largeAAA],
      ['Foreground RGB', `${foregroundRgb.red}, ${foregroundRgb.green}, ${foregroundRgb.blue}`],
      ['Background RGB', `${backgroundRgb.red}, ${backgroundRgb.green}, ${backgroundRgb.blue}`]
    ]
      .map(([label, value]) => `<li><b>${label}</b>${value}</li>`)
      .join('');
  }

  function calculate() {
    try {
      const foreground = normalizeHexColor(foregroundInput.value);
      const background = normalizeHexColor(backgroundInput.value);
      const results = assessContrast(getContrastRatio(foreground, background));

      foregroundInput.value = foreground;
      backgroundInput.value = background;
      ratio.textContent = `${results.ratio}:1`;
      setPreview(foreground, background);
      renderFacts(results, foreground, background);
      setStatus('success', 'Contrast ratio calculated locally using WCAG relative luminance.');
    } catch (error) {
      ratio.textContent = '--';
      facts.innerHTML = '';
      setStatus('error', error.message || 'Unable to calculate the contrast ratio.');
    }
  }

  doc.querySelector('#contrast-check').addEventListener('click', calculate);
  doc.querySelector('#contrast-swap').addEventListener('click', () => {
    const currentForeground = foregroundInput.value;
    foregroundInput.value = backgroundInput.value;
    backgroundInput.value = currentForeground;
    calculate();
  });
  doc.querySelector('#contrast-sample-fill').addEventListener('click', () => {
    foregroundInput.value = '#1F2937';
    backgroundInput.value = '#F9FAFB';
    sampleInput.value = 'Readable UI copy for dashboards, settings pages, and landing pages.';
    calculate();
  });
  doc.querySelector('#contrast-clear').addEventListener('click', () => {
    foregroundInput.value = '#111827';
    backgroundInput.value = '#FFFFFF';
    sampleInput.value = 'Accessible design starts with readable contrast.';
    ratio.textContent = '--';
    facts.innerHTML = '';
    preview.removeAttribute('style');
    preview.innerHTML = '<p>Preview updates after you run the checker.</p><span>Choose two HEX colors to compare.</span>';
    setStatus('info', 'Choose a foreground and background HEX color, then run the checker.');
  });

  sampleInput.addEventListener('input', () => {
    if (facts.children.length) {
      try {
        setPreview(normalizeHexColor(foregroundInput.value), normalizeHexColor(backgroundInput.value));
      } catch {
        // Ignore live preview updates while input is incomplete.
      }
    }
  });

  setStatus('info', 'Choose a foreground and background HEX color, then run the checker.');

  return { calculate };
}

if (typeof document !== 'undefined') {
  initColorContrastChecker(document);
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    normalizeHexColor,
    hexToRgb,
    getRelativeLuminance,
    getContrastRatio,
    assessContrast,
    initColorContrastChecker
  };
}
