module.exports = (sequelize, DataTypes) => {
    let UserGroup = sequelize.define("UserGroup", {
      groupID: {
        type: DataTypes.INTEGER,
        allowNull: false, 
        validate: {
          notNull: true,
        }
      },
      userID: {
        type: DataTypes.INTEGER,
        allowNull: false, 
        validate: {
          notNull: true,
        }
      }

    });
    UserGroup.associate = (models) => {
      UserGroup.belongsTo(models.Group, { foreignKey: 'groupId'});
      UserGroup.belongsTo(models.User, { foreignKey: 'userId'});
    };  
    return UserGroup;
}