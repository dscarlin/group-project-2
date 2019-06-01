module.exports = (sequelize, DataTypes) => {
  let Group = sequelize.define("Group", {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      }
    }
  });

  Group.associate = (models) => {
    Group.hasMany(models.UserGroup);
  };

  return Group;

}; // end export{}