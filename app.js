const tools = [
  ["luhn-check-digit","utility","10","Luhn Check Digit Calculator","Calculate a Luhn check digit for a numeric identifier or validate its checksum locally, preserving leading zeros.","luhn check digit calculator online,generate mod 10 checksum,validate numeric identifier checksum"],
  ["tsv-to-html-table","utility","&lt; / &gt;","TSV to HTML Table Generator","Convert pasted spreadsheet cells into an escaped HTML table with an optional header row and caption, directly in your browser.","tsv to html table generator online,spreadsheet cells to html table,tab separated text to accessible html table"],
  ["temperature-converter","utility","°C","Temperature Converter","Convert Celsius, Fahrenheit, and Kelvin temperatures instantly, with absolute-zero validation and clear conversion formulas.","celsius fahrenheit kelvin converter online,convert negative temperatures,temperature conversion absolute zero"],
  ["tsv-transposer","utility","↔","TSV Row and Column Transposer","Transpose tab-separated text by turning rows into columns. Paste a spreadsheet range and copy the transposed TSV back into your spreadsheet.","transpose tab separated text online,swap spreadsheet rows columns TSV,transpose ragged TSV table"],
  ["morse-code-translator","utility",".-","Morse Code Translator","Translate English letters and digits to Morse code or decode dots and dashes into text, with clear word separators and local processing.","text to morse code translator online,decode morse dots dashes to english,morse code letters numbers converter"],
  ["text-chunk-splitter","utility","[ab]","Text Chunk Splitter","Split text into fixed-size Unicode code point chunks and copy a JSON array that preserves every space and line break for easy reconstruction.","split text into fixed length chunks online,unicode text chunk splitter,json array text segments generator"],
  ["number-statistics-calculator","utility","Σ","Number Statistics Calculator","Calculate count, sum, mean, median, minimum, maximum, and population or sample standard deviation from a list of numbers.","mean median standard deviation calculator online,descriptive statistics number list,population sample variance calculator"],
  ["integer-range-generator","utility","1…n","Integer Range Generator","Generate an ascending or descending integer sequence with an exact start, end, and step, then copy it as lines, CSV, or a JSON array.","integer sequence generator custom step,generate descending number range,large integer range list online"],
  ["aspect-ratio-calculator","utility","W:H","Aspect Ratio Calculator","Simplify image dimensions to an exact aspect ratio and calculate a proportional width or height for resizing.","aspect ratio calculator custom dimensions,calculate height from width ratio,reduce image width height ratio"],
  ["tabs-to-spaces","transform","TAB","Tabs to Spaces Converter","Expand tabs to spaces using column-aligned tab stops. Choose a tab width and convert indentation or every tab locally.","convert tabs to spaces online,expand tabs column tab stops,convert tab indentation to spaces"],
  ["line-number-generator","utility","1.","Text Line Number Generator","Add sequential numbers to text lines with a custom start, step, and separator. Keep or skip blank lines locally in your browser.","add line numbers to text online,number nonempty lines custom start,bulk sequential text numbering"],
  ["date-difference-calculator","utility","DAYS","Calendar Date Difference Calculator","Calculate the signed number of calendar days between two dates, with weeks and days and an optional inclusive date count.","calendar days between two dates calculator,inclusive date difference online,weeks and days between dates"],
  ["caesar-cipher","utility","ROT","Caesar Cipher Encoder and Decoder","Encode or decode a Caesar cipher with any integer letter shift. Preserve letter case, punctuation, and Unicode text in your browser.","caesar cipher decoder custom shift,encode text rot13 online,letter shift cipher tool"],
  ["percentage-change-calculator","utility","%","Percentage Change Calculator","Calculate percentage increase or decrease from an original value to a new value, with the absolute difference and a clear calculation formula.","percentage change original new value calculator,calculate percent increase decrease online,percentage change zero baseline"],
  ["fraction-simplifier","utility","a/b","Fraction Simplifier","Reduce signed integer fractions to lowest terms and convert improper fractions to mixed numbers with exact arithmetic in your browser.","simplify large fractions online,reduce negative fractions to lowest terms,improper fraction to mixed number"],
  ["data-size-converter","utility","KiB","Data Size Converter","Convert bytes, decimal kB MB GB TB, and binary KiB MiB GiB TiB with precise browser-based arithmetic and clearly labeled units.","convert gib to gb online,megabytes to mebibytes calculator,decimal binary storage units converter"],
  ["ipv4-subnet-calculator","utility","IP","IPv4 Subnet Calculator","Calculate an IPv4 CIDR network, subnet mask, broadcast address, and usable host range locally in your browser.","ipv4 cidr subnet calculator online,calculate network broadcast address,subnet mask usable host range"],
  ["json-path-inspector","utility","/{}","JSON Path Inspector","Inspect JSON leaf values and their exact JSON Pointer paths, including array indexes and escaped object keys, directly in your browser.","list json leaf paths online,json pointer inspector array indexes,extract json paths and values"],
  ["unicode-text-normalizer","utility","U+","Unicode Text Normalizer","Normalize Unicode text to NFC, NFD, NFKC, or NFKD and inspect code points before and after normalization in your browser.","unicode normalization tool online,nfc nfd text normalizer,nfkc compatibility normalization"],
  ["gcd-lcm-calculator","utility","÷","GCD &amp; LCM Calculator","Calculate the greatest common divisor and least common multiple of two or more integers using exact browser-based arithmetic.","gcd lcm calculator multiple numbers,greatest common divisor large integers,least common multiple calculator online"],
  ["json-string-escape","utility","\\n","JSON String Escape &amp; Unescape","Escape text into a valid JSON string or unescape a quoted JSON string to plain text, including quotes, backslashes, newlines, and Unicode.","json string escape unescape online,escape quotes and newlines for json,decode json string literal"],
  ["duration-converter","utility","h:m","Duration Converter","Convert milliseconds, seconds, minutes, hours, or days into an exact duration breakdown with total seconds and milliseconds in your browser.","seconds to days hours minutes converter,milliseconds duration breakdown online,decimal hours to duration converter"],
  ["utf8-text-hex-converter","utility","HEX","UTF-8 Text &amp; Hex Converter","Convert Unicode text to hexadecimal UTF-8 bytes or decode hex back to text with strict byte validation, entirely in your browser.","utf8 text to hex converter online,decode hexadecimal bytes to unicode text,hex string to utf8"],
  ["url-query-string-inspector","utility","?=","URL Query String Inspector","Inspect decoded URL query parameters as ordered JSON pairs, preserving duplicate keys, blank values, and Unicode locally in your browser.","url query string parser online,inspect duplicate url parameters,decode query string to json pairs"],
  ['json-to-csv-converter', 'utility', 'CSV', 'JSON to CSV Converter', 'Convert a JSON array of objects to CSV locally with combined headers, escaped values, and optional spreadsheet formula protection.', 'json array to csv online,convert json objects to csv,export json to spreadsheet csv'],
  ['line-prefix-suffix', 'utility', '[ ]', 'Line Prefix &amp; Suffix', 'Add a custom prefix and suffix to every text line in your browser. Preserve blank lines or wrap them too, with an instant preview.', 'add prefix suffix to each line online,bulk text line wrapper,prepend append text lines'],
  ['utf8-byte-counter', 'analysis', 'B', 'UTF-8 Byte Counter', 'Measure UTF-8 bytes, Unicode code points, and UTF-16 units against a custom byte limit.', 'utf8 byte counter text size byte length limit'],
  ['list-compare', 'analysis', '∩', 'List Compare', 'Find common and unique entries between two lists with case and whitespace options.', 'compare two lists intersection difference common unique entries'],
  ['word-counter', 'analysis', 'Aa', 'Word Counter', 'Count words, characters, sentences, paragraphs, and reading time as you type.', 'online word counter article word count'],
  ['character-counter', 'analysis', '#', 'Character Counter', 'Check character limits for social posts, titles, and meta descriptions.', 'online character counter meta description length'],
  ['case-converter', 'transform', '⇄', 'Case Converter', 'Change text to uppercase, lowercase, Title Case, camelCase, or snake_case.', 'online case converter camel case converter'],
  ['remove-duplicate-lines', 'clean', '≡', 'Remove Duplicate Lines', 'Remove repeated lines while keeping the first occurrence in its original order.', 'remove duplicate lines online deduplicate text'],
  ['sort-lines', 'transform', '↕', 'Sort Lines', 'Sort a list alphabetically in ascending or descending order.', 'online text sorter alphabetical list sorter'],
  ['remove-extra-spaces', 'clean', '␠', 'Remove Extra Spaces', 'Clean repeated spaces, tabs, and trailing whitespace from pasted text.', 'remove extra spaces online whitespace cleaner'],
  ['remove-line-breaks', 'clean', '↵', 'Remove Line Breaks', 'Join broken lines into clean, readable paragraphs.', 'remove line breaks online join lines'],
  ['find-and-replace', 'transform', '⌕', 'Find and Replace', 'Find a word or phrase and replace every instance in your text.', 'online find and replace text bulk replace'],
  ['reading-time', 'analysis', '◷', 'Reading Time Calculator', 'Estimate how long an article takes to read at a comfortable pace.', 'reading time calculator article reading time'],
  ['url-slug-generator', 'utility', '/', 'URL Slug Generator', 'Turn a title into a clean, lowercase, SEO-friendly URL slug.', 'url slug generator SEO friendly URL'],
  ['text-diff-checker', 'analysis', '±', 'Text Diff Checker', 'Compare two versions of text and highlight every added or removed line.', 'online text diff checker compare two texts'],
  ['word-frequency-counter', 'analysis', 'ƒ', 'Word Frequency Counter', 'Find the most-used words and calculate keyword density in any text.', 'word frequency counter keyword density checker'],
  ['email-extractor', 'utility', '@', 'Email Extractor', 'Extract and deduplicate every email address hidden inside text.', 'extract email addresses from text online'],
  ['lorem-ipsum-generator', 'utility', '¶', 'Lorem Ipsum Generator', 'Generate placeholder text by paragraphs, sentences, or words.', 'free lorem ipsum generator placeholder text'],
  ['json-formatter-validator', 'utility', '{}', 'JSON Formatter & Validator', 'Format, minify, validate, and sort JSON entirely in your browser.', 'json formatter validator online format minify json'],
  ['utm-link-builder', 'utility', 'UTM', 'UTM Link Builder', 'Build tagged campaign URLs with clean UTM parameters and instant previews.', 'utm link builder online campaign url generator'],
  ['base64-encoder-decoder', 'utility', '64', 'Base64 Encoder & Decoder', 'Encode plain text, decode Base64, and generate URL-safe Base64 in your browser.', 'base64 encoder decoder online url safe base64 converter'],
  ['unix-timestamp-converter', 'utility', 'TS', 'Unix Timestamp Converter', 'Convert epoch seconds or milliseconds into readable UTC and local time.', 'unix timestamp converter online epoch to date converter'],
  ['url-encoder-decoder', 'utility', '%', 'URL Encoder & Decoder', 'Encode text for URLs or decode percent-encoded strings with clear error feedback.', 'url encoder decoder online percent encode decode url component'],
  ['html-entity-encoder-decoder', 'utility', '&amp;', 'HTML Entity Encoder & Decoder', 'Encode HTML-sensitive characters or decode named and numeric entities locally.', 'html entity encoder decoder online decode html entities escape html text'],
  ['password-generator', 'utility', '***', 'Strong Password Generator', 'Create a random password with your chosen length and character types, entirely in your browser.', 'strong password generator online random secure custom password length'],
  ['hex-rgb-color-converter', 'utility', 'RGB', 'HEX to RGB Color Converter', 'Convert HEX colors to RGB and HSL codes with a live CSS color preview.', 'hex to rgb color converter online rgb to hex hsl css color code'],
  ['css-gradient-generator', 'utility', '◒', 'CSS Gradient Generator', 'Create linear CSS gradients with two colors, an angle control, and copy-ready code.', 'css gradient generator online linear gradient css code generator'],
  ['regex-tester', 'utility', '.*', 'Regular Expression Tester', 'Test JavaScript regular expressions against sample text and inspect each match locally.', 'regular expression tester online javascript regex match tester'],
  ['csv-to-json-converter', 'utility', 'CSV', 'CSV to JSON Converter', 'Convert pasted CSV into JSON objects or arrays with header support and delimiter detection.', 'csv to json converter online convert csv rows to json in browser'],
  ['sha256-hash-generator', 'utility', 'SHA', 'SHA-256 Hash Generator', 'Generate SHA-256 digests in hex or Base64 directly in your browser.', 'sha256 hash generator online browser checksum tool'],
  ['uuid-generator', 'utility', 'ID', 'UUID Generator', 'Generate UUID v4 identifiers in batches with uppercase and hyphen-free output options.', 'uuid generator online bulk uuid v4 generator hyphenless uuid tool'],
  ['jwt-decoder', 'utility', 'JWT', 'JWT Decoder', 'Decode JWT header and payload JSON locally and inspect standard token claims.', 'jwt decoder online decode jwt in browser inspect token payload'],
  ['roman-numeral-converter', 'utility', 'XIV', 'Roman Numeral Converter', 'Convert numbers to Roman numerals or Roman numerals back to numbers with strict validation.', 'roman numeral converter online number to roman numeral calculator'],
  ['color-contrast-checker', 'utility', 'AA', 'Color Contrast Checker', 'Check WCAG contrast ratios for foreground and background HEX colors with a live preview.', 'color contrast checker online wcag aa aaa hex contrast ratio tool'],
  ['number-base-converter', 'utility', '2/16', 'Number Base Converter', 'Convert integers between binary, decimal, octal, hexadecimal, and any base from 2 to 36.', 'number base converter online binary decimal hexadecimal converter base 2 to 36'],
  ['markdown-to-html-converter', 'utility', 'MD', 'Markdown to HTML Converter', 'Turn Markdown into escaped HTML with a live preview for headings, lists, links, and code blocks.', 'markdown to html converter online markdown preview html output tool']
].map(([slug, cat, icon, name, desc, keywords]) => ({ slug, cat, icon, name, desc, keywords }));

