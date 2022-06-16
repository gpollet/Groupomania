const { Sequelize, DataTypes } = require("sequelize")
const sequelize = require("../middleware/db-connect.js")
const userSchema = require("../models/userModel")

const postSchema = sequelize.define(
  "Post",
  {
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    text_content: {
      type: DataTypes.STRING(10000),
      allowNull: false,
    },
    image_url: { type: DataTypes.STRING(255) },
    likes: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
  },
  {
    tableName: "user_post",
  }
)

// const likeSchema = sequelize.define("user_like", {
//   user_id: {
//     type: DataTypes.INTEGER,
//     allowNull: false,
//   },
//   liked_post: {
//     type: DataTypes.INTEGER,
//     allowNull: false,
//   },
// })

// Relationships
postSchema.belongsTo(userSchema, {
  foreignKey: "userId",
  targetKey: "id"
})
// likeSchema.belongsTo(userSchema)

// sequelize.sync( {force: true} )
sequelize.sync

module.exports = sequelize.model("Post", postSchema)
