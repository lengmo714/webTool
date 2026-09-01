const colorHex = document.querySelector('#color-hex');
const colorRed = document.querySelector('#color-red');
const colorGreen = document.querySelector('#color-green');
const colorBlue = document.querySelector('#color-blue');
const colorPreview = document.querySelector('#color-preview');
const colorStatus = document.querySelector('#color-status');
const colorFacts = document.querySelector('#color-facts');

function setColorStatus(kind, message) { colorStatus.className = `status-note ${kind}`; colorStatus.textContent = message; }
function hexPart(value) { return value.toString(16).padStart(2, '0').toUpperCase(); }
function rgbToHsl(red, green, blue) {
  const r = red / 255; const g = green / 255; const b = blue / 255;
  const max = Math.max(r, g, b); const min = Math.min(r, g, b); const lightness = (max + min) / 2;
  if (max === min) return [0, 0, Math.round(lightness * 100)];
  const delta = max - min;
  const saturation = delta / (1 - Math.abs(2 * lightness - 1));
  let hue = max === r ? ((g - b) / delta) % 6 : max === g ? (b - r) / delta + 2 : (r - g) / delta + 4;
  hue = Math.round(hue * 60); if (hue < 0) hue += 360;
  return [hue, Math.round(saturation * 100), Math.round(lightness * 100)];
}
function renderColor(red, green, blue) {
  const hex = `#${hexPart(red)}${hexPart(green)}${hexPart(blue)}`;
  const [hue, saturation, lightness] = rgbToHsl(red, green, blue);
  colorHex.value = hex; colorRed.value = red; colorGreen.value = green; colorBlue.value = blue;
  colorPreview.style.background = hex;
  colorFacts.innerHTML = [['HEX', hex], ['RGB', `rgb(${red}, ${green}, ${blue})`], ['HSL', `hsl(${hue}, ${saturation}%, ${lightness}%)`]].map(([label, value]) => `<li><b>${label}</b>${value}</li>`).join('');
  setColorStatus('success', 'Color values converted successfully.');
}
function convertHex() {
  const match = colorHex.value.trim().match(/^#?([0-9a-f]{6})$/i);
  if (!match) { setColorStatus('error', 'Enter a six-digit HEX color, such as #3B82F6.'); return; }
  const value = match[1];
  renderColor(parseInt(value.slice(0, 2), 16), parseInt(value.slice(2, 4), 16), parseInt(value.slice(4, 6), 16));
}
function convertRgb() {
  const values = [colorRed, colorGreen, colorBlue].map((input) => Number(input.value));
  if (values.some((value) => !Number.isInteger(value) || value < 0 || value > 255)) { setColorStatus('error', 'Each RGB channel must be a whole number from 0 to 255.'); return; }
  renderColor(...values);
}
async function copyHex(event) {
  const value = colorHex.value;
  try { await navigator.clipboard.writeText(value); } catch { colorHex.select(); document.execCommand('copy'); }
  event.target.textContent = 'Copied ✓'; setTimeout(() => { event.target.textContent = 'Copy HEX'; }, 1400);
}
document.querySelector('#color-from-hex').addEventListener('click', convertHex);
document.querySelector('#color-from-rgb').addEventListener('click', convertRgb);
document.querySelector('#color-copy').addEventListener('click', copyHex);
document.querySelector('#color-reset').addEventListener('click', () => renderColor(59, 130, 246));
renderColor(59, 130, 246);
