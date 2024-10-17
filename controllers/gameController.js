const db = require("../db/queries");

async function getGames(req, res) {
  const games = await db.getGames();
  res.render("layouts/games", {
    pageTitle: "Games List",
    games: games,
  });
}

async function getUpdateGame(req, res) {
  const gameId = req.params.id;

  const genres = await db.getGenres();
  const game = await db.getGame(gameId);
  console.log(game[0].name);
  res.render("layouts/new-game", {
    pageTitle: "Update game",
    genres: genres,
    game: game[0],
  });
}

/* NOT USED
async function getDeleteGame(req, res) {
  const gameId = req.params.id;

  const game = await db.getGame(gameId);
  console.log(game[0].name);
  res.render("layouts/new-game", {
    pageTitle: "Update game",
    genres: genres,
    game: game[0],
  });
}
*/

async function postDeleteGame(req, res) {
  const gameId = req.params.id;
  await db.deleteGame(gameId);
  res.redirect("/games");
}

async function postUpdateGame(req, res) {
  const { gameName, gameDescription, gameGenre } = req.body;
  const gameId = req.params.id;
  await db.updateGame(gameId, gameName, gameDescription, gameGenre);
  res.redirect("/games");
}

async function getNewGameFormInit(req, res) {
  const genres = await db.getGenres();
  res.render("layouts/new-game", {
    pageTitle: "Create new game",
    genres: genres,
  });
}
async function createGame(req, res) {
  const { gameName, gameDescription, gameGenre } = req.body;
  await db.createGame(gameName, gameDescription, gameGenre);
  res.redirect("/");
}
module.exports = {
  getGames,
  getNewGameFormInit,
  createGame,
  getUpdateGame,
  postUpdateGame,
  postDeleteGame,
};
