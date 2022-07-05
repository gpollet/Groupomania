const express = require("express")
const router = express.Router()
const postsController = require("./../controllers/postsController")
const authPosts = require("../middleware/authPosts")
const multer = require("../middleware/multer-config")

router
  .route("/")
  .get(postsController.getAllPosts)
  .post(authPosts, multer, postsController.createPost)

router
  .route("/:id")
  .put(authPosts, multer, postsController.updatePost)
  .delete(authPosts, postsController.deletePost)

router.route("/:id/like").get(postsController.getLikedPost)

router.route("/:id/like").post(authPosts, postsController.likePost)

module.exports = router
