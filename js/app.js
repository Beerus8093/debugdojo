// ── Belt system ───────────────────────────────────────────────────────────────
const BELTS = [
  { name: "White Belt",  color: "#f0f0f0", min: 0,    max: 100  },
  { name: "Yellow Belt", color: "#ffd60a", min: 100,  max: 250  },
  { name: "Green Belt",  color: "#2dc653", min: 250,  max: 500  },
  { name: "Blue Belt",   color: "#4cc9f0", min: 500,  max: 800  },
  { name: "Red Belt",    color: "#e63946", min: 800,  max: 1200 },
  { name: "Black Belt",  color: "#1a1a1a", min: 1200, max: 9999 },
];

function getBelt(xp) {
  return BELTS.find(b => xp >= b.min && xp < b.max) || BELTS[BELTS.length - 1];
}

function getPlayer() {
  const raw = localStorage.getItem('dd_player');
  if (!raw) return null;
  return JSON.parse(raw);
}

function savePlayer(player) {
  localStorage.setItem('dd_player', JSON.stringify(player));
}

function addXP(amount) {
  const p = getPlayer();
  if (!p) return;
  p.xp = (p.xp || 0) + amount;
  savePlayer(p);
  showXPToast(amount);
  return p.xp;
}

function showXPToast(amount) {
  let toast = document.getElementById('xp-toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'xp-toast';
    toast.className = 'xp-toast';
    document.body.appendChild(toast);
  }
  toast.textContent = `+${amount} XP`;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 2000);
}

function updateNavBelt() {
  const p = getPlayer();
  const el = document.getElementById('nav-belt');
  if (!el) return;
  if (!p) { el.textContent = 'Start Journey'; return; }
  const belt = getBelt(p.xp || 0);
  const dot = el.querySelector('.belt-dot');
  const label = el.querySelector('.belt-name');
  if (dot) dot.style.background = belt.color;
  if (label) label.textContent = belt.name;
}

document.addEventListener('DOMContentLoaded', updateNavBelt);
