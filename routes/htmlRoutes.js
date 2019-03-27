var db = require("../models");

module.exports = function(app) {
  // Load index page
  app.get("/", function(req, res) {
    db.JournalEntries.findAll({}).then(function(dbJournalEntries) {
      res.render("intro", {
        msg: "Welcome!",
        JournalEntriess: dbJournalEntries
      });
    });
  });

  // Load JournalEntries page and pass in an JournalEntries by id
  app.get("/JournalEntries/:id", function(req, res) {
    db.JournalEntries.findOne({ where: { id: req.params.id } }).then(function(
      dbJournalEntries
    ) {
      res.render("JournalEntries", {
        JournalEntries: dbJournalEntries
      });
    });
  });

  app.get("/intro/", function(req, res) {
    res.render("intro", {});
  });

  app.get("/postData/", function(req, res) {
    //req.body.new..
    //res.render("intro", {});
  });

  // Render 404 page for any unmatched routes
  app.get("*", function(req, res) {
    res.render("404");
  });
};
