const regexPattern = document.querySelector('#regex-pattern');
const regexFlags = document.querySelector('#regex-flags');
const regexText = document.querySelector('#regex-text');
const regexStatus = document.querySelector('#regex-status');
const regexResults = document.querySelector('#regex-results');

function escapeHtml(value) {
  return value.replace(/[&<>"']/g, (character) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[character]);
}

function testRegex() {
  try {
    const flags = regexFlags.value.includes('g') ? regexFlags.value : `${regexFlags.value}g`;
    const expression = new RegExp(regexPattern.value, flags);
    const matches = Array.from(regexText.value.matchAll(expression));
    if (!matches.length) {
      regexStatus.className = 'status-note info';
      regexStatus.textContent = 'No matches found.';
      regexResults.innerHTML = '<p>No values matched this pattern.</p>';
      return;
    }
    regexStatus.className = 'status-note success';
    regexStatus.textContent = `${matches.length} match${matches.length === 1 ? '' : 'es'} found.`;
    regexResults.innerHTML = `<ul class="preview-list">${matches.map((match, index) => `<li><b>Match ${index + 1} · position ${match.index}</b>${escapeHtml(match[0]) || '(empty match)'}</li>`).join('')}</ul>`;
  } catch (error) {
    regexStatus.className = 'status-note error';
    regexStatus.textContent = `Pattern error: ${error.message}`;
    regexResults.innerHTML = '<p>Correct the pattern or flags, then try again.</p>';
  }
}

document.querySelector('#regex-test').addEventListener('click', testRegex);
document.querySelector('#regex-clear').addEventListener('click', () => { regexText.value = ''; regexResults.innerHTML = ''; regexStatus.className = 'status-note info'; regexStatus.textContent = 'Text cleared. Add sample text to test your pattern.'; });
[regexPattern, regexFlags, regexText].forEach((element) => element.addEventListener('input', testRegex));
testRegex();
