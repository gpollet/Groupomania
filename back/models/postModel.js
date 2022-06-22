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

// Relationships
postSchema.belongsTo(userSchema, {
  foreignKey: "userId",
  targetKey: "id"
})
sequelize.sync

module.exports = sequelize.model("Post", postSchema)
