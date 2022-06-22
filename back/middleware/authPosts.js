const jwt = require("jsonwebtoken")

const userToken = process.env.USER_TOKEN
const User = require("../models/userModel")

// Récupère le token envoyé avec la requête et le déchiffre pour vérifier qu'il correspond bien à celui qui a été attribué à l'utilisateur.
module.exports = (req, res, next) => {
  const token = req.headers.authorization.split(" ")[1]
  try {
    const decodedToken = jwt.verify(token, userToken)
    const userId = decodedToken.userId
    if (req.body.userId && req.body.userId !== userId) {
      res.status(401).json({ error: error })
    } else {
      User.findOne({ where: { id: userId } }).then((user) => {
        req.user = {
          userId: userId,
          role: user.role,
        }
        next()
      })
    }
  } catch (error) {
    res.status(401).json({ error: error })
  }
}
