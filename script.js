const slides = [...document.querySelectorAll(".slide")];
const music = document.getElementById("bgMusic");
let current = 0;
const musicPill = document.getElementById("musicPill");

function showSlide(index) {
  if (index < 0 || index >= slides.length) return;
  slides.forEach((s, i) => s.classList.toggle("active", i === index));
  current = index;
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function startMusic() {
  if (!music.paused) {
    musicPill.classList.add("playing");
    return;
  }
  music.volume = 0.45;
  music.play().then(() => {
    musicPill.classList.add("playing");
    document.getElementById("musicText").textContent = "musik sedang diputar";
    document.getElementById("musicToggle").textContent = "♫";
  }).catch(() => {});
}

document.querySelectorAll("[data-next]").forEach(btn => {
  btn.addEventListener("click", () => {
    startMusic();
    showSlide(Number(btn.dataset.next));
  });
});

document.getElementById("openBtn").addEventListener("click", () => {
  startMusic();
  showSlide(1);
});

// Floating hearts
const floating = document.getElementById("floatingHearts");
setInterval(() => {
  const h = document.createElement("span");
  h.className = "float-heart";
  h.textContent = Math.random() > .35 ? "♡" : "✦";
  h.style.left = Math.random() * 100 + "vw";
  h.style.bottom = "-20px";
  h.style.animationDuration = (5 + Math.random() * 5) + "s";
  h.style.fontSize = (8 + Math.random() * 13) + "px";
  floating.appendChild(h);
  setTimeout(() => h.remove(), 11000);
}, 850);

// Letter
const letterModal = document.getElementById("letterModal");
document.getElementById("letterBtn").addEventListener("click", () => {
  letterModal.classList.add("show");
  letterModal.setAttribute("aria-hidden", "false");
});
document.getElementById("closeLetter").addEventListener("click", () => {
  letterModal.classList.remove("show");
  letterModal.setAttribute("aria-hidden", "true");
});
letterModal.querySelector(".modal-backdrop").addEventListener("click", () => {
  letterModal.classList.remove("show");
  letterModal.setAttribute("aria-hidden", "true");
});

// Game 1: catch hearts
const heartGame = document.getElementById("heartGame");
const heartStatus = document.getElementById("heartStatus");
const startHeart = document.getElementById("startHeart");
let caught = 0;
let heartTimer;

function spawnHeart() {
  const old = heartGame.querySelector(".moving-heart");
  if (old) old.remove();

  const h = document.createElement("button");
  h.className = "moving-heart";
  h.textContent = "♥";
  h.style.left = (5 + Math.random() * 80) + "%";
  h.style.top = (5 + Math.random() * 70) + "%";

  h.addEventListener("click", () => {
    caught++;
    heartStatus.textContent = `${caught} / 5`;
    h.remove();

    if (caught >= 5) {
      clearTimeout(heartTimer);
      heartStatus.textContent = "5 / 5 — yay, hati biya ketangkep semua 🤍";
      startHeart.textContent = "main lagi";
      return;
    }
    heartTimer = setTimeout(spawnHeart, 120);
  });

  heartGame.appendChild(h);

  heartTimer = setTimeout(() => {
    if (h.isConnected) {
      h.remove();
      spawnHeart();
    }
  }, 900);
}

startHeart.addEventListener("click", () => {
  clearTimeout(heartTimer);
  caught = 0;
  heartStatus.textContent = "0 / 5";
  spawnHeart();
});

// Game 2
const answerBox = document.getElementById("answerBox");
document.querySelectorAll(".choice").forEach(btn => {
  btn.addEventListener("click", () => {
    if (btn.dataset.answer === "ice") {
      answerBox.textContent = "hayoo kenapa pilih eskrimm mulai mulai ni mikir nya";
    } else {
      answerBox.textContent = "ini my love cinta favorite biya tapi lebih cinta sayangg";
    }
  });
});

// Game 3
const secretMessages = [
  "rahasia: kamu itu salah satu bagian paling manis di hidup biya ♡",
  "ketahuan! hadiahmu hari ini adalah... tambahan sayang dari biya 😗",
  "jangan bilang siapa-siapa, tapi biya sayang banget sama kamu."
];

document.querySelectorAll(".secret-boxes button").forEach(btn => {
  btn.addEventListener("click", () => {
    document.getElementById("secretResult").textContent =
      secretMessages[Number(btn.dataset.secret)];
  });
});

// Music toggle
const musicToggle = document.getElementById("musicToggle");
const musicText = document.getElementById("musicText");

musicToggle.addEventListener("click", () => {
  if (music.paused) {
    music.play().then(() => {
      musicText.textContent = "musik sedang diputar";
      musicToggle.textContent = "♫";
      musicPill.classList.add("playing");
    }).catch(() => {});
  } else {
    music.pause();
    musicText.textContent = "musik dijeda";
    musicToggle.textContent = "▶";
    musicPill.classList.remove("playing");
  }
});

// Replay
document.getElementById("replay").addEventListener("click", () => {
  showSlide(0);
  window.scrollTo({ top: 0, behavior: "smooth" });
});
