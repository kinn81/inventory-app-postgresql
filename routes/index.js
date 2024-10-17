var indexController = require("../controllers/indexController");
var gameController = require("../controllers/gameController");
var authentication = require("../controllers/authentication");

var express = require("express");
var router = express.Router();

/* GET home page. */
router.get("/", indexController.getIndex);
router.get("/games", gameController.getGames);
//router.get("/games/:gameId", gameController.getGameById);
router.get(
  "/game/:id/update",
  authentication.isAuthenticated,
  gameController.getUpdateGame
);
router.post(
  "/game/:id/update",
  authentication.isAuthenticated,
  gameController.postUpdateGame
);

router.post(
  "/game/:id/delete",
  authentication.isAuthenticated,
  gameController.postDeleteGame
);

router.get(
  "/games/new",
  authentication.isAuthenticated,
  gameController.getNewGameFormInit
);
router.post(
  "/games/new",
  authentication.isAuthenticated,
  gameController.createGame
);

//Authentication
router.get("/login", authentication.getLogin);
router.post("/login", authentication.postLogin);

module.exports = router;
