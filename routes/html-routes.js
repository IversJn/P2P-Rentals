// *********************************************************************************
// html-routes.js - this file offers a set of routes for sending users to the various html pages
// *********************************************************************************

// Dependencies
// =============================================================
var path = require("path");

// Routes
// =============================================================
module.exports = function(app) {

  // Each of the below routes just handles the HTML page that the user gets sent to.

  // index route loads view.html
  app.get("/", function(req, res) {
    res.render("recipeBook");
    //res.sendFile(path.join(__dirname, "../public/blog.html"));
  });

  //this was /cms
  app.get("/create", function(req, res) {
    res.render("createRecipe");
    //res.sendFile(path.join(__dirname, "../public/cms.html"));
  });

  // blog route loads blog.html
  // this was /blog
  app.get("/recipebook", function(req, res) {
    res.render("recipeBook");
    //res.sendFile(path.join(__dirname, "../public/blog.html"));
  });

};
