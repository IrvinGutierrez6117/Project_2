var db = require("../models");

module.exports = function(app) {
  // Loads intro page
  app.get("/", function(req, res) {
    res.render("intro");
  });
  // Loads intro page
  app.get("/postedResults", function(req, res) {
    res.render("results");
  });
  // Load one result onto the page and pass in user by id
  app.get("/results/:id", function(req, res) {
    db.JournalEntries.findOne({ where: { id: req.params.id } }).then(function(
      dbJournalEntries
    ) {
      res.render("oneResult", {
        oneResult: dbJournalEntries
      });
    });
  });
  // Loads all results onto the page
  app.get("/results/", function(req, res) {
    db.JournalEntries.findAll({}).then(function(dbJournalEntries) {
      res.render("allResults", {
        allResults: dbJournalEntries
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
