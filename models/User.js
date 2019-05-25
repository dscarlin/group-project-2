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
        allowNull: true,
          validate: {
            not: ['[a-z]','i']
          }
      },
      status: {
        type: DataTypes.INTEGER, 
        defaultValue: 0,
          validate: {
            min: 0,
            max: 1
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