const extraTools = [
  ["age-calculator","utility","•","Age Calculator","Process age calculator quickly in your browser.","age calculator online tool"],
  ["bmi-calculator","utility","•","BMI Calculator","Process bmi calculator quickly in your browser.","bmi calculator online tool"],
  ["tip-calculator","utility","•","Tip Calculator","Process tip calculator quickly in your browser.","tip calculator online tool"],
  ["discount-calculator","utility","•","Discount Calculator","Process discount calculator quickly in your browser.","discount calculator online tool"],
  ["sales-tax-calculator","utility","•","Sales Tax Calculator","Process sales tax calculator quickly in your browser.","sales tax calculator online tool"],
  ["compound-interest-calculator","utility","•","Compound Interest Calculator","Process compound interest calculator quickly in your browser.","compound interest calculator online tool"],
  ["simple-interest-calculator","utility","•","Simple Interest Calculator","Process simple interest calculator quickly in your browser.","simple interest calculator online tool"],
  ["ratio-simplifier","utility","•","Ratio Simplifier","Process ratio simplifier quickly in your browser.","ratio simplifier online tool"],
  ["average-calculator","utility","•","Average Calculator","Process average calculator quickly in your browser.","average calculator online tool"],
  ["median-mode-calculator","utility","•","Median and Mode Calculator","Process median and mode calculator quickly in your browser.","median and mode calculator online tool"],
  ["prime-checker","utility","•","Prime Number Checker","Process prime number checker quickly in your browser.","prime number checker online tool"],
  ["prime-factorization","utility","•","Prime Factorization","Process prime factorization quickly in your browser.","prime factorization online tool"],
  ["perfect-number-checker","utility","•","Perfect Number Checker","Process perfect number checker quickly in your browser.","perfect number checker online tool"],
  ["fibonacci-generator","utility","•","Fibonacci Generator","Process fibonacci generator quickly in your browser.","fibonacci generator online tool"],
  ["random-number-generator","utility","•","Random Number Generator","Process random number generator quickly in your browser.","random number generator online tool"],
  ["text-reverser","utility","•","Text Reverser","Process text reverser quickly in your browser.","text reverser online tool"],
  ["remove-punctuation","utility","•","Remove Punctuation","Process remove punctuation quickly in your browser.","remove punctuation online tool"],
  ["whitespace-visualizer","utility","•","Whitespace Visualizer","Process whitespace visualizer quickly in your browser.","whitespace visualizer online tool"],
  ["newline-to-comma","utility","•","Newline to Comma Converter","Process newline to comma converter quickly in your browser.","newline to comma converter online tool"],
  ["comma-to-newline","utility","•","Comma to Newline Converter","Process comma to newline converter quickly in your browser.","comma to newline converter online tool"],
  ["extract-numbers","utility","•","Number Extractor","Process number extractor quickly in your browser.","number extractor online tool"],
  ["extract-urls","utility","•","URL Extractor","Process url extractor quickly in your browser.","url extractor online tool"],
  ["extract-hashtags","utility","•","Hashtag Extractor","Process hashtag extractor quickly in your browser.","hashtag extractor online tool"],
  ["text-trimmer","utility","•","Text Trimmer","Process text trimmer quickly in your browser.","text trimmer online tool"],
  ["word-capitalizer","utility","•","Word Capitalizer","Process word capitalizer quickly in your browser.","word capitalizer online tool"],
  ["palindrome-checker","utility","•","Palindrome Checker","Process palindrome checker quickly in your browser.","palindrome checker online tool"],
  ["anagram-checker","utility","•","Anagram Checker","Process anagram checker quickly in your browser.","anagram checker online tool"],
  ["alphabetize-words","utility","•","Alphabetize Words","Process alphabetize words quickly in your browser.","alphabetize words online tool"],
  ["count-lines","utility","•","Line Counter","Process line counter quickly in your browser.","line counter online tool"],
  ["count-vowels-consonants","utility","•","Vowel and Consonant Counter","Process vowel and consonant counter quickly in your browser.","vowel and consonant counter online tool"],
  ["json-to-yaml","utility","•","JSON to YAML Converter","Process json to yaml converter quickly in your browser.","json to yaml converter online tool"],
  ["yaml-to-json","utility","•","YAML to JSON Notes","Process yaml to json notes quickly in your browser.","yaml to json notes online tool"],
  ["html-minifier","utility","•","HTML Minifier","Process html minifier quickly in your browser.","html minifier online tool"],
  ["css-minifier","utility","•","CSS Minifier","Process css minifier quickly in your browser.","css minifier online tool"],
  ["javascript-minifier","utility","•","JavaScript Minifier","Process javascript minifier quickly in your browser.","javascript minifier online tool"],
  ["url-parser","utility","•","URL Parser","Process url parser quickly in your browser.","url parser online tool"],
  ["query-string-builder","utility","•","Query String Builder","Process query string builder quickly in your browser.","query string builder online tool"],
  ["html-tag-stripper","utility","•","HTML Tag Stripper","Process html tag stripper quickly in your browser.","html tag stripper online tool"],
  ["color-hex-validator","utility","•","HEX Color Validator","Process hex color validator quickly in your browser.","hex color validator online tool"],
  ["rgb-to-hex","utility","•","RGB to HEX Converter","Process rgb to hex converter quickly in your browser.","rgb to hex converter online tool"],
  ["hsl-to-hex","utility","•","HSL to HEX Converter","Process hsl to hex converter quickly in your browser.","hsl to hex converter online tool"],
  ["decimal-to-fraction","utility","•","Decimal to Fraction Converter","Process decimal to fraction converter quickly in your browser.","decimal to fraction converter online tool"],
  ["fraction-to-decimal","utility","•","Fraction to Decimal Converter","Process fraction to decimal converter quickly in your browser.","fraction to decimal converter online tool"],
  ["binary-to-decimal","utility","•","Binary to Decimal Converter","Process binary to decimal converter quickly in your browser.","binary to decimal converter online tool"],
  ["decimal-to-binary","utility","•","Decimal to Binary Converter","Process decimal to binary converter quickly in your browser.","decimal to binary converter online tool"],
  ["modulo-calculator","utility","•","Modulo Calculator","Process modulo calculator quickly in your browser.","modulo calculator online tool"],
  ["power-calculator","utility","•","Power Calculator","Process power calculator quickly in your browser.","power calculator online tool"],
  ["logarithm-calculator","utility","•","Logarithm Calculator","Process logarithm calculator quickly in your browser.","logarithm calculator online tool"],
  ["date-addition-calculator","utility","•","Date Addition Calculator","Process date addition calculator quickly in your browser.","date addition calculator online tool"],
  ["iso-date-converter","utility","•","ISO Date Converter","Process iso date converter quickly in your browser.","iso date converter online tool"],
  ["seconds-to-time","utility","•","Seconds to Time Converter","Process seconds to time converter quickly in your browser.","seconds to time converter online tool"],
  ["random-string-generator","utility","•","Random String Generator","Process random string generator quickly in your browser.","random string generator online tool"],
  ["slug-word-counter","utility","•","Slug Word Counter","Process slug word counter quickly in your browser.","slug word counter online tool"],
] .map(([slug, cat, icon, name, desc, keywords]) => ({ slug, cat, icon, name, desc, keywords }));
tools.push(...extraTools);

