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
      Group.belongsToMany(models.User, { through: 'UserGroup', unique: 'id'});
     
    };  
    return Group;
  }