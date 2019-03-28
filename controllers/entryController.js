var db = require("../models");

module.exports = {
  findEntry: function(id, callback) {
    db.Entry.findOne({
      where: {
        id: id
      }
    }).then(callback);
  },

  findAll: function(callback) {
    db.Entry.findAll({}).then(callback);
  }
};

// test in console
// $.ajax("/api/user/new", {
//   type: "POST",
//   data: {user_name: 'richie', user_password: 'richie'}
// }).then(function(response) {
  
//   console.log(response);

// });