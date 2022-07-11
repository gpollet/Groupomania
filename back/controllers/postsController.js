const fs = require("fs")
const Post = require("../models/postModel")
const Like = require("../models/likeModel")
const User = require("../models/userModel")
const sequelize = require("../middleware/db-connect")

// Demande à la DB de renvoyer tous les documents de la collection Post.
exports.getAllPosts = (req, res) => {
  Post.findAll({
    include: [
      {
        model: User,
        attributes: ["firstName", "lastName", "role"],
        required: true,
      },
      {
        model: Like,
        attributes: ["likedPost"],
        where: [{ userId: req.user.userId }],
        required: false,
      },
    ],
    attributes: { exclude: ["updatedAt", "userId"] },
  })
    .then((posts) => {
      res.status(200).json(posts)
    })
    .catch((error) => {
      res.status(400).json({
        error: error,
      })
    })
}

// Demande à la DB de renvoyer le document de la collection Post qui a un id identique à l'id de l'URI
exports.getLikedPost = (req, res) => {
  Like.findAll({ where: { likedPost: req.params.id } })
    .then((post) => {
      res.status(200).json(post)
    })
    .catch((error) => {
      res.status(400).json({
        error: error,
      })
    })
}

// Crée un nouveau post avec l'id de l'utilisateur, les informations qu'il saisit sur la page d'envoi, le chemin d'accès à l'image reçue, et initialise le nombre de likes à 0. Array d'utilisateurs ayant liké est donc de facto vide aussi.
exports.createPost = async (req, res, next) => {
  let imageUrl
  if (
    req.body.text_content === "null" ||
    req.body.text_content.length == 0
  ) {
    return res
      .status(400)
      .json("Le post doit obligatoirement contenir du texte.")
  } else {
    if (req.file) {
      imageUrl = `${req.protocol}://${req.get("host")}/images/${
        req.file.filename
      }`
    } else {
      imageUrl = ""
    }
    await Post.create({
      userId: req.user.userId,
      text_content: req.body.text_content,
      likes: 0,
      image_url: imageUrl,
    })
      .then(() => {
        res.status(201).json({
          message: "Le post a bien été créé.",
        })
      })
      .catch((error) => {
        res.status(400).json({
          error: error,
        })
      })
  }
}

// Vérifie si un fichier est joint. Si oui, convertit le corps de la requête pour y insérer l'url de l'image, si non met à jour les champs avec les nouvelles informations fournies par l'utilisateur.
exports.updatePost = (req, res, next) => {
  if (
    req.body.text_content === "null" ||
    req.body.text_content.length == 0
  ) {
    return res
      .status(400)
      .json("Le post doit obligatoirement contenir du texte.")
  } else {
    Post.findOne({
      where: { id: req.params.id },
    })
      .then((post) => {
        if (req.user.role == 0 && post.userId !== req.user.userId) {
          return next(res.status(401))
        } else {
          if (req.file) {
            const imgPath = post.image_url.replace(
              "http://127.0.0.1:3000",
              "."
            )
            fs.unlink(imgPath, (err) => {
              if (err) {
                console.error(err)
              } else {
                console.log("Image supprimée")
              }
            })
          }
          const postObject = req.file
            ? {
                userId: post.userId,
                text_content: req.body.text_content,
                image_url: `${req.protocol}://${req.get(
                  "host"
                )}/images/${req.file.filename}`,
                userEdit: Date.now(),
              }
            : {
                userId: post.userId,
                text_content: req.body.text_content,
                image_url: post.imageUrl,
                userEdit: Date.now(),
              }
          Post.upsert({
            id: req.params.id,
            ...postObject,
          })
            .then(() =>
              res.status(200).json({ message: "Post mis à jour." })
            )
            .catch((error) => res.status(400).json({ error }))
        }
      })
      .catch((error) => res.status(400).json({ error }))
  }
}

// Trouve le post ayant un id correspondant à l'id de la requête, et le supprime.
exports.deletePost = (req, res, next) => {
  Like.findAll({ where: { likedPost: req.params.id } })
    .then((likes) => {
      likes.forEach((like) => {
        like.destroy()
      })
    })
    .then(() => {
      Post.findOne({
        where: { id: req.params.id },
      }).then((post) => {
        if (req.user.role == 0 && post.userId !== req.user.userId) {
          return next(res.status(401))
        } else if (post) {
          post
            .destroy()
            .then((post) => {
              if (post.image_url !== "") {
                const imgPath = post.image_url.replace(
                  "http://127.0.0.1:3000",
                  "."
                )
                fs.unlink(imgPath, (err) => {
                  if (err) {
                    console.error(err)
                  } else {
                    console.log("Image supprimée")
                  }
                })
              }
            })
            .then(() => {
              res
                .status(200)
                .json({ message: "Le post a bien été supprimé." })
            })
            .catch((error) => {
              res.status(400).json({
                error: error,
              })
            })
        }
      })
    })
    .catch((error) => {
      res.status(400).json({
        error: error,
      })
    })
}

// Trouve le post correspondant à l'id de la page, puis analyse le corps de la requête pour savoir si l'utilisation a liké ou annulé un like. Si l'utilisateur like, son id est enregistré dans un array et le compteur associé augmente de 1. S'il s'agit d'une annulation de like, supprime l'ID de l'utilisateur de l'array et diminue le nombre de like en question de 1.
exports.likePost = (req, res, next) => {
  Post.findOne({
    where: { id: req.params.id },
  })
    .then(async (post) => {
      if (req.body.like == 1) {
        const like = await Like.findOne({
          where: {
            userId: req.user.userId,
            likedPost: req.params.id,
          },
        })
        if (like) {
          throw error
        } else {
          post.increment("likes")
          Like.create({
            userId: req.user.userId,
            likedPost: req.params.id,
          })
          // .catch((error) => {
          //   res.status(400).json({
          //     error: error,
          //   })
          // })
        }
      } else if (req.body.like == 0) {
        const dislike = await Like.findOne({
          where: {
            userId: req.user.userId,
            likedPost: req.params.id,
          },
        })
        if (dislike) {
          post.decrement("likes")
          dislike.destroy()
        } else {
          throw error
        }
      }
    })
    .then(() => {
      res.status(200).json({})
    })
    .catch((error) => {
      res.status(400).json({
        error: error,
      })
    })
}
