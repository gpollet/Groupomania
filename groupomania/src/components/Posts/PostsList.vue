<template>
  <div class="post-list" v-if="data.posts.length > 0" v-for="post of data.posts" :key="post.id">
    <Post :post-id="post.id" :first-name="post.User.firstName" :last-name="post.User.lastName" :role="post.User.role"
      :created-at="post.createdAt" :user-edit="post.userEdit" :text-content="post.text_content"
      :image-url="post.image_url" :likes="post.likes" :user-id="post.userId" :display-state="post.displayState" @get-posts="getPosts" @liked="post.likes++"
      @unliked="post.likes--" @display-edit="post.displayState = !post.displayState"></Post>
  </div>
  <div v-else>
    <p>Aucun post n'a encore été créé.</p>
  </div>
</template>

<script setup>
import axios from "axios"
import moment from 'moment'
import { data } from "@/store/index"
import Post from "@/components/Posts/Post.vue"

const getPosts = async () => {
  axios.get("http://127.0.0.1:3000/api/posts")
    .then((response) => {
      moment.locale(navigator.language)
      // Convertit les dates de la DB pour les afficher dans la langue de l'utilisateur (selon le language de son navigateur)
      response.data.forEach(element => {
        element.createdAt = moment(element.createdAt).fromNow()
        if (element.userEdit !== null) {
          element.userEdit = moment(element.updatedAt).fromNow()
        }
      })
      data.posts = response.data.reverse()
      data.displayState = false
    })
    .catch((err) => {
      console.log(err)
    })
}
getPosts()

// const createPost = async () => {
//   postsForm(axios.post, 'http://127.0.0.1:3000/api/posts')
// }

// function displayEditForm(postId) {
//   displayEdit.postId = postId
//   displayEdit.state = !displayEdit.state
// }

// function editPost(postId) {
//   postsForm(axios.put, `http://127.0.0.1:3000/api/posts/${postId}`)
// }

// async function likePost(post) {
//   if (user.userId) {
//     // Vérifie si utilisateur a déjà liké, pour adapter la valeur du like dans la requête
//     await axios.get(`http://127.0.0.1:3000/api/posts/${post.id}/like`)
//       .then((res) => {
//         if (res.data.some(post => post.userId == user.userId)) {
//           axios.post(`http://127.0.0.1:3000/api/posts/${post.id}/like`,
//             { userId: user.userId, like: 0 },
//             { headers: { "Authorization": "Bearer " + user.token } })
//             .then(() => {
//               post.likes--
//             })
//         } else {
//           axios.post(`http://127.0.0.1:3000/api/posts/${post.id}/like`,
//             { userId: user.userId, like: 1 },
//             { headers: { "Authorization": "Bearer " + user.token } })
//             .then(() => {
//               post.likes++
//             })
//         }
//       })
//       .catch((err) => {
//         console.log(err)
//       })
//   } else {
//     throw error
//   }
// }

// async function deletePost(postId, userId) {
//   if (user.role == 1 || user.userId && user.userId == userId) {
//     await axios.delete(`http://127.0.0.1:3000/api/posts/${postId}`, { headers: { "Authorization": `Bearer ${user.token}` } })
//       .then(() => {
//         getPosts()
//       })
//   }
// }

</script>

<style scoped lang="scss">
.post-list {
  border: 2px solid black;
  @include secondary
}
</style>
