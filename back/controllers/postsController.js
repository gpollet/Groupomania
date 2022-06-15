const fs = require("fs")
const Post = require("../models/postModel")

// Demande à la DB de renvoyer tous les documents de la collection Post.
exports.getAllPosts = (req, res) => {
  Post.find()
    .then((posts) => {
      res.status(200).json(posts)
    })
    .catch((error) => {
      res.status(400).json({
        error: error,
      })
    })
}

// Demande à la DB de renvoyer le document de la collection Post qui a un _id identique à l'id de l'URI
exports.getPost = (req, res) => {
  Post.findById(req.params.id)
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
exports.createPost = (req, res) => {
  const postObject = JSON.parse(req.body.post)
  const post = new Post({
    ...postObject,
    imageUrl: `${req.protocol}://${req.get("host")}/images/${
      req.file.filename
    }`,
  })
    .then(() => {
      res.status(201).json({})
    })
    .catch((error) => {
      res.status(400).json({
        error: error,
      })
    })
}

// Vérifie si un fichier est joint. Si oui, convertit le corps de la requête pour y insérer l'url de l'image, si non met à jour les champs avec les nouvelles informations fournies par l'utilisateur.
exports.updatePost = (req, res, next) => {
  Post.findById(req.params.id).then((post) => {
    if (post.userId !== req.body.userId) {
      return next(res.status(401))
    }
    if (req.file) {
      const imgPath = post.imageUrl.replace("http://localhost:3000", ".")
      fs.unlink(imgPath, (err) => {
        if (err) {
          console.error(err)
        } else {
          console.log("Image supprimée")
        }
      })
    }
  })
  const postObject = req.file
    ? {
        ...JSON.parse(req.body.post),
        imageUrl: `${req.protocol}://${req.get("host")}/images/${
          req.file.filename
        }`,
      }
    : { ...req.body }
  Post.findByIdAndUpdate(req.params.id, { ...postObject, _id: req.params.id })
    .then(() => res.status(200).json({}))
    .catch((error) => res.status(400).json({ error }))
}

// Trouve le post ayant un _id correspondant à l'id de la requête, et le supprime.
exports.deletePost = (req, res, next) => {
  Post.findByIdAndDelete(req.params.id)
    .then((post) => {
      if (post.userId !== req.body.userId) {
        return next(res.status(401))
      }
      const imgPath = post.imageUrl.replace("http://localhost:3000", ".")
      fs.unlink(imgPath, (err) => {
        if (err) {
          console.error(err)
        } else {
          console.log("Image supprimée")
        }
      })
    })
    .then(() => {
      res.status(200).json()
    })
    .catch((error) => {
      res.status(400).json({
        error: error,
      })
    })
}

// Trouve le post correspondant à l'id de la page, puis analyse le corps de la requête pour savoir si l'utilisation a liké ou annulé un like. Si l'utilisateur like, son id est enregistré dans un array et le compteur associé augmente de 1. S'il s'agit d'une annulation de like, supprime l'ID de l'utilisateur de l'array et diminue le nombre de like en question de 1.
exports.likePost = (req, res) => {
  Post.findById(req.params.id)
    .then((post) => {
      if (req.body.like === 1) {
        return post.update({
          $push: { usersLiked: req.body.userId },
          $inc: { likes: 1 },
        })
      } else if (req.body.like === 0) {
        if (post.usersLiked.includes(req.body.userId)) {
          return post.update({
            $pull: { usersLiked: req.body.userId },
            $inc: { likes: -1 },
          })
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
