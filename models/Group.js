module.exports = (sequelize, DataTypes) => {
    let Group = sequelize.define("Group", {
      group_name: {
        type: DataTypes.STRING,
        allowNull: false, 
        validate: {
          notNull: true,
        }
      }
    });
    Group.associate = (models) => {
      Group.belongsToMany(models.User, { through: 'UserGroups', foreignKey: 'groupId' });
    };  
    return Group;
}