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
    role: { type: DataTypes.TINYINT, defaultValue: 0, allowNull: false },
  },
  {
    tableName: "user",
  }
)

// sequelize.sync( {force: true} )
sequelize.sync

module.exports = sequelize.model("User", userSchema)
