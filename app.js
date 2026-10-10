const tools = [
  ["unicode-code-point-inspector","analysis","U+","Unicode Code Point Inspector","Inspect Unicode characters as code points, JSON escapes, UTF-16 units, and UTF-8 bytes in a private browser report.","unicode code point inspector online,character to unicode code point,json escape character viewer"],
  ["integer-bit-length-calculator","utility","2ⁿ","Integer Bit Length Calculator","Calculate exact integer bit length and signed or unsigned byte requirements for large decimal values using browser BigInt arithmetic.","integer bit length calculator online,signed byte size calculator,bigint binary length tool"],
  ["integer-division-calculator","utility","÷","Integer Division and Remainder Calculator","Divide large signed integers exactly and find the quotient and remainder using truncating or Euclidean division, with an identity check.","large integer quotient remainder calculator,euclidean division negative numbers,exact signed integer division online"],
  ["text-common-prefix-finder","utility","abc","Text Line Common Prefix Finder","Find the longest case-sensitive prefix shared by every text line, count its Unicode code points, and remove it from all lines locally.","longest common prefix text lines online,remove shared prefix from list,unicode common starting text finder"],
  ["integer-digit-analyzer","utility","123","Integer Digit Analyzer","Analyze decimal integer digits: calculate the digit sum, digital root, digit count, and frequency of each digit without losing leading zeros.","integer digit sum calculator online,digital root large integer,digit frequency counter leading zeros"],
  ["text-line-keyword-filter","utility","LINE","Text Line Keyword Filter","Keep or exclude text lines containing a literal keyword, with case-sensitive or case-insensitive matching and preserved blank lines.","filter text lines containing keyword online,exclude lines with literal text,case insensitive line filter"],
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
tools.push({"slug":"decimal-rounding-calculator","cat":"utility","icon":"#","name":"Exact Decimal Rounding Calculator","desc":"Round decimal strings without floating-point errors. Choose decimal places and half-away-from-zero, floor, ceiling, or truncation.","keywords":"exact decimal rounding online,round decimal without floating point errors,negative number floor ceiling calculator"});
tools.push({"slug":"combinations-permutations-calculator","cat":"utility","icon":"#","name":"Combinations and Permutations Calculator","desc":"Calculate exact nCr combinations and nPr permutations without repetition using big integer arithmetic for up to 1,000 items.","keywords":"exact ncr npr calculator online,combinations without repetition calculator,large integer permutation calculator"});

tools.push({"slug":"resistor-color-code-calculator","cat":"utility","icon":"#","name":"Four-Band Resistor Color Code Calculator","desc":"Decode four resistor color bands into resistance in ohms, tolerance, and minimum and maximum values directly in your browser.","keywords":"four band resistor color code calculator,resistor tolerance range calculator,decode resistor bands to ohms"});
tools.push({"slug":"bitwise-calculator","cat":"utility","icon":"#","name":"Fixed-Width Bitwise Calculator","desc":"Calculate unsigned AND, OR, XOR, NOT, and logical shifts at 8, 16, 32, or 64 bits, with exact decimal, binary, and hexadecimal results.","keywords":"unsigned 64 bit bitwise calculator,bitwise and or xor calculator online,fixed width logical shift calculator"});

tools.push({"slug":"quadratic-equation-solver","cat":"utility","icon":"#","name":"Quadratic Equation Solver","desc":"Solve quadratic equations with real or complex roots, including linear and degenerate cases, directly in your browser.","keywords":"quadratic equation solver complex roots,solve ax squared bx c online,quadratic discriminant calculator"});
tools.push({"slug":"arithmetic-progression-calculator","cat":"utility","icon":"#","name":"Arithmetic Progression Calculator","desc":"Calculate the nth term and sum of an arithmetic progression from its first term, common difference, and term count using exact integer arithmetic.","keywords":"arithmetic progression nth term sum calculator,exact arithmetic sequence sum online,negative common difference sequence calculator"});

tools.push({"slug":"modular-inverse-calculator","cat":"utility","icon":"#","name":"Modular Inverse Calculator","desc":"Find the modular multiplicative inverse of an integer using exact arithmetic, with a greatest common divisor check and multiplication verification.","keywords":"modular multiplicative inverse calculator online,extended euclidean inverse large integers,inverse modulo coprime checker"});
tools.push({"slug":"regular-polygon-angle-calculator","cat":"utility","icon":"#","name":"Regular Polygon Angle Calculator","desc":"Calculate each interior, exterior, and central angle of a regular polygon, plus its total interior angle sum and number of diagonals.","keywords":"regular polygon interior exterior angle calculator,polygon angle sum from number of sides,exact polygon angles and diagonals"});
tools.push({"slug":"integer-square-root-calculator","cat":"utility","icon":"#","name":"Integer Square Root Calculator","desc":"Find the exact floor square root of a large nonnegative integer, its remainder, and whether it is a perfect square without floating-point rounding.","keywords":"exact integer square root calculator,large perfect square checker,floor square root remainder online"});
tools.push({"slug":"factorial-trailing-zeros-calculator","cat":"utility","icon":"#","name":"Factorial Trailing Zeros Calculator","desc":"Count the trailing decimal zeros of n factorial exactly without expanding the factorial, with a breakdown of the powers of five that contribute.","keywords":"factorial trailing zeros calculator,number of ending zeros in n factorial,powers of five factorial zero count"});

tools.push({"slug":"json-merge-patch","cat":"utility","icon":"⇄","name":"JSON Merge Patch Tool","desc":"Apply a JSON merge patch to a target document: merge object members, remove keys with null, and replace arrays locally in your browser.","keywords":"apply json merge patch online,merge json objects null delete keys,json merge patch array replacement"});
tools.push({"slug":"text-line-interleaver","cat":"utility","icon":"⇄","name":"Text Line Interleaver","desc":"Alternate lines from two text lists, keeping duplicates and blank lines and appending remaining lines from the longer list.","keywords":"interleave two text lists online,alternate lines from two files,merge lists alternating rows"});

tools.push({"slug":"text-line-slice-extractor","cat":"utility","icon":"[]","name":"Text Line Slice Extractor","desc":"Extract an inclusive range of numbered lines from pasted text while preserving spaces and blank lines, directly in your browser.","keywords":"extract line range from text online,copy lines by start end number,preserve blank lines text slice"});
tools.push({"slug":"text-run-length-encoder","cat":"utility","icon":"[]","name":"Text Run-Length Encoder","desc":"Encode consecutive repeated Unicode characters as JSON count pairs or decode those pairs back into the original text locally.","keywords":"run length encode text json online,decode character count pairs,unicode repeated character encoder"});
tools.push({"slug":"text-line-length-analyzer","cat":"analysis","icon":"↕","name":"Text Line Length Analyzer","desc":"Measure every text line by Unicode code points, UTF-16 units, and UTF-8 bytes, with shortest and longest line statistics calculated locally.","keywords":"text line length analyzer online,utf8 bytes per line calculator,unicode code point line counter"});
tools.push({"slug":"number-sequence-gap-finder","cat":"utility","icon":"…","name":"Number Sequence Gap Finder","desc":"Find missing integers between sorted number-list values, including very large signed values, with exact browser-based BigInt arithmetic.","keywords":"find missing numbers in sorted list online,integer sequence gap finder,bigint missing integer range calculator"});

// BEGIN 30 NEW TOOLS
tools.push({"slug":"sentence-counter","cat":"analysis","icon":"◎","name":"Sentence Counter","desc":"Count sentences using terminal punctuation, including Chinese full stops and question marks.","keywords":"sentence counter,online sentence counter,free browser tool"});
tools.push({"slug":"paragraph-counter","cat":"analysis","icon":"◎","name":"Paragraph Counter","desc":"Count nonempty paragraphs separated by one or more blank lines.","keywords":"paragraph counter,online paragraph counter,free browser tool"});
tools.push({"slug":"text-ngram-generator","cat":"analysis","icon":"◎","name":"Word N-Gram Generator","desc":"List consecutive word pairs, triples, or larger groups with frequency counts.","keywords":"word n-gram generator,online word n-gram generator,free browser tool"});
tools.push({"slug":"longest-word-finder","cat":"analysis","icon":"◎","name":"Longest Word Finder","desc":"Find the longest words in text, counting Unicode letters and numbers.","keywords":"longest word finder,online longest word finder,free browser tool"});
tools.push({"slug":"repeated-word-finder","cat":"analysis","icon":"◎","name":"Repeated Word Finder","desc":"Find words used more than once, ignoring case and sorting by frequency.","keywords":"repeated word finder,online repeated word finder,free browser tool"});
tools.push({"slug":"nato-phonetic-converter","cat":"transform","icon":"◇","name":"NATO Phonetic Alphabet Converter","desc":"Spell English letters with the NATO phonetic alphabet while preserving digits and punctuation.","keywords":"nato phonetic alphabet converter,online nato phonetic alphabet converter,free browser tool"});
tools.push({"slug":"rot47-cipher","cat":"transform","icon":"◇","name":"ROT47 Encoder and Decoder","desc":"Apply reversible ROT47 substitution to printable ASCII characters.","keywords":"rot47 encoder and decoder,online rot47 encoder and decoder,free browser tool"});
tools.push({"slug":"regex-escape","cat":"transform","icon":"◇","name":"Regular Expression Escaper","desc":"Escape characters with special meaning in a JavaScript regular expression.","keywords":"regular expression escaper,online regular expression escaper,free browser tool"});
tools.push({"slug":"markdown-heading-outline","cat":"analysis","icon":"◎","name":"Markdown Heading Outline","desc":"Extract ATX headings into a readable outline with their levels.","keywords":"markdown heading outline,online markdown heading outline,free browser tool"});
tools.push({"slug":"markdown-link-extractor","cat":"analysis","icon":"◎","name":"Markdown Link Extractor","desc":"Extract inline Markdown link labels and destinations, including image links.","keywords":"markdown link extractor,online markdown link extractor,free browser tool"});
tools.push({"slug":"html-heading-extractor","cat":"analysis","icon":"◎","name":"HTML Heading Extractor","desc":"List h1 through h6 headings from pasted HTML, with text content and level.","keywords":"html heading extractor,online html heading extractor,free browser tool"});
tools.push({"slug":"css-specificity-calculator","cat":"analysis","icon":"◎","name":"CSS Specificity Calculator","desc":"Calculate the ID, class, and type specificity of a basic CSS selector.","keywords":"css specificity calculator,online css specificity calculator,free browser tool"});
tools.push({"slug":"css-px-rem-converter","cat":"utility","icon":"◇","name":"CSS PX to REM Converter","desc":"Convert pixel values to rem and back using a chosen root font size.","keywords":"css px to rem converter,online css px to rem converter,free browser tool"});
tools.push({"slug":"json-key-sorter","cat":"transform","icon":"◇","name":"JSON Key Sorter","desc":"Sort object keys recursively while preserving array order and values.","keywords":"json key sorter,online json key sorter,free browser tool"});
tools.push({"slug":"json-flattener","cat":"transform","icon":"◇","name":"JSON Flattener","desc":"Flatten nested JSON into JSON Pointer paths with values.","keywords":"json flattener,online json flattener,free browser tool"});
tools.push({"slug":"json-array-deduplicator","cat":"clean","icon":"◇","name":"JSON Array Deduplicator","desc":"Remove duplicate JSON array entries by structural value while preserving first occurrences.","keywords":"json array deduplicator,online json array deduplicator,free browser tool"});
tools.push({"slug":"csv-column-extractor","cat":"transform","icon":"◇","name":"CSV Column Extractor","desc":"Extract one CSV column by header name or one-based position, respecting quoted fields.","keywords":"csv column extractor,online csv column extractor,free browser tool"});
tools.push({"slug":"csv-row-counter","cat":"analysis","icon":"◎","name":"CSV Row Counter","desc":"Count CSV records and blank records with quote-aware parsing.","keywords":"csv row counter,online csv row counter,free browser tool"});
tools.push({"slug":"csv-column-profiler","cat":"analysis","icon":"◎","name":"CSV Column Profiler","desc":"Show each CSV header, filled cell count, and distinct value count.","keywords":"csv column profiler,online csv column profiler,free browser tool"});
tools.push({"slug":"iso-week-calculator","cat":"utility","icon":"◇","name":"ISO Week Calculator","desc":"Find the ISO week number and week year for a calendar date.","keywords":"iso week calculator,online iso week calculator,free browser tool"});
tools.push({"slug":"day-of-year-calculator","cat":"utility","icon":"◇","name":"Day of Year Calculator","desc":"Find a date’s ordinal day and days remaining in the year.","keywords":"day of year calculator,online day of year calculator,free browser tool"});
tools.push({"slug":"weekday-calculator","cat":"utility","icon":"◇","name":"Weekday Calculator","desc":"Find the weekday for a calendar date using UTC date arithmetic.","keywords":"weekday calculator,online weekday calculator,free browser tool"});
tools.push({"slug":"business-day-calculator","cat":"utility","icon":"◇","name":"Business Day Calculator","desc":"Count Monday to Friday dates in an inclusive date range; public holidays are not deducted.","keywords":"business day calculator,online business day calculator,free browser tool"});
tools.push({"slug":"prime-range-generator","cat":"utility","icon":"◇","name":"Prime Range Generator","desc":"List prime numbers in an inclusive integer range up to one million.","keywords":"prime range generator,online prime range generator,free browser tool"});
tools.push({"slug":"divisor-list-generator","cat":"utility","icon":"◇","name":"Divisor List Generator","desc":"List all positive divisors of a positive integer up to one trillion.","keywords":"divisor list generator,online divisor list generator,free browser tool"});
tools.push({"slug":"triangular-number-calculator","cat":"utility","icon":"◇","name":"Triangular Number Calculator","desc":"Calculate the nth triangular number exactly using big integer arithmetic.","keywords":"triangular number calculator,online triangular number calculator,free browser tool"});
tools.push({"slug":"distance-converter","cat":"utility","icon":"◇","name":"Distance Converter","desc":"Convert between metres, kilometres, miles, feet, and inches.","keywords":"distance converter,online distance converter,free browser tool"});
tools.push({"slug":"speed-converter","cat":"utility","icon":"◇","name":"Speed Converter","desc":"Convert between metres per second, kilometres per hour, miles per hour, and knots.","keywords":"speed converter,online speed converter,free browser tool"});
tools.push({"slug":"area-converter","cat":"utility","icon":"◇","name":"Area Converter","desc":"Convert between square metres, square kilometres, square feet, acres, and hectares.","keywords":"area converter,online area converter,free browser tool"});
tools.push({"slug":"pressure-converter","cat":"utility","icon":"◇","name":"Pressure Converter","desc":"Convert between pascals, kilopascals, bar, PSI, and atmospheres.","keywords":"pressure converter,online pressure converter,free browser tool"});
// END 30 NEW TOOLS

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
