const itemModel = (sequelize, DataTypes) => {
  const Item = sequelize.define(
    'Item',
    {
      name: DataTypes.STRING,
    },
    {},
  );
  Item.associate = function () {
    // associations can be defined here
  };
  return Item;
};

export default itemModel;
