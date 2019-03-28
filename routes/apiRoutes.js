var db = require("../models");
var entryController = require("../controllers/entryController");

// _____
module.exports = function(app) {
  // Post/creates user
  app.post("/api/user/new", function(req, res) {
    db.User.create(req.body).then(function(dbUser) {
      console.log(dbUser);
      // Success status
      res.status(201).end();
    });
  });

  //Logs in the user by searching their user_name in the db
  app.post("/api/user/login", function(req, res) {
    db.User.findOne({
      where: {
        user_name: req.body.username,
        password: req.body.password
      }
    }).then(function(dbUser) {
      //if user logs incorrectly, this will print out:
      res.send("Wrong credentials, please enter again.");
      console.log(dbUser);
    });
  });

  // Get all journal entries made by the user
  app.get("/api/entries", function(req, res) {
    db.Entry.findAll({}).then(function(dbEntry) {
      res.json(dbEntry);
    });
  });

  // Finding one entry by putting in the id
  app.get("/api/entry/:id", function(req, res) {
    entryController.findEntry(req.params.id, function(dbEntry) {
      res.json(dbEntry);
    });
  });
  // May not need but useful to have:
  // Deletes a row by id
  // app.delete("/api/entry/:id", function(req, res) {
  //   db.Entry.destroy({ where: { title } }).then(function(
  //     dbEntry
  //   ) {
  //     res.json(dbEntry);
  //   });
  // });

  // Post Form
  app.post("/api/entry/", function(req, res) {
    //db.tableName.create(req.body).then(function(dbName) {});
    db.Entry.create(req.body).then(function(dbEntry) {
      console.log(res.body);
    });
  });
};

// RESTful: POST GET PUT DELETE
// DB: CRUD --> create read update delete
