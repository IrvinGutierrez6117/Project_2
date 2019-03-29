module.exports = function(sequelize, DataTypes) {
  var JournalEntries = sequelize.define("JournalEntries", {
    emotion: DataTypes.TEXT,
    timeFrame: DataTypes.TEXT,
    title: DataTypes.TEXT,
    body: DataTypes.TEXT,
    userId: DataTypes.INTEGER
  });

  // JournalEntries.associate = function(models) {
  //   JournalEntries.belongsTo(models.Users, {
  //     foreignKey: {
  //       allowNull: false
  //     }
  //   });
  // };

  return JournalEntries;
};
