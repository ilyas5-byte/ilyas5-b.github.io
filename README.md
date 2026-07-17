# the locked door site

A little gated surprise page: she has to enter the right name, the right two
birthdays, and a secret number before the real page unlocks.

## Files

- `index.html` — all four screens (name → dates → number → final page)
- `style.css` — the look
- `script.js` — the logic (answers, checks, comments)
- `images/` — put her photos here (see below)

## 1. Add your photos

Drop photos into the `images/` folder named exactly `img1.jpg` through
`img26.jpg` (26 photos total).

Any slot without a matching file just shows a small heart instead, so you
don't need all 26 right away. If your files are `.png` instead of `.jpg`,
open `script.js` and change `img${i}.jpg` to `img${i}.png`.

## 2. Get her comments sent to you (optional but recommended)

Right now the comment box tries to send to a placeholder address, so it
won't actually reach you until you set this up — it takes 2 minutes:

1. Go to [formspree.io](https://formspree.io) and make a free account.
2. Create a new form — it'll give you an endpoint like
   `https://formspree.io/f/abc1234`.
3. Open `script.js`, find this line near the top:
   ```js
   const COMMENT_ENDPOINT = "https://formspree.io/f/YOUR_FORM_ID";
   ```
   and replace it with your real endpoint.
4. Every time she submits the comment box, you'll get an email.

## 3. Change the answers

Also near the top of `script.js`:

```js
const VALID_NAMES = ["yasmine", "jazz", "jasmine"];
const HER_DATE_MATCHES = ["27 october", "october 27", "27/10", ...];
const MY_DATE_MATCHES  = ["5 january", "january 5", "5/1", ...];
const VALID_NUMBER = "9634520";
```

Edit any of these to change what counts as a correct answer.

> Note: since this is a static site, anyone determined enough could read
> `script.js` and see the answers. That's fine for a cute surprise between
> two people — just don't use this pattern for anything that needs real
> security.

## 4. Put it on GitHub Pages

1. Create a new repository on GitHub (e.g. `for-yasmine`).
2. Upload all the files in this folder (`index.html`, `style.css`,
   `script.js`, and the `images/` folder with your photos) to the repo —
   either drag-and-drop on github.com, or:
   ```bash
   git init
   git add .
   git commit -m "the door"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
   git push -u origin main
   ```
3. In the repo, go to **Settings → Pages**.
4. Under "Build and deployment", set **Source** to `Deploy from a branch`,
   branch `main`, folder `/ (root)`. Save.
5. GitHub will give you a live link, usually:
   `https://YOUR_USERNAME.github.io/YOUR_REPO/`
6. Wait a minute or two, then open that link and test the whole flow
   yourself before sending it to her.

That's it — send her the link.
