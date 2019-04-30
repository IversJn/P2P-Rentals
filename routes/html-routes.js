// *********************************************************************************
// html-routes.js - this file offers a set of routes for sending users to the various html pages
// *********************************************************************************

// Dependencies
// =============================================================
var path = require("path");
var db = require("../models");

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

  app.get("/recipe/:id", function(req, res) {
    // var data = db.Post.findAll({})
    // .then(function(dbPost) {
    //   res.render("recipe", dbPost);
    // });
    // res.send(data);
    console.log(req.params.id);

    db.Post.findOne({
      where: {
        id: req.params.id
      }
    })
    .then(function(data) {
      //return result;
        console.log(data.dataValues);
        res.render("recipe", data.dataValues);
    });



    // console.log(req.params.id);
    // db.Post.findOne({
    //   where: {
    //     id: req.params.id
    //   }
    // })
    //   .then(function(dbPost) {
    //     res.render("recipe", dbPost);
    //     //res.json(dbPost);
    //   });


      //return res.send(data);
    // var data = db.Post.findAll({})
    //   .then(function(dbPost) {
    //     res.render("recipe", dbPost);
    //   });
    //{ name: 'Arthur'}
    //res.sendFile(path.join(__dirname, "../public/cms.html"));
  });

  // blog route loads blog.html
  // this was /blog
  app.get("/recipebook", function(req, res) {
    res.render("recipeBook");
    //res.sendFile(path.join(__dirname, "../public/blog.html"));
  });

};
