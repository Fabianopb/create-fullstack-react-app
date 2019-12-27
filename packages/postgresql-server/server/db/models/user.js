'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    'User',
    {
      name: DataTypes.STRING,
      age: DataTypes.NUMBER,
    },
    {},
  );
  User.associate = function(models) {
    User.hasMany(models.Item);
  };
  return User;
};
