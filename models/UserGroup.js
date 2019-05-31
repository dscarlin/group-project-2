module.exports = (sequelize, DataTypes) => {
    let UserGroup = sequelize.define("UserGroup", {
      status: {
        type: DataTypes.INTEGER, 
        defaultValue: 0,
          validate: {
            min: 0,
            max: 1
          }
      }
    });
    UserGroup.associate = (models) => {
      UserGroup.belongsTo(models.User);
      UserGroup.belongsTo(models.Group);
     
    };  
   
    return UserGroup;
}