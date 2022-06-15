const { Sequelize, DataTypes } = require("sequelize")
const sequelize = require("../middleware/db-connect.js")

const userSchema = sequelize.define(
  "User",
  {
    email: {
      type: DataTypes.STRING(255),
      allowNull: false,
      unique: true,
    },
    password: { type: DataTypes.STRING(100), allowNull: false },
    role: { type: DataTypes.TINYINT, default: 0, allowNull: true },
    registration_date: {
      type: DataTypes.DATE,
      // allowNull: false,
      default: DataTypes.NOW,
    },
    last_login: {
      type: DataTypes.DATE,
      // allowNull: false,
      default: DataTypes.NOW,
    },
  },
  {
    tableName: "user2",
  }
)

module.exports = sequelize.model("User", userSchema)
