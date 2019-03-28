module.exports = function(sequelize, DataTypes) {
  var Users = sequelize.define("Users", {
    userName: DataTypes.TEXT,
    password: DataTypes.TEXT
  });
  return Users;
};
