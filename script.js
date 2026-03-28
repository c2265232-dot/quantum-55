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

let favorites = JSON.parse(localStorage.getItem("favorites")) || [];
let recent = JSON.parse(localStorage.getItem("recent")) || [];

function createGameCard(game) {
  const div = document.createElement("div");
  div.className = "game";

  const fav = favorites.includes(game.name);

  div.innerHTML = `
    <h3>${game.name}</h3>
    <button onclick="openGame('${game.url}', '${game.name}')">Play</button>
    <button onclick="toggleFavorite('${game.name}')">${fav ? "★" : "☆"}</button>
  `;

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
  recent.forEach(g => {
    const div = document.createElement("div");
    div.className = "game";
    div.innerHTML = `<h3>${g.name}</h3>
    <button onclick="openGame('${g.url}', '${g.name}')">Play</button>`;
    container.appendChild(div);
  });
}

function openGame(url, name) {
  const frame = document.getElementById("gameFrame");
  document.getElementById("player").classList.remove("hidden");
  frame.src = url;

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

function openExternal() {
  window.open(document.getElementById("gameFrame").src);
}

function toggleFavorite(name) {
  favorites.includes(name)
    ? favorites = favorites.filter(f => f !== name)
    : favorites.push(name);

  localStorage.setItem("favorites", JSON.stringify(favorites));
  renderGames(games);
}

function filterGames(category) {
  renderGames(category === "all"
    ? games
    : games.filter(g => g.category === category));
}

function searchGames() {
  const q = document.getElementById("search").value.toLowerCase();
  renderGames(games.filter(g => g.name.toLowerCase().includes(q)));
}

function toggleAccount() {
  document.getElementById("accountBox").classList.toggle("hidden");
}

function saveAccount() {
  localStorage.setItem("user", document.getElementById("username").value);
}

function setPreset(name) {
  if (name === "google") {
    document.title = "Google";
  }
  if (name === "classroom") {
    document.title = "Classes";
  }
}

renderGames(games);
renderRecent();
