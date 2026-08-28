# Tool Home

## IndexNow / Bing

Every push to `main` runs the tracked GitHub Actions workflow at [`.github/workflows/indexnow.yml`](.github/workflows/indexnow.yml). It waits until the root ownership file is live, then submits the pages changed by that push to Bing's IndexNow endpoint.

The ownership file is [`00e47624a218415380d21b85b382ea0c.txt`](00e47624a218415380d21b85b382ea0c.txt), which must remain publicly available at `https://debugleaf.com/00e47624a218415380d21b85b382ea0c.txt`. IndexNow notifications tell Bing about updates; they do not guarantee immediate crawling or indexing.
