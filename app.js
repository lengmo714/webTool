const tools = [
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
