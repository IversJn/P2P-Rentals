// *********************************************************************************
// api-routes.js - this file offers a set of routes for displaying and saving data to the db
// *********************************************************************************

// Dependencies
// =============================================================

// Requiring our models
var db = require("../models");

// Routes
// =============================================================
module.exports = function(app) {

  // GET route for getting all of the items
  app.get("/api/recipes", function(req, res) {
    var query = {};
    if (req.query.user_id) {
      query.SellerId = req.query.user_id;
    }
    // Here we add an "include" property to our options in our findAll query
    // We set the value to an array of the models we want to include in a left outer join
    // In this case, just db.Author
    db.Recipe.findAll({
      where: query,
      include: [db.Recipe]
    }).then(function(dbRecipe) {
      res.json(dbRecipe);
    });
  });

  // Get route for retrieving a single Item
  app.get("/api/recipes/:id", function(req, res) {
    // Here we add an "include" property to our options in our findOne query
    // We set the value to an array of the models we want to include in a left outer join
    // In this case, just db.Author
    db.Recipe.findOne({
      where: {
        id: req.params.id
      },
      include: [db.User]
    }).then(function(dbRecipe) {
      res.json(dbRecipe);
    });
  });

  // Item route for saving a new Item
  app.post("/api/recipes", function(req, res) {
    db.Recipe.create(req.body).then(function(dbRecipe) {
      res.json(dbRecipe);
    });
  });

  // DELETE route for deleting items
  app.delete("/api/recipes/:id", function(req, res) {
    db.Recipe.destroy({
      where: {
        id: req.params.id
      }
    }).then(function(dbRecipe) {
      res.json(dbRecipe);
    });
  });

  // PUT route for updating items
  app.put("/api/recipes", function(req, res) {
    db.Recipe.update(
      req.body,
      {
        where: {
          id: req.body.id
        }
      }).then(function(dbRecipe) {
      res.json(dbRecipe);
    });
  });
};
