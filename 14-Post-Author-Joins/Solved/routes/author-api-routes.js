var db = require("../models");

module.exports = function(app) {
  app.get("/api/sellers", function(req, res) {
    // Here we add an "include" property to our options in our findAll query
    // We set the value to an array of the models we want to include in a left outer join
    // In this case, just db.Item
    db.Seller.findAll({
      include: [db.Item]
    }).then(function(dbSeller) {
      res.json(dbSeller);
    });
  });

  app.get("/api/sellers/:id", function(req, res) {
    // Here we add an "include" property to our options in our findOne query
    // We set the value to an array of the models we want to include in a left outer join
    // In this case, just db.Item
    db.Seller.findOne({
      where: {
        id: req.params.id
      },
      include: [db.Item]
    }).then(function(dbSeller) {
      res.json(dbSeller);
    });
  });

  app.post("/api/sellers", function(req, res) {
    db.Seller.create(req.body).then(function(dbSeller) {
      res.json(dbSeller);
    });
  });

  app.delete("/api/sellers/:id", function(req, res) {
    db.Seller.destroy({
      where: {
        id: req.params.id
      }
    }).then(function(dbSeller) {
      res.json(dbSeller);
    });
  });

};
