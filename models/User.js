module.exports = (sequelize, DataTypes) => {
    let User = sequelize.define("User", {
      user_name: {
        type: DataTypes.STRING,
        allowNull: false, 
        validate: {
          notNull: true,
        }
      },
      email: {
        type: DataTypes.STRING, 
        allowNull: false, 
          validate: {
            notNull: true,
            isEmail: true
          }
      },
      phone_number: {
        type: DataTypes.STRING, 
        allowNull: false,
          validate: {
            notNull: true,
            len: [15]
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

  
    User.associate = (models) => {
      User.belongsToMany(models.Group, { through: 'UserGroup', foreignKey: 'userId'});
    };  
    return User;
}
