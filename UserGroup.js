module.exports = (sequelize, DataTypes) => {
    let UserGroups = sequelize.define("UserGroups", {
      id:{
        groupID: {
          type: DataTypes.INTEGER,
          allowNull: false, 
          
          
        },
        userID: {
          type: DataTypes.INTEGER,
          allowNull: false, 
         
        }

      }
    });
   
   
    return UserGroups;
}