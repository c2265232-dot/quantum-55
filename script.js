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
// 🎮 RENDER GAMES
function createGameCard(game) {
  const div = document.createElement("div");
  div.className = "game";

  div.innerHTML = `<span>${game.name}</span>`;

  div.onclick = () => openGame(game.url);

  return div;
}

function renderGames() {
  const container = document.getElementById("games");
  container.innerHTML = "";

  games.forEach(game => {
    container.appendChild(createGameCard(game));
  });
}

// 🎮 OPEN GAME (FULLSCREEN)
function openGame(url) {
  const container = document.getElementById("fullscreenGame");
  const frame = document.getElementById("gameFrame");

  container.style.display = "block";
  frame.src = url;

  // auto fullscreen
  container.requestFullscreen().catch(() => {});
}

// 🔙 EXIT GAME
function exitGame() {
  document.getElementById("fullscreenGame").style.display = "none";
  document.getElementById("gameFrame").src = "";
}

// ⛶ EXIT FULLSCREEN
function exitFullscreen() {
  if (document.fullscreenElement) {
    document.exitFullscreen();
  }
}

// 🔍 SEARCH
function searchGames() {
  const q = document.getElementById("search").value.toLowerCase();

  const container = document.getElementById("games");
  container.innerHTML = "";

  games
    .filter(g => g.name.toLowerCase().includes(q))
    .forEach(g => container.appendChild(createGameCard(g)));
}

// 🎨 THEME PRESETS
function setThemePreset(theme) {
  const themes = {
    teal: "#14b8a6",
    blue: "#3b82f6",
    purple: "#8b5cf6"
  };

  document.documentElement.style.setProperty("--accent", themes[theme]);
}

// 🎨 CUSTOM COLOR
function setCustomColor(color) {
  document.documentElement.style.setProperty("--accent", color);
}

// 🚀 START
renderGames();
