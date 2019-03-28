var db = require("../models");

module.exports = function(app) {
  // Get all journals
  app.get("/api/journalEntry", function(req, res) {
    db.journalEntry.findAll({}).then(function(dbJournalEntry) {
      res.json(dbJournalEntry);
    });
  });

  // Delete an example by id
  app.delete("/api/journalEntry/:id", function(req, res) {
    db.Example.destroy({ where: { id: req.params.id } }).then(function(
      dbJournalEntry
    ) {
      res.json(dbJournalEntry);
    });
  });
  // Post Form
  app.post("/api/JournalEntries/", function(req, res) {
    //db.tableName.create(req.body).then(function(dbName) {});
    db.journalEntry.create(req.body).then(function(journalEntry) {
      console.log(res.body);
    }) 
  });
};

// RESTful: POST GET PUT DELETE
// DB: CRUD --> create read update delete
