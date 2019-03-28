var db = require("../models");

module.exports = function(app) {
  // Loads intro page
  app.get("/", function(req, res) {
    res.render("intro");
  });
  // Load one result onto the page and pass in user by id
  app.get("/results/:id", function(req, res) {
    db.tableName
      .findOne({ where: { id: req.params.id } })
      .then(function(dbtableResults) {
        res.render("oneResult", {
          oneResult: dbtableResults
        });
      });
  });
  // Loads all results onto the page
  app.get("/results/", function(req, res) {
    db.tableName.findAll({}).then(function(dbtableResults) {
      res.render("allResults", {
        allResults: dbtableResults
      });
    });
  });
  // Render error 404 page for any unmatched routes
  app.get("*", function(req, res) {
    res.render("404");
  });
};
// Notes:
//  tableName: find the name of the table from the DB
