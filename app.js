const tools = [
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
  ['unix-timestamp-converter', 'utility', 'TS', 'Unix Timestamp Converter', 'Convert epoch seconds or milliseconds into readable UTC and local time.', 'unix timestamp converter online epoch to date converter']
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
