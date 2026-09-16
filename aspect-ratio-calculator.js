function aspectRatio(width, height, target, axis) {
  if (![width, height, target].every(v => /^\d{1,12}$/.test(v) && BigInt(v) > 0n)) throw new Error('Enter positive whole dimensions with at most 12 digits.');
  if (!['width', 'height'].includes(axis)) throw new Error('Choose width or height.');
  const gcd = (a, b) => { while (b) [a, b] = [b, a % b]; return a; };
  const w = BigInt(width), h = BigInt(height), t = BigInt(target), g = gcd(w, h);
  const numerator = t * (axis === 'width' ? h : w), denominator = axis === 'width' ? w : h;
  const d = gcd(numerator, denominator);
  const exact = denominator / d === 1n ? String(numerator / d) : `${numerator / d}/${denominator / d}`;
  const rounded = (numerator * 2n + denominator) / (2n * denominator);
  return `Aspect ratio: ${w / g}:${h / g}\nExact new ${axis === 'width' ? 'height' : 'width'}: ${exact}\nNearest whole-pixel size: ${axis === 'width' ? t : rounded} × ${axis === 'width' ? rounded : t}${rounded === 0n ? '\nChoose a larger target to obtain at least one pixel.' : ''}`;
}
const $ = id => document.getElementById(id);
function update() {
  try { $('output').value = aspectRatio($('width').value, $('height').value, $('target').value, $('axis').value); $('status').textContent = 'Dimensions calculated.'; $('status').className = 'status-note info'; }
  catch (error) { $('output').value = ''; $('status').textContent = error.message; $('status').className = 'status-note error'; }
}
for (const id of ['width', 'height', 'target', 'axis']) $(id).addEventListener('input', update);
$('sample').addEventListener('click', () => { $('width').value = '1920'; $('height').value = '1080'; $('target').value = '1280'; $('axis').value = 'width'; update(); });
$('clear').addEventListener('click', () => { for (const id of ['width', 'height', 'target']) $(id).value = ''; update(); $('width').focus(); });
$('copy').addEventListener('click', async () => { try { await navigator.clipboard.writeText($('output').value); $('status').textContent = 'Result copied.'; } catch { $('status').textContent = 'Select and copy the result manually.'; $('output').focus(); $('output').select(); } });
update();
