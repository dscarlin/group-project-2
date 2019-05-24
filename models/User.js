module.exports = (sequelize, DataTypes) => {
    let User = sequelize.define("User", {
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
    User.associate = (models) => {
      User.hasMany(models.UserGroup);
    };  
    
    
    return User;
}
