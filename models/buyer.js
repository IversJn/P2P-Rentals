module.exports = function(sequelize, DataTypes) {
  var Buyer = sequelize.define("Buyer", {
    // Giving the Author model a name of type STRING
    first_name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1]
      }
    },
    last_name: {
      type: DataTypes.STRING,
      allowNull: false,
      len: [1]
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      len: [1]
    }
  });

  Buyer.associate = function(models) {
    // Associating Author with Posts
    // When an Author is deleted, also delete any associated Posts
    Buyer.hasMany(models.Item, {
      onDelete: "cascade"
    });
  };

  return Buyer;
};
