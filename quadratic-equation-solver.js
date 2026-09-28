'use strict';
function calculate(aText, bText, cText) {
  const values = [aText, bText, cText].map(text => {
    if (text.length > 150 || !/^[+-]?(?:\d+(?:\.\d*)?|\.\d+)(?:e[+-]?\d+)?$/i.test(text.trim())) throw new Error('Enter three valid real coefficients.');
    const n = Number(text);
    if (!Number.isFinite(n) || Math.abs(n) > 1e100 || (n !== 0 && Math.abs(n) < 1e-100) || (n === 0 && /[1-9]/.test(text.split(/e/i)[0]))) throw new Error('Nonzero coefficient magnitudes must be between 1e-100 and 1e100.');
    return n;
  });
  const [a,b,c] = values;
  const fmt = n => Number(n.toPrecision(12)).toString();
  if (a === 0) return b === 0 ? (c === 0 ? 'Every value is a solution.' : 'No solution.') : `Linear equation\nx = ${fmt(-c / b)}`;
  const discriminant = b*b - 4*a*c;
  const prefix = `Discriminant: ${fmt(discriminant)}\n`;
  if (discriminant === 0) return prefix + `Repeated root: ${fmt(-b / (2*a))}`;
  if (discriminant < 0) return prefix + `x₁ = ${fmt(-b/(2*a))} + ${fmt(Math.sqrt(-discriminant)/(2*Math.abs(a)))}i\nx₂ = ${fmt(-b/(2*a))} - ${fmt(Math.sqrt(-discriminant)/(2*Math.abs(a)))}i`;
  const q = -0.5*(b + (b >= 0 ? 1 : -1)*Math.sqrt(discriminant));
  return prefix + `x₁ = ${fmt(q/a)}\nx₂ = ${fmt(c/q)}`;
}

const fields = ["a","b","c"].map(id => document.querySelector('#'+id));
const output = document.querySelector('#output'), status = document.querySelector('#status');
function update() {
  output.value = ''; status.className = 'status-note info';
  try { output.value = calculate(...fields.map(field => field.value)); status.textContent = 'Calculated locally in your browser.'; }
  catch(error) { status.textContent = error.message; status.className = 'status-note error'; }
}
fields.forEach(field => { field.addEventListener('input', update); field.addEventListener('change', update); });
document.querySelector('#sample').addEventListener('click', () => { ["1","-3","2"].forEach((value,i) => { fields[i].value = value; }); update(); });
document.querySelector('#clear').addEventListener('click', () => { fields.forEach(field => { field.value = ''; }); output.value = ''; status.textContent = 'Enter values to calculate.'; status.className = 'status-note info'; fields[0].focus(); });
document.querySelector('#copy').addEventListener('click', async () => { if (!output.value) return; try { await navigator.clipboard.writeText(output.value); status.textContent = 'Result copied.'; } catch { status.textContent = 'Copy unavailable. Select and copy the result manually.'; } });
update();
