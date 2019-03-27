var db = require("../models");

module.exports = function(app) {
  // Get all examples
  // app.get("/api/examples", function(req, res) {
  //   db.Example.findAll({}).then(function(dbExamples) {
  //     res.json(dbExamples);
  //   });
  // });

  // // Create a new example
  // app.post("/api/examples", function(req, res) {
  //   db.Example.create(req.body).then(function(dbExample) {
  //     res.json(dbExample);
  //   });
  // });

  // // Delete an example by id
  // app.delete("/api/examples/:id", function(req, res) {
  //   db.Example.destroy({ where: { id: req.params.id } }).then(function(
  //     dbExample
  //   ) {
  //     res.json(dbExample);
  //   });
  // });

  // ====================================================
  // Reflect's code

  //  Get all journal entries
  app.get("/api/entries", function(req, res) {
    db.JournalEntries.findAll({}).then(function(dbJournalEntries) {
      res.json(dbJournalEntries);
    });
  });

  app.post("/api/entries", function(req, res) {
    db.JournalEntries.create({
      title: req.body.title,
      body: req.body.body
    }).then(function(dbJournalEntries) {
      res.json(dbJournalEntries);
    });
  });
};
