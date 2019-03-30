module.exports = function(sequelize, DataTypes) {
  var Users = sequelize.define("Users", {
    userName: DataTypes.STRING,
    password: DataTypes.STRING
  });

  Users.associate = function(models) {
    Users.hasMany(models.JournalEntries, {
      onDelete: "cascade"
    });
  };

  return Users;
};
