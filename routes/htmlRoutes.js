var db = require("../models");

module.exports = function(app) {
  // Loads intro page
  app.get("/", function(req, res) {
    res.render("intro");
  });

  // Load one result onto the page and pass in user by id
  app.get("/result/:id", function(req, res) {
    entryController.findEntry(req.params.id, function(dbEntry) {
      res.render("oneResult", {
        oneResult: dbEntry
      });
    });
  });

  // Loads all results onto the page
  app.get("/results/", function(req, res) {
    entryController.findAll(function(dbtableResults) {
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
