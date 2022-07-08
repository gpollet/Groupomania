<template>
  <div class="new-post-form">
    <CreatePost @post-text-edit="(text) => thatContent.textContent = text"
      @post-image-edit="(imageUrl) => thatContent.imageUrl = imageUrl">
      <template v-slot:form-title>
        <h2 v-if="user.userId && user.token">Créer un nouveau post</h2>
      </template>
      <template v-slot:new-post>
        <button class="button-style" type="submit" @click.prevent="createPost()">Créer le post</button>
      </template>
    </CreatePost>
  </div>
  <div class="post-list" v-if="data.posts.length > 0" v-for="post of data.posts" :key="post.id">
    <Post :post-id="post.id" :first-name="post.User.firstName" :last-name="post.User.lastName" :role="post.User.role"
      :created-at="post.createdAt" :user-edit="post.userEdit" :text-content="post.text_content"
      :image-url="post.image_url" :likes="post.likes" :user-id="post.userId" :display-state="post.displayState"
      :user-liked="post.Likes" @get-posts="getPosts" @liked="updateLikes('like', post)"
      @unliked="updateLikes('unlike', post)" @display-edit="post.displayState = !post.displayState"></Post>
  </div>
  <div v-else>
    <p>Aucun post n'a encore été créé.</p>
  </div>
</template>

<script setup>
import CreatePost from "@/components/Posts/CreatePost.vue"
import { user, postsForm, data, needRefresh } from "@/store/index"
import axios from "axios"
import moment from 'moment'
import Post from "@/components/Posts/Post.vue"
import { watch } from 'vue'


let thatContent = {
  textContent: '',
  imageUrl: '',
}

const createPost = async () => {
  postsForm(axios.post, 'http://127.0.0.1:3000/api/posts', thatContent)
}

const getPosts = async () => {
  axios.get(`http://127.0.0.1:3000/api/posts?user=${user.userId}`, { headers: { "Authorization": "Bearer " + user.token } })
    .then((response) => {
      moment.locale(navigator.language)
      // Convertit les dates de la DB pour les afficher dans la langue de l'utilisateur (selon le language de son navigateur)
      response.data.forEach(element => {
        if (element.Likes.length !== 0) {
          element.Likes = 1
        } else {
          element.Likes = 0
        }
        element.createdAt = moment(element.createdAt).fromNow()
        if (element.userEdit !== null) {
          element.userEdit = moment(element.userEdit).fromNow()
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

function updateLikes(likeParam, post) {
  if (likeParam == 'like') {
    post.likes++
    post.Likes = 1
  } else {
    post.likes--
    post.Likes = 0
  }

}

watch(() => needRefresh.status, (status) => {
  if (needRefresh.status == true) {
    getPosts()
    needRefresh.status = false
  }
})

</script>

<style scoped lang="scss">
.new-post-form {
  text-align: center;
}

.post-list {
  border: 2px solid black;
  border-radius: 5px;
  padding: 1em;
  margin: 1em;
  width: 80%;
  margin-left: auto;
  margin-right: auto;
  background-color: white;
}
</style>