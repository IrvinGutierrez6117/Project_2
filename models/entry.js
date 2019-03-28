module.exports = function(sequelize, DataTypes) {
  var Entry = sequelize.define("Entry", {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1]
      }
    },
    body: {
      type: DataTypes.TEXT,
      allowNull: false,
      len: [1]
    },
    emotion: {
      type: DataTypes.STRING,
      allowNull: false
    },
    time_frame: {
      type: DataTypes.STRING,
      allowNull: false
    }
  });
  // function takes in the models that are imported from the files
  Entry.associate = function(models) {
    // We're saying that an Entry should belong to an User
    // An Entry can't be created without a User due to the foreign key constraint
    Entry.belongsTo(models.User, {
      foreignKey: {
        allowNull: false
      }
    });
  };
  return Entry;
};
