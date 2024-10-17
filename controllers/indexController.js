const db = require("../db/queries");

async function getIndex(req, res) {
  const gameCount = await db.getGameCount();
  const genreCount = await db.getGenreCount();
  const gameInstanceCount = await db.getGameInstanceCount();
  res.render("layouts/overview", {
    gameCount: gameCount,
    genreCount: genreCount,
    gameInstanceCount: gameInstanceCount,
  });
}

module.exports = {
  getIndex,
};
