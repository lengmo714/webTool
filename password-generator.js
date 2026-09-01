const passwordLength = document.querySelector('#password-length');
const passwordOutput = document.querySelector('#password-output');
const passwordStatus = document.querySelector('#password-status');
const passwordFacts = document.querySelector('#password-facts');

const characterSets = {
  lowercase: 'abcdefghijkmnopqrstuvwxyz',
  uppercase: 'ABCDEFGHJKLMNPQRSTUVWXYZ',
  numbers: '23456789',
  symbols: '!@#$%^&*()-_=+[]{};:,.?'
};

function setPasswordStatus(kind, message) {
  passwordStatus.className = `status-note ${kind}`;
  passwordStatus.textContent = message;
}

function randomIndex(max) {
  const ceiling = Math.floor(256 / max) * max;
  const byte = new Uint8Array(1);
  do { crypto.getRandomValues(byte); } while (byte[0] >= ceiling);
  return byte[0] % max;
}

function shufflePassword(characters) {
  for (let index = characters.length - 1; index > 0; index -= 1) {
    const swapIndex = randomIndex(index + 1);
    [characters[index], characters[swapIndex]] = [characters[swapIndex], characters[index]];
  }
  return characters.join('');
}

function generatePassword() {
  const length = Number(passwordLength.value);
  const selected = Object.entries(characterSets).filter(([key]) => document.querySelector(`#password-${key}`).checked);
  if (!Number.isInteger(length) || length < 4 || length > 128) {
    setPasswordStatus('error', 'Choose a whole-number length from 4 to 128.');
    return;
  }
  if (!selected.length) {
    setPasswordStatus('error', 'Select at least one character type.');
    return;
  }
  if (length < selected.length) {
    setPasswordStatus('error', `Choose at least ${selected.length} characters to include every selected type.`);
    return;
  }
  const allCharacters = selected.map(([, set]) => set).join('');
  const result = selected.map(([, set]) => set[randomIndex(set.length)]);
  while (result.length < length) result.push(allCharacters[randomIndex(allCharacters.length)]);
  passwordOutput.value = shufflePassword(result);
  passwordFacts.innerHTML = [['Length', `${length} characters`], ['Character types', String(selected.length)], ['Random source', 'Browser cryptography']].map(([label, value]) => `<li><b>${label}</b>${value}</li>`).join('');
  setPasswordStatus('success', 'A new random password is ready.');
}

async function copyPassword(event) {
  if (!passwordOutput.value) return;
  try { await navigator.clipboard.writeText(passwordOutput.value); } catch { passwordOutput.select(); document.execCommand('copy'); }
  event.target.textContent = 'Copied ✓';
  setTimeout(() => { event.target.textContent = 'Copy password'; }, 1400);
}

document.querySelector('#password-generate').addEventListener('click', generatePassword);
document.querySelector('#password-copy').addEventListener('click', copyPassword);
document.querySelector('#password-clear').addEventListener('click', () => {
  passwordOutput.value = '';
  passwordFacts.innerHTML = '';
  setPasswordStatus('info', 'Choose your options, then generate a password.');
});
generatePassword();
