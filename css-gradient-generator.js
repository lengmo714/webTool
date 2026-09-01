const gradientStart = document.querySelector('#gradient-start');
const gradientEnd = document.querySelector('#gradient-end');
const gradientAngle = document.querySelector('#gradient-angle');
const gradientAngleValue = document.querySelector('#gradient-angle-value');
const gradientPreview = document.querySelector('#gradient-preview');
const gradientCss = document.querySelector('#gradient-css');
const gradientStatus = document.querySelector('#gradient-status');

function renderGradient() {
  const css = `background: linear-gradient(${gradientAngle.value}deg, ${gradientStart.value}, ${gradientEnd.value});`;
  gradientPreview.style.background = `linear-gradient(${gradientAngle.value}deg, ${gradientStart.value}, ${gradientEnd.value})`;
  gradientCss.value = css;
  gradientAngleValue.textContent = `${gradientAngle.value}°`;
}

function randomColor() {
  const values = new Uint8Array(3);
  crypto.getRandomValues(values);
  return `#${Array.from(values, (value) => value.toString(16).padStart(2, '0')).join('')}`;
}

async function copyGradient(event) {
  try { await navigator.clipboard.writeText(gradientCss.value); } catch { gradientCss.select(); document.execCommand('copy'); }
  gradientStatus.textContent = 'CSS copied to your clipboard.';
  event.target.textContent = 'Copied ✓';
  setTimeout(() => { event.target.textContent = 'Copy CSS'; }, 1400);
}

[gradientStart, gradientEnd, gradientAngle].forEach((input) => input.addEventListener('input', renderGradient));
document.querySelector('#gradient-randomize').addEventListener('click', () => { gradientStart.value = randomColor(); gradientEnd.value = randomColor(); renderGradient(); gradientStatus.textContent = 'A fresh color pair is ready.'; });
document.querySelector('#gradient-reset').addEventListener('click', () => { gradientStart.value = '#2563eb'; gradientEnd.value = '#a855f7'; gradientAngle.value = '135'; renderGradient(); gradientStatus.textContent = 'Restored the default gradient.'; });
document.querySelector('#gradient-copy').addEventListener('click', copyGradient);
renderGradient();
