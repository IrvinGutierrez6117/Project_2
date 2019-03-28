module.exports = function(sequelize, DataTypes) {
  var JournalEntries = sequelize.define("JournalEntries", {
    title: DataTypes.TEXT,
    body: DataTypes.TEXT
  });

  
  return JournalEntries;
};

