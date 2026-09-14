const fs=require('fs');
for(const slug of ['caesar-cipher','percentage-change-calculator']){
let handlers=fs.readFileSync('fraction-simplifier.js','utf8').split('const source =')[1];
handlers='const source ='+handlers;
handlers=handlers.replace('source.value.trim() ? simplifyFraction(source.value)',slug==='caesar-cipher'?"source.value ? caesar(source.value, document.getElementById('shift').value, document.getElementById('direction').value)":'source.value.trim() ? percentageChange(source.value)').replace('Calculated with exact integer arithmetic.','Result ready.').replace('Enter a fraction such as -84 / 30.',slug==='caesar-cipher'?'Enter text and choose a letter shift.':'Enter original and new values, such as 80, 100.').replace('"-84 / 30"',slug==='caesar-cipher'?'"Hello, World!"':'"80, 100"');
if(slug==='caesar-cipher')handlers+="\nfor (const id of ['shift', 'direction']) document.getElementById(id).addEventListener('input', update);\n";
fs.appendFileSync(slug+'.js',handlers);
}
