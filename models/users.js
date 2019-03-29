module.exports = function(sequelize, DataTypes) {
  var Users = sequelize.define("Users", {
    userName: DataTypes.TEXT,
    password: DataTypes.TEXT
  });

  // Users.associate = function(models) {
  //   Users.hasMany(models.JournalEntries, {
  //     onDelete: "cascade"
  //   });
  // };
  return Users;
};
