module.exports = function(sequelize, DataTypes) {
  var JournalEntries = sequelize.define("JournalEntries", {
    title: DataTypes.STRING,
    body: DataTypes.TEXT
  });
  return JournalEntries;
};
