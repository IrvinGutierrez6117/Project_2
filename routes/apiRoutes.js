var db = require("../models");

module.exports = function(app) {
  // Get all journals
  app.get("/api/entries/", function(req, res) {
    db.JournalEntries.findAll({}).then(function(dbJournalEntries) {
      res.json(dbJournalEntries);
    });
  });

  // // Delete an example by id
  // app.delete("/api/JournalEntries/:id", function(req, res) {
  //   db.Example.destroy({ where: { id: req.params.id } }).then(function(
  //     dbJournalEntries
  //   ) {
  //     res.json(dbJournalEntries);
  //   });
  // });
  // Post Form
  // app.post("/api/JournalEntries/", function(req, res) {
  //   //db.tableName.create(req.body).then(function(dbName) {});
  //   db.JournalEntries.create(req.body).then(function(JournalEntries) {
  //     console.log(res.body);
  //   });
  // });
  // New Post form route
  app.post("/api/entries/", function(req, res) {
    //db.tableName.create(req.body).then(function(dbName) {});
    db.JournalEntries.create(req.body).then(function(dbJournalEntries) {
      // console.log(res.body);
      console.log(dbJournalEntries);
      // console.log(res);
      res.json(dbJournalEntries);
    });
  });
};

// RESTful: POST GET PUT DELETE
// DB: CRUD --> create read update delete
