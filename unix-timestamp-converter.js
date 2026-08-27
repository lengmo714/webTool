const tsSeconds = document.querySelector('#ts-seconds');
const tsMilliseconds = document.querySelector('#ts-milliseconds');
const tsLocalInput = document.querySelector('#ts-local-input');
const tsUtcOutput = document.querySelector('#ts-utc-output');
const tsLocalOutput = document.querySelector('#ts-local-output');
const tsStatus = document.querySelector('#ts-status');
const tsFacts = document.querySelector('#ts-facts');
const timestampLocale = 'en-US';

let isSyncingTimestamp = false;

function setTimestampStatus(kind, message) {
  tsStatus.className = `status-note ${kind}`;
  tsStatus.textContent = message;
}

function resetTimestampOutputs() {
  tsUtcOutput.value = '';
  tsLocalOutput.value = '';
  tsFacts.innerHTML = '';
}

function formatDatetimeLocalValue(date) {
  const offset = date.getTimezoneOffset();
  const localDate = new Date(date.getTime() - offset * 60000);
  return localDate.toISOString().slice(0, 16);
}

function renderTimestampFacts(date) {
  const milliseconds = date.getTime();
  const offsetMinutes = -date.getTimezoneOffset();
  const sign = offsetMinutes >= 0 ? '+' : '-';
  const absoluteOffset = Math.abs(offsetMinutes);
  const hours = String(Math.floor(absoluteOffset / 60)).padStart(2, '0');
  const minutes = String(absoluteOffset % 60).padStart(2, '0');

  const facts = [
    ['Weekday', date.toLocaleDateString(timestampLocale, { weekday: 'long' })],
    ['Timezone offset', `UTC${sign}${hours}:${minutes}`],
    ['Unix seconds', String(Math.trunc(milliseconds / 1000))],
    ['Unix milliseconds', String(milliseconds)]
  ];

  tsFacts.innerHTML = facts.map(([label, value]) => `<li><b>${label}</b>${value}</li>`).join('');
}

function applyTimestamp(date, sourceLabel) {
  if (!(date instanceof Date) || Number.isNaN(date.getTime())) {
    resetTimestampOutputs();
    setTimestampStatus('error', 'Enter a valid Unix timestamp or local date and time.');
    return;
  }

  const milliseconds = date.getTime();
  isSyncingTimestamp = true;
  tsSeconds.value = String(Math.trunc(milliseconds / 1000));
  tsMilliseconds.value = String(milliseconds);
  tsLocalInput.value = formatDatetimeLocalValue(date);
  isSyncingTimestamp = false;

  tsUtcOutput.value = date.toISOString();
  tsLocalOutput.value = date.toLocaleString(timestampLocale, { dateStyle: 'full', timeStyle: 'long' });
  renderTimestampFacts(date);
  setTimestampStatus('success', `${sourceLabel} converted successfully.`);
}

function parseIntegerField(value) {
  const trimmed = value.trim();
  if (!trimmed) {
    return null;
  }

  if (!/^-?\d+$/.test(trimmed)) {
    throw new Error('Use whole numbers for Unix seconds or milliseconds.');
  }

  return Number(trimmed);
}

function handleTimestampFromSeconds() {
  if (isSyncingTimestamp) {
    return;
  }

  try {
    const value = parseIntegerField(tsSeconds.value);
    if (value === null) {
      resetTimestampOutputs();
      setTimestampStatus('info', 'Enter Unix time or choose a local date to convert it instantly.');
      return;
    }

    applyTimestamp(new Date(value * 1000), 'Unix seconds');
  } catch (error) {
    resetTimestampOutputs();
    setTimestampStatus('error', error.message);
  }
}

function handleTimestampFromMilliseconds() {
  if (isSyncingTimestamp) {
    return;
  }

  try {
    const value = parseIntegerField(tsMilliseconds.value);
    if (value === null) {
      resetTimestampOutputs();
      setTimestampStatus('info', 'Enter Unix time or choose a local date to convert it instantly.');
      return;
    }

    applyTimestamp(new Date(value), 'Unix milliseconds');
  } catch (error) {
    resetTimestampOutputs();
    setTimestampStatus('error', error.message);
  }
}

function handleTimestampFromLocal() {
  if (isSyncingTimestamp) {
    return;
  }

  if (!tsLocalInput.value) {
    resetTimestampOutputs();
    setTimestampStatus('info', 'Enter Unix time or choose a local date to convert it instantly.');
    return;
  }

  applyTimestamp(new Date(tsLocalInput.value), 'Local date and time');
}

async function copyTimestampValue(field, button, idleLabel) {
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

tsSeconds.addEventListener('input', handleTimestampFromSeconds);
tsMilliseconds.addEventListener('input', handleTimestampFromMilliseconds);
tsLocalInput.addEventListener('input', handleTimestampFromLocal);

document.querySelector('#ts-now').addEventListener('click', () => applyTimestamp(new Date(), 'Current time'));
document.querySelector('#ts-copy-seconds').addEventListener('click', (event) => copyTimestampValue(tsSeconds, event.target, 'Copy seconds'));
document.querySelector('#ts-copy-utc').addEventListener('click', (event) => copyTimestampValue(tsUtcOutput, event.target, 'Copy UTC ISO'));

document.querySelector('#ts-clear').addEventListener('click', () => {
  isSyncingTimestamp = true;
  tsSeconds.value = '';
  tsMilliseconds.value = '';
  tsLocalInput.value = '';
  isSyncingTimestamp = false;
  resetTimestampOutputs();
  setTimestampStatus('info', 'Enter Unix time or choose a local date to convert it instantly.');
  tsSeconds.focus();
});
