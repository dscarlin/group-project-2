module.exports = (sequelize, DataTypes) => {
    let Groups = sequelize.define("Groups", {
      name: {
        type: DataTypes.STRING,
        allowNull: false, 
        validate: {
          notEmpty: true,
        }
      }
    });
    Groups.associate = (models) => {
      Groups.belongsToMany(models.Users, { through: 'UserGroups', as: 'users', foreignKey: 'groupId' });
    };  
    return Groups;
}