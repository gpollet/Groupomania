require("dotenv").config()
const Sequelize = require("sequelize")

// Crée une connexion à la DB MySQL
const sequelize = new Sequelize(
  `${process.env.DB_NAME}`,
  `${process.env.DB_USER}`,
  `${process.env.DB_PASSWORD}`,
  {
    host: `${process.env.DB_HOST}`,
    dialect: "mysql",
  }
)

sequelize.sync( {force: true} )

// Vérifie que la connexion à la DB est établie.
sequelize
  .authenticate()
  .then(() => {
    console.log("Connection established successfully.")
  })
  .catch((err) => {
    console.error("Unable to connect to the database:", err)
  })



module.exports = sequelize