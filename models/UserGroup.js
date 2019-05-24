module.exports = (sequelize, DataTypes) => {
    let UserGroup = sequelize.define("UserGroup", {});
    UserGroup.associate = (models) => {
      UserGroup.belongsTo(models.User);
      UserGroup.belongsTo(models.Group);
     
    };  
   
    return UserGroup;
}