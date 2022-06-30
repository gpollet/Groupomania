const User = require("../models/userModel")
const dotenv = require("dotenv")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

dotenv.config({ path: "../.env" })
const userToken = process.env.USER_TOKEN

// Chiffre le mot de passe de l'utilisateur, puis l'enregistre dans la base de donnée avec son email.
exports.signup = (req, res, next) => {
  if (req.body.email && req.body.password) {
    bcrypt
      .hash(req.body.password, 10)
      .then((hash) => {
        const user = User.create({
          email: req.body.email,
          firstName: req.body.firstName,
          lastName: req.body.lastName,
          password: hash,
        })
          .then(() =>
            res.status(201).json({
              message: "Utilisateur créé",
            })
          )
          // Si utilisateur existe déjà : erreur 400
          .catch((error) => res.status(400).json({ error }))
      })
      .catch((error) => res.status(500).json({ error }))
  } else {
    res.status(500).json()
  }
}

// Vérifie qu'utilisateur existe. Si existe, vérifie que mot de passe est correct. Si utilisateur existe ET mdp correct, renvoie un token associé à cet utilisateur.
exports.login = (req, res, next) => {
  if (req.body.email && req.body.password) {
    User.findOne({ where: { email: req.body.email } })
      .then((user) => {
        if (!user) {
          return next(res.status(401))
        }
        bcrypt
          .compare(req.body.password, user.password)
          .then((correctPassword) => {
            if (!correctPassword) {
              return next(res.status(401))
            }
            res.status(200).json({
              userId: user.id,
              token: jwt.sign({ userId: user.id }, `${userToken}`, {
                expiresIn: "24h",
              }),
              role: user.role
            })
          })
          .catch((error) => res.status(500).json({ error }))
      })
      .catch((error) => res.status(500).json({ error }))
  } else {
    res.status(500).json()
  }
}
