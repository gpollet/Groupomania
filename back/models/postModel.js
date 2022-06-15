const { Sequelize, DataTypes } = require("sequelize")

const sequelize = new Sequelize(
  `${process.env.DB_NAME}`,
  `${process.env.DB_USER}`,
  `${process.env.DB_PASSWORD}`,
  {
    host: `${process.env.DB_HOST}`,
    dialect: "mysql",
  }
)

const postSchema = sequelize.define("Post", {
  user_id: { type: DataTypes.INTEGER, allowNull: false },
  creation_date: { type: DataTypes.DATE, allowNull: false },
  update_date: { type: DataTypes.DATE, allowNull: true },
  text_content: { type: DataTypes.STRING(10000), allowNull: false },
  image_url: { type: DataTypes.STRING(255) },
  likes: { type: DataTypes.INTEGER, allowNull: false, default: 0 },
}, {
  tableName: "user_post"
})

module.exports = sequelize.model("Post", postSchema)
