function isAuthenticated(req, res, next) {
  if (req.session.isAuthenticated) {
    next();
  } else {
    res.redirect("/login");
  }
}

//Authentication
//router.get("/login", authentication.getLogin);
//router.post("/login", authentication.postLogin);
function getLogin(req, res, next) {
  res.render("layouts/login");
}

function postLogin(req, res, next) {
  const password = req.body.password;
  if (password === "theSecretPassword") {
    req.session.isAuthenticated = true;
    res.redirect("/games");
  } else res.render("layouts/login", { error: "Invalid password!" });
}

module.exports = {
  isAuthenticated,
  getLogin,
  postLogin,
};
