const utmFields = {
  baseUrl: document.querySelector('#utm-base-url'),
  source: document.querySelector('#utm-source'),
  medium: document.querySelector('#utm-medium'),
  campaign: document.querySelector('#utm-campaign'),
  term: document.querySelector('#utm-term'),
  content: document.querySelector('#utm-content'),
  preserve: document.querySelector('#utm-preserve')
};

const utmStatus = document.querySelector('#utm-status');
const utmResult = document.querySelector('#utm-result');
const utmQuery = document.querySelector('#utm-query');
const utmSummary = document.querySelector('#utm-summary');

function setUtmStatus(kind, message) {
  utmStatus.className = `status-note ${kind}`;
  utmStatus.textContent = message;
}

function normalizeBaseUrl(value) {
  const trimmed = value.trim();
  if (!trimmed) {
    return '';
  }

  return /^[a-zA-Z][a-zA-Z\d+\-.]*:/.test(trimmed) ? trimmed : `https://${trimmed}`;
}

function renderUtmSummary(url, parameters) {
  const items = [
    ['Host', url.host || 'None'],
    ['Path', url.pathname || '/'],
    ['UTM fields', String(parameters.filter(([key]) => key.startsWith('utm_')).length)],
    ['Final query string', url.search ? url.search.slice(1) : 'None']
  ];

  utmSummary.innerHTML = items
    .map(([label, value]) => `<li><b>${label}</b>${value}</li>`)
    .join('');
}

function buildUtmUrl() {
  const baseCandidate = normalizeBaseUrl(utmFields.baseUrl.value);
  if (!baseCandidate) {
    utmResult.value = '';
    utmQuery.value = '';
    utmSummary.innerHTML = '';
    setUtmStatus('info', 'Enter a landing-page URL to build a tagged campaign link.');
    return;
  }

  let url;
  try {
    url = new URL(baseCandidate);
  } catch {
    utmResult.value = '';
    utmQuery.value = '';
    utmSummary.innerHTML = '';
    setUtmStatus('error', 'Enter a valid URL or domain, such as example.com/pricing.');
    return;
  }

  const params = utmFields.preserve.checked ? new URLSearchParams(url.search) : new URLSearchParams();
  [
    ['utm_source', utmFields.source.value],
    ['utm_medium', utmFields.medium.value],
    ['utm_campaign', utmFields.campaign.value],
    ['utm_term', utmFields.term.value],
    ['utm_content', utmFields.content.value]
  ].forEach(([key, value]) => {
    const trimmed = value.trim();
    if (trimmed) {
      params.set(key, trimmed);
    } else {
      params.delete(key);
    }
  });

  url.search = params.toString();
  const finalUrl = url.toString();
  const queryString = url.search ? url.search.slice(1) : '';
  const parameterList = [...params.entries()];

  utmResult.value = finalUrl;
  utmQuery.value = queryString;
  renderUtmSummary(url, parameterList);
  setUtmStatus('success', `${parameterList.length} query parameter${parameterList.length === 1 ? '' : 's'} ready to copy.`);
}

async function copyFieldValue(field, button, idleLabel) {
  if (!field.value) {
    return;
  }

  try {
    await navigator.clipboard.writeText(field.value);
  } catch {
    field.select();
    document.execCommand('copy');
  }

  button.textContent = 'Copied ✓';
  setTimeout(() => {
    button.textContent = idleLabel;
  }, 1400);
}

document.querySelector('#utm-copy-url').addEventListener('click', (event) => {
  copyFieldValue(utmResult, event.target, 'Copy URL');
});

document.querySelector('#utm-copy-query').addEventListener('click', (event) => {
  copyFieldValue(utmQuery, event.target, 'Copy query string');
});

document.querySelector('#utm-clear').addEventListener('click', () => {
  Object.values(utmFields).forEach((field) => {
    if (field.type === 'checkbox') {
      field.checked = true;
    } else {
      field.value = '';
    }
  });

  utmResult.value = '';
  utmQuery.value = '';
  utmSummary.innerHTML = '';
  setUtmStatus('info', 'Enter a landing-page URL to build a tagged campaign link.');
  utmFields.baseUrl.focus();
});

Object.values(utmFields).forEach((field) => {
  field.addEventListener('input', buildUtmUrl);
  if (field.type === 'checkbox') {
    field.addEventListener('change', buildUtmUrl);
  }
});

buildUtmUrl();
