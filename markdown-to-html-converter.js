function escapeHtml(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function sanitizeUrl(url) {
  const trimmed = String(url || '').trim();

  if (/^(https?:\/\/|mailto:)/i.test(trimmed)) {
    return trimmed.replace(/"/g, '&quot;');
  }

  return '';
}

function renderInlineMarkdown(text) {
  const codeSpans = [];
  let html = escapeHtml(text).replace(/`([^`]+)`/g, (_, code) => {
    const token = `@@CODE-SPAN-${codeSpans.length}@@`;
    codeSpans.push(`<code>${code}</code>`);
    return token;
  });

  html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/g, (_, label, url) => {
    const safeUrl = sanitizeUrl(url);
    return safeUrl ? `<a href="${safeUrl}" target="_blank" rel="noopener noreferrer">${label}</a>` : label;
  });
  html = html.replace(/(\*\*|__)(.+?)\1/g, '<strong>$2</strong>');
  html = html.replace(/(\*|_)([^*_][\s\S]*?)\1/g, '<em>$2</em>');

  codeSpans.forEach((snippet, index) => {
    html = html.replace(`@@CODE-SPAN-${index}@@`, snippet);
  });

  return html;
}

function renderMarkdownToHtml(markdown) {
  const lines = String(markdown || '').replace(/\r\n/g, '\n').split('\n');
  const blocks = [];
  let paragraph = [];
  let listType = '';
  let listItems = [];
  let inCodeBlock = false;
  let codeLines = [];

  function flushParagraph() {
    if (!paragraph.length) {
      return;
    }

    blocks.push(`<p>${renderInlineMarkdown(paragraph.join(' '))}</p>`);
    paragraph = [];
  }

  function flushList() {
    if (!listItems.length) {
      return;
    }

    const tag = listType === 'ol' ? 'ol' : 'ul';
    blocks.push(`<${tag}>${listItems.map((item) => `<li>${renderInlineMarkdown(item)}</li>`).join('')}</${tag}>`);
    listItems = [];
    listType = '';
  }

  function flushCodeBlock() {
    blocks.push(`<pre><code>${escapeHtml(codeLines.join('\n'))}</code></pre>`);
    codeLines = [];
  }

  for (const line of lines) {
    if (inCodeBlock) {
      if (/^```/.test(line)) {
        flushCodeBlock();
        inCodeBlock = false;
      } else {
        codeLines.push(line);
      }
      continue;
    }

    if (/^```/.test(line)) {
      flushParagraph();
      flushList();
      inCodeBlock = true;
      continue;
    }

    if (!line.trim()) {
      flushParagraph();
      flushList();
      continue;
    }

    const headingMatch = line.match(/^(#{1,6})\s+(.*)$/);
    if (headingMatch) {
      flushParagraph();
      flushList();
      const level = headingMatch[1].length;
      blocks.push(`<h${level}>${renderInlineMarkdown(headingMatch[2].trim())}</h${level}>`);
      continue;
    }

    const orderedMatch = line.match(/^\d+\.\s+(.*)$/);
    if (orderedMatch) {
      flushParagraph();
      if (listType && listType !== 'ol') {
        flushList();
      }
      listType = 'ol';
      listItems.push(orderedMatch[1].trim());
      continue;
    }

    const unorderedMatch = line.match(/^[-*+]\s+(.*)$/);
    if (unorderedMatch) {
      flushParagraph();
      if (listType && listType !== 'ul') {
        flushList();
      }
      listType = 'ul';
      listItems.push(unorderedMatch[1].trim());
      continue;
    }

    const quoteMatch = line.match(/^>\s?(.*)$/);
    if (quoteMatch) {
      flushParagraph();
      flushList();
      blocks.push(`<blockquote><p>${renderInlineMarkdown(quoteMatch[1].trim())}</p></blockquote>`);
      continue;
    }

    if (/^---+$/.test(line.trim())) {
      flushParagraph();
      flushList();
      blocks.push('<hr />');
      continue;
    }

    paragraph.push(line.trim());
  }

  flushParagraph();
  flushList();

  if (inCodeBlock) {
    flushCodeBlock();
  }

  return blocks.join('\n');
}

function countMarkdownMatches(markdown, pattern) {
  return (String(markdown || '').match(pattern) || []).length;
}

function createMarkdownConversion(markdown) {
  const normalized = String(markdown || '').replace(/\r\n/g, '\n');
  const html = renderMarkdownToHtml(normalized);
  const words = (normalized.match(/[A-Za-z0-9]+(?:'[A-Za-z0-9]+)?/g) || []).length;

  return {
    html,
    characters: [...normalized].length,
    lines: normalized ? normalized.split('\n').length : 0,
    words,
    headings: countMarkdownMatches(normalized, /^#{1,6}\s+/gm),
    listItems: countMarkdownMatches(normalized, /^(\d+\.\s+|[-*+]\s+)/gm),
    links: countMarkdownMatches(normalized, /\[[^\]]+\]\([^)]+\)/g)
  };
}

function initMarkdownToHtmlConverter(doc = document) {
  const source = doc.querySelector('#markdown-source');
  const htmlOutput = doc.querySelector('#markdown-html');
  const preview = doc.querySelector('#markdown-preview');
  const status = doc.querySelector('#markdown-status');
  const facts = doc.querySelector('#markdown-facts');

  if (!source || !htmlOutput || !preview || !status || !facts) {
    return null;
  }

  function setStatus(kind, message) {
    status.className = `status-note ${kind}`;
    status.textContent = message;
  }

  function clearOutputs(message) {
    htmlOutput.value = '';
    preview.innerHTML = '<p>Preview updates after you convert Markdown to HTML.</p>';
    facts.innerHTML = '';
    setStatus('info', message);
  }

  function renderFacts(result) {
    facts.innerHTML = [
      ['Characters', String(result.characters)],
      ['Words', String(result.words)],
      ['Lines', String(result.lines)],
      ['Headings', String(result.headings)],
      ['List items', String(result.listItems)],
      ['Markdown links', String(result.links)]
    ]
      .map(([label, value]) => `<li><b>${label}</b>${value}</li>`)
      .join('');
  }

  function convert() {
    try {
      const result = createMarkdownConversion(source.value);
      htmlOutput.value = result.html;
      preview.innerHTML = result.html || '<p>No output yet. Add some Markdown and convert it.</p>';
      renderFacts(result);
      setStatus('success', 'Converted Markdown into escaped HTML locally in your browser.');
    } catch (error) {
      clearOutputs(error.message || 'Unable to convert this Markdown.');
      setStatus('error', error.message || 'Unable to convert this Markdown.');
    }
  }

  async function copyHtml(button) {
    if (!htmlOutput.value) {
      return;
    }

    try {
      await navigator.clipboard.writeText(htmlOutput.value);
    } catch {
      htmlOutput.select();
      doc.execCommand('copy');
    }

    const originalLabel = button.textContent;
    button.textContent = 'Copied ✓';
    setTimeout(() => {
      button.textContent = originalLabel;
    }, 1400);
  }

  doc.querySelector('#markdown-convert').addEventListener('click', convert);
  doc.querySelector('#markdown-copy').addEventListener('click', (event) => copyHtml(event.target));
  doc.querySelector('#markdown-sample').addEventListener('click', () => {
    source.value = `# Sprint notes

Ship the next release with:
- Updated landing page copy
- A fresh [debug checklist](https://debugleaf.com/)
- \`npm run build\` before deploy

> Keep the HTML escaped so pasted tags stay safe.

## Example code
\`\`\`
const ready = true;
console.log(ready);
\`\`\``;
    convert();
  });
  doc.querySelector('#markdown-clear').addEventListener('click', () => {
    source.value = '';
    clearOutputs('Paste Markdown, then convert it into HTML and preview it below.');
    source.focus();
  });

  clearOutputs('Paste Markdown, then convert it into HTML and preview it below.');

  return { convert, clearOutputs };
}

if (typeof document !== 'undefined') {
  initMarkdownToHtmlConverter(document);
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    escapeHtml,
    sanitizeUrl,
    renderInlineMarkdown,
    renderMarkdownToHtml,
    createMarkdownConversion,
    initMarkdownToHtmlConverter
  };
}
