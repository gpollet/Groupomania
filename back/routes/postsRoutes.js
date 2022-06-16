const express = require("express")
const router = express.Router()
const postsController = require("./../controllers/postsController")
const multer = require("../middleware/multer-config")

router
  .route("/")
  .get(postsController.getAllPosts)
  .post(multer, postsController.createPost)

router
  .route("/:id")
  .put(multer, postsController.updatePost)
  .delete(postsController.deletePost)
  .get(postsController.getPost)

router.route("/:id/like").post(postsController.likePost)

module.exports = router
