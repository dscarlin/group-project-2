module.exports = (sequelize, DataTypes) => {
    let UserGroups = sequelize.define("UserGroups", {
      // groupID: {
      //   type: DataTypes.INTEGER,
      //   allowNull: false, 
      //   references: {
      //     model: 'Groups',
      //     key: 'id'
      //   }
        
      // },
      // userID: {
      //   type: DataTypes.INTEGER,
      //   allowNull: false, 
      //   references: {
      //     model: 'Users',
      //     key: 'id'
      //   }
      // }

    });
   
    return UserGroups;
}