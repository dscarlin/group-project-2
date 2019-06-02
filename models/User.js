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
    password: {
      type: DataTypes.STRING,
      allowNull: false,
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
        not: ["[a-z]", "i"]
      }
    },
    minutes: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: ''
    },
    picture_ref: {
      type: DataTypes.STRING,
      defaultValue: "phoneDefault.png",
      validate: {

      }
    },
    text_enabled: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      validate: {
        isBoolean: function (val) {
          return (typeof (val) === "boolean");
        }
      }
    }
  });

  User.associate = (models) => {
    User.hasMany(models.UserGroup);
  };

  return User;

}; // end export{}
