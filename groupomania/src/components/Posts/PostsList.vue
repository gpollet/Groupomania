<template>
  <div class="post-list" v-if="data.posts.length > 0" v-for="post of data.posts" :key="post.id">
    <Post :post-id="post.id" :first-name="post.User.firstName" :last-name="post.User.lastName" :role="post.User.role"
      :created-at="post.createdAt" :user-edit="post.userEdit" :text-content="post.text_content"
      :image-url="post.image_url" :likes="post.likes" :user-id="post.userId" :display-state="post.displayState"
      @get-posts="getPosts" @liked="post.likes++" @unliked="post.likes--"
      @display-edit="post.displayState = !post.displayState"></Post>
  </div>
  <div v-else>
    <p>Aucun post n'a encore été créé.</p>
  </div>
</template>

<script setup>
import axios from "axios"
import moment from 'moment'
import { data, needRefresh } from "@/store/index"
import Post from "@/components/Posts/Post.vue"
import { watch } from 'vue'

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


watch(() => needRefresh.status, (status) => {
  if (needRefresh.status == true) {
    getPosts()
    needRefresh.status = false
  }
})

</script>

<style scoped lang="scss">
.post-list {
  border: 2px solid black;
  @include secondary
}
</style>
