/* ============================================================
   SETTINGS — edit these to change the answers / behavior
   ============================================================ */
const VALID_NAMES = ["yasmine", "jazz", "jasmine"];

// accepted phrasings for each date (all lowercase, no punctuation)
const HER_DATE_MATCHES = ["27 october", "october 27", "27/10", "10/27", "27-10", "10-27"];
const MY_DATE_MATCHES  = ["5 january", "january 5", "5/1", "1/5", "05/01", "01/05", "5-1", "1-5"];

const VALID_NUMBER = "9634520";

// Formspree (or any form backend) endpoint so you actually receive her comments.
// 1) go to https://formspree.io, make a free form, copy the endpoint it gives you
// 2) paste it below, replacing the placeholder
const COMMENT_ENDPOINT = "https://formspree.io/f/mykrevop";

/* ============================================================
   SCREEN NAVIGATION
   ============================================================ */
function showScreen(name) {
  document.querySelectorAll(".screen").forEach(s => s.classList.remove("active"));
  const target = document.querySelector(`.screen[data-screen="${name}"]`);
  if (target) target.classList.add("active");
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function normalize(str) {
  return str.trim().toLowerCase().replace(/[.,]/g, "");
}

/* ---- back buttons on the "wrong" screens ---- */
document.querySelectorAll("[data-back]").forEach(btn => {
  btn.addEventListener("click", () => showScreen(btn.dataset.back));
});

/* ============================================================
   STEP 1 — NAME
   ============================================================ */
document.getElementById("form-name").addEventListener("submit", e => {
  e.preventDefault();
  const val = normalize(document.getElementById("input-name").value);
  if (VALID_NAMES.includes(val)) {
    showScreen("dates");
  } else {
    showScreen("wrong-name");
  }
});

/* ============================================================
   STEP 2 — DATES
   ============================================================ */
document.getElementById("form-dates").addEventListener("submit", e => {
  e.preventDefault();
  const her = normalize(document.getElementById("input-her-date").value);
  const mine = normalize(document.getElementById("input-my-date").value);

  const herOk = HER_DATE_MATCHES.includes(her);
  const mineOk = MY_DATE_MATCHES.includes(mine);

  if (herOk && mineOk) {
    showScreen("number");
  } else {
    showScreen("wrong-dates");
  }
});

/* ============================================================
   STEP 3 — SECRET NUMBER
   ============================================================ */
document.getElementById("form-number").addEventListener("submit", e => {
  e.preventDefault();
  const val = document.getElementById("input-number").value.trim();
  if (val === VALID_NUMBER) {
    buildAlbum();
    showScreen("final");
  } else {
    showScreen("wrong-number");
  }
});

/* ============================================================
   FINAL PAGE — ALBUM
   Drop your own photos into the /images folder named
   img1.jpg, img2.jpg ... img26.jpg (jpg or png both fine,
   just update the extension below if needed).
   Any slot without a matching file quietly shows a heart instead.
   ============================================================ */
function buildAlbum() {
  const grid = document.getElementById("album-grid");
  if (grid.dataset.built) return; // only build once
  grid.dataset.built = "true";

  const SLOTS = 26;
  for (let i = 1; i <= SLOTS; i++) {
    const figure = document.createElement("figure");
    const img = document.createElement("img");
    img.src = `${i}.jpeg`;
    img.alt = "a liked story";
    img.loading = "lazy";
    img.onerror = () => {
      figure.innerHTML = `<div class="placeholder">🤍</div>`;
    };
    figure.appendChild(img);
    grid.appendChild(figure);
  }
}

/* ============================================================
   FINAL PAGE — COMMENTS
   ============================================================ */
document.getElementById("form-comment").addEventListener("submit", async e => {
  e.preventDefault();
  const textarea = document.getElementById("input-comment");
  const status = document.getElementById("comment-status");
  const message = textarea.value.trim();
  if (!message) return;

  status.textContent = "sending...";

  try {
    const res = await fetch(COMMENT_ENDPOINT, {
      method: "POST",
      headers: { "Accept": "application/json", "Content-Type": "application/json" },
      body: JSON.stringify({ message })
    });
    if (res.ok) {
      status.textContent = "got it 🤍 thank you for that.";
      textarea.value = "";
    } else {
      status.textContent = "hmm, that didn't send — but I still want to hear it another way.";
    }
  } catch (err) {
    status.textContent = "hmm, that didn't send — but I still want to hear it another way.";
  }
});