const grid = document.querySelector('#tools-grid');
let active = 'all';
let query = '';

document.querySelectorAll('[data-tool-count]').forEach((element) => {
  element.textContent = String(tools.length);
});

function renderCards() {
  const visible = tools.filter((tool) => {
    const matchesFilter = active === 'all' || tool.cat === active;
    const matchesQuery = `${tool.name} ${tool.desc} ${tool.keywords}`.toLowerCase().includes(query);
    return matchesFilter && matchesQuery;
  });

  grid.innerHTML =
    visible
      .map(
        (tool) => `<article class="tool-card"><div class="tool-icon">${tool.icon}</div><h3>${tool.name}</h3><p>${tool.desc}</p><a class="card-link" href="tools/${tool.slug}/">Open tool <span>→</span></a></article>`
      )
      .join('') || '<p>No matching tools. Try another search.</p>';
}

renderCards();

document.querySelector('.filters').addEventListener('click', (event) => {
  if (!event.target.matches('button')) {
    return;
  }

  active = event.target.dataset.filter;
  document.querySelectorAll('.filters button').forEach((button) => {
    button.classList.toggle('active', button === event.target);
  });
  renderCards();
});

document.querySelector('#search').addEventListener('input', (event) => {
  query = event.target.value.trim().toLowerCase();
  renderCards();
});
