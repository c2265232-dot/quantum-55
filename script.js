const games = [
  { name: "Slope", category: "action", url: "https://slopecom.com/" },
  { name: "Run 3", category: "action", url: "https://run3.io/" },
  { name: "YoHoHo.io", category: "action", url: "https://yohoho.io/" },
  { name: "Shell Shockers", category: "action", url: "https://shellshock.io/" },
  { name: "Krunker", category: "action", url: "https://krunker.io/" },
  { name: "Agar.io", category: "action", url: "https://agar.io/" },
  { name: "Slither.io", category: "action", url: "https://slither.io/" },
  { name: "Paper.io 2", category: "action", url: "https://paper-io.com/" },
  { name: "Hole.io", category: "action", url: "https://hole-io.com/" },
  { name: "Drift Hunters", category: "action", url: "https://drifthunters2.io/" },
  { name: "Moto X3M", category: "action", url: "https://motox3m.io/" },
  { name: "Tunnel Rush", category: "action", url: "https://tunnelrush.io/" },

  { name: "Tetris", category: "puzzle", url: "https://tetris.com/play-tetris" },
  { name: "Minesweeper", category: "puzzle", url: "https://minesweeperonline.com/" },
  { name: "Sudoku", category: "puzzle", url: "https://sudoku.com/" },
  { name: "Wordle", category: "puzzle", url: "https://www.nytimes.com/games/wordle/index.html" },
  { name: "Hextris", category: "puzzle", url: "https://hextris.io/" },

  { name: "Basketball Stars", category: "sports", url: "https://basketballstars.io/" },
  { name: "Soccer Random", category: "sports", url: "https://soccerrandom.io/" },
  { name: "Volley Random", category: "sports", url: "https://volleyrandom.io/" },

  { name: "Crazy Cattle 3D", category: "action", url: "https://crazy-cattle.github.io/" }
];
// add many more automatically
for (let i = 1; i <= 200; i++) {
  games.push({ name: "Game " + i, url: "https://example.com" });
}

let favorites = JSON.parse(localStorage.getItem("favorites")) || [];
let recent = JSON.parse(localStorage.getItem("recent")) || [];

function createGameCard(game) {
  const div = document.createElement("div");
  div.className = "game";
  div.innerText = game.name;

  div.onclick = () => openGame(game.url, game.name);

  return div;
}

function renderGames(list) {
  const container = document.getElementById("games");
  container.innerHTML = "";
  list.forEach(g => container.appendChild(createGameCard(g)));
  renderFavorites();
}

function renderFavorites() {
  const container = document.getElementById("favorites");
  container.innerHTML = "";
  games.filter(g => favorites.includes(g.name))
    .forEach(g => container.appendChild(createGameCard(g)));
}

function renderRecent() {
  const container = document.getElementById("recent");
  container.innerHTML = "";
  recent.forEach(g => container.appendChild(createGameCard(g)));
}

function openGame(url, name) {
  document.getElementById("player").classList.remove("hidden");
  document.getElementById("gameFrame").src = url;
  document.getElementById("gameTitle").innerText = name;

  recent = recent.filter(g => g.name !== name);
  recent.unshift({ name, url });
  if (recent.length > 10) recent.pop();

  localStorage.setItem("recent", JSON.stringify(recent));
  renderRecent();
}

function closeGame() {
  document.getElementById("player").classList.add("hidden");
  document.getElementById("gameFrame").src = "";
}

function fullscreen() {
  document.getElementById("gameFrame").requestFullscreen();
}

function toggleFavorite(name) {
  favorites.includes(name)
    ? favorites = favorites.filter(f => f !== name)
    : favorites.push(name);

  localStorage.setItem("favorites", JSON.stringify(favorites));
  renderGames(games);
}

function showFavorites() {
  renderGames(games.filter(g => favorites.includes(g.name)));
}

function filterGames() {
  renderGames(games);
}

function searchGames() {
  const q = document.getElementById("search").value.toLowerCase();
  renderGames(games.filter(g => g.name.toLowerCase().includes(q)));
}

// THEMES
function setThemePreset(theme) {
  const colors = {
    teal: "#14b8a6",
    blue: "#3b82f6",
    purple: "#8b5cf6"
  };
  document.documentElement.style.setProperty('--accent', colors[theme]);
}

function setCustomColor(color) {
  document.documentElement.style.setProperty('--accent', color);
}

// CLOUD SAVE
function exportData() {
  const code = btoa(JSON.stringify({ favorites, recent }));
  prompt("Copy this:", code);
}

function importData() {
  const code = prompt("Paste code:");
  if (!code) return;

  const data = JSON.parse(atob(code));
  favorites = data.favorites || [];
  recent = data.recent || [];

  renderGames(games);
  renderRecent();
}

renderGames(games);
renderRecent();
