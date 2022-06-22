const authRouter = require("./routes/authRoutes")
const postRouter = require("./routes/postsRoutes")
const express = require("express")
const path = require("path")
const helmet = require("helmet")
const morgan = require("morgan")

app = express()

// Middleware de sécurité
app.use(helmet({ crossOriginResourcePolicy: false }))

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*")
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  )
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, OPTIONS"
  )
  next()
})

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(morgan("dev"))

app.get("/", (req, res) => {
  res.send("Serveur OK")
})

app.use("/images", express.static(path.join(__dirname, "images")))
app.use("/api/auth", authRouter)
app.use("/api/posts", postRouter)

module.exports = app
