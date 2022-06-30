const { default: rateLimit } = require("express-rate-limit")

// Limite le nombre de requêtes POST login et signup pouvant être envoyées par un utilisateur à 10 toutes les 15 minutes, pour limiter l'impact d'une brute-force attack
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  // TODO: REMETTRE LIMITE A 10 QUAND PROJET TERMINE
  max: 1000, // Limit each IP to 10 requests per `window`
  standardHeaders: false, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: true, // Disable the `X-RateLimit-*` headers
})

module.exports = limiter
