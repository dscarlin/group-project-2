module.exports = (sequelize, DataTypes) => {
    let Users = sequelize.define("Users", {
      user_name: {
        type: DataTypes.STRING,
        allowNull: false, 
        unique: true,
        validate: {
          notEmpty: true,
        }
      },
      email: {
        type: DataTypes.STRING, 
        allowNull: false,
        unique: true, 
          validate: {
            isEmail: true
          }
      },
      phone_number: {
        type: DataTypes.STRING, 
        allowNull: false,
          validate: {
            not: ['[a-z]','i']
          }
      },
      status: {
        type: DataTypes.BOOLEAN, 
        defaultValue: false,
          validate: {
            isBoolean:function (val) {
              return (typeof(val)=='boolean')
                 }
          }
      },
      text_enabled: {
        type: DataTypes.BOOLEAN, 
        defaultValue: false,
          validate: {
            isBoolean:function (val) {
              return (typeof(val)=='boolean')
                 }
          }
      } 

    });

  
    Users.associate = (models) => {
      Users.belongsToMany(models.Groups, { through: 'UserGroups', foreignKey: 'userId', as: 'groups'});
    };  
    return Users;
}
