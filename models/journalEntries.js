module.exports = function(sequelize, DataTypes) {
  var JournalEntries = sequelize.define("JournalEntries", {
    emotion: DataTypes.INTEGER,
    timeFrame: DataTypes.INTEGER,
    title: DataTypes.TEXT,
    body: DataTypes.TEXT,
    userId: DataTypes.INTEGER
  });

  return JournalEntries;
};
