module.exports = function(sequelize, DataTypes) {
  var Item = sequelize.define("Item", {
    product_name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1]
      }
    },
    quality: {
      type: DataTypes.INTEGER,
      allowNull: false,
      len: [1]
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        len: [1]
      }
    },
    photo: {
      type: DataTypes.STRING,
      allowNull: false,
      len: [1]
    }
  });

  Item.associate = function(models) {
    // We're saying that a Post should belong to an Author
    // A Post can't be created without an Author due to the foreign key constraint
    Item.belongsTo(models.Seller, {
      foreignKey: {
        allowNull: false
      }
    });
  };

  return Item;
};
