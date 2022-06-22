const { Sequelize, DataTypes } = require("sequelize")
const sequelize = require("../middleware/db-connect.js")
const userSchema = require("./userModel")
const postSchema = require("./postModel")

const likeSchema = sequelize.define("Like", {
  userId: { type: DataTypes.INTEGER, allowNull: false },
  likedPost: { type: DataTypes.INTEGER, allowNull: false },
},
{
  tableName: "user_like"
})

// Relationships
likeSchema.belongsTo(userSchema, {
  foreignKey: "userId",
  targetKey: "id"
}, postSchema, {
  foreignKey: "likedPost",
  targetKey: "id"
})
sequelize.sync

module.exports = sequelize.model("Like", likeSchema)
