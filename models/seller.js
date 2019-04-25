module.exports = function(sequelize, DataTypes) {
  var Seller = sequelize.define("Seller", {
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

  Seller.associate = function(models) {
    // Associating Author with Posts
    // When an Author is deleted, also delete any associated Posts
    Seller.hasMany(models.Item, {
      onDelete: "cascade"
    });
  };

  return Seller;
};
