var db = require("../models");

module.exports = function(app) {
  // --------------- User Routes ----------------------------
  // Get all users (READ)
  app.get("/api/users", function(req, res) {
    db.Users.findAll({}).then(function(dbUsers) {
      res.json(dbUsers);
    });
  });
  // Create new user > Add to db (CREATE)
  app.post("/api/users", function(req, res) {
    //db.tableName.create(req.body).then(function(dbName) {});
    db.Users.create(req.body).then(function(dbUsers) {
      // console.log(res.body);
      console.log(dbUsers);
      // console.log(res);
      res.json(dbUsers);
    });
  });

  // -------------- Journal Entry Routes --------------------
  // Get all journals (READ) from the user
  app.get("/api/entries/", function(req, res) {
    db.JournalEntries.findAll({}).then(function(dbJournalEntries) {
      res.json(dbJournalEntries);
    });
  });

  // ===== Matt & Tracy's Stuff =====
  app.get("/api/entries/journals", function(req, res) {
    console.log("PRINT TEST");
    console.log(req.query.UserId);
    db.JournalEntries.findAll({
      where: {
        UserId: req.query.UserId
      }
    }).then(function(dbOfJournalEntries) {
      res.json(dbOfJournalEntries);
    });
  });
  // ===== End of Matt & Tracy's Stuff =====

  // Create new entry (CREATE) for specific user
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
