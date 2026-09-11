function calculate(text) {
  const match = text.trim().match(/^(\d{1,3})\.(\d{1,3})\.(\d{1,3})\.(\d{1,3})\/(0|[1-9]\d?)$/);
  if (!match) throw new Error('Use IPv4 CIDR notation, such as 192.168.1.130/26.');
  const octets = match.slice(1,5);
  const prefix = Number(match[5]);
  if (prefix > 32 || octets.some(n => Number(n) > 255 || (n.length > 1 && n[0] === '0'))) throw new Error('Octets must be 0–255 without leading zeros; the prefix must be 0–32.');
  const ip = octets.reduce((n, part) => n * 256 + Number(part), 0);
  const size = 2 ** (32 - prefix);
  const network = Math.floor(ip / size) * size;
  const last = network + size - 1;
  const format = n => [24,16,8,0].map(shift => Math.floor(n / 2 ** shift) % 256).join('.');
  const firstHost = prefix >= 31 ? network : network + 1;
  const lastHost = prefix >= 31 ? last : last - 1;
  return ['Network: ' + format(network) + '/' + prefix, 'Subnet mask: ' + format(2 ** 32 - size), 'Wildcard mask: ' + format(size - 1), 'Broadcast: ' + (prefix >= 31 ? 'Not applicable' : format(last)), 'Total addresses: ' + size, 'Usable addresses: ' + (prefix >= 31 ? size : size - 2), 'First usable: ' + format(firstHost), 'Last usable: ' + format(lastHost)].join('\n');
}
const source = document.getElementById('source');
const output = document.getElementById('output');
const status = document.getElementById('status');
function update() {
  try {
    output.value = source.value.trim() ? calculate(source.value) : '';
    status.textContent = output.value ? 'Result ready.' : 'Enter an IPv4 address and prefix, for example 192.168.1.130/26.';
    status.className = 'status-note info';
  } catch (error) { output.value = ''; status.textContent = error.message; status.className = 'status-note error'; }
}
source.addEventListener('input', update);
document.getElementById('sample').addEventListener('click', () => { source.value = "192.168.1.130/26"; update(); });
document.getElementById('clear').addEventListener('click', () => { source.value = ''; update(); source.focus(); });
document.getElementById('copy').addEventListener('click', async () => {
  try { await navigator.clipboard.writeText(output.value); status.textContent = 'Result copied.'; }
  catch { status.textContent = 'Select and copy the result manually.'; output.focus(); output.select(); }
});
update();
