const pool = require("./pool");

async function getGameCount() {
  console.log("Attempting to get game count");
  try {
    const { rows } = await pool.query("SELECT COUNT(*) FROM games");
    console.log("Game count query successful:", rows[0].count);
    return rows[0].count;
  } catch (err) {
    console.error("Error in getGameCount:", err);
    throw err;
  }
}
async function getGenreCount() {
  const { rows } = await pool.query("SELECT COUNT(*) FROM genres");
  return rows[0].count;
}
async function getGameInstanceCount() {
  const { rows } = await pool.query("SELECT COUNT(*) FROM game_instances");
  return rows[0].count;
}

async function getGames() {
  const { rows } = await pool.query("SELECT * FROM games");
  return rows;
}
async function getGame(gameId) {
  const { rows } = await pool.query("SELECT * FROM games WHERE id = $1", [
    gameId,
  ]);
  return rows;
}

async function getGenres() {
  const { rows } = await pool.query("SELECT * FROM genres");
  return rows;
}

async function createGame(gameName, gameDescription, gameGenre) {
  await pool.query(
    "INSERT INTO games (name, description, genre_id) VALUES ($1,$2,$3)",
    [gameName, gameDescription, gameGenre]
  );
}

async function updateGame(gameId, gameName, gameDescription, gameGenre) {
  await pool.query(
    "UPDATE games SET name = $2, description = $3, genre_id = $4 WHERE id = $1",
    [gameId, gameName, gameDescription, gameGenre]
  );
}

async function deleteGame(gameId) {
  await pool.query("DELETE FROM games WHERE id = $1", [gameId]);
}

module.exports = {
  getGameCount,
  getGenreCount,
  getGameInstanceCount,
  getGames,
  getGame,
  getGenres,
  createGame,
  updateGame,
  deleteGame,
};
