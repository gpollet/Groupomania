<template><div class="new-post-form">
  <CreatePost @post-text-edit="(text) => thatContent.textContent = text"
    @post-image-edit="(imageUrl) => thatContent.imageUrl = imageUrl">
    <template v-slot:form-title>
      <h2 v-if="user.userId && user.token">Nouveau post</h2>
    </template>
    <template v-slot:new-post>
      <button class="button-style" type="submit" @click.prevent="createPost()">Créer le post</button>
    </template>
  </CreatePost></div>
  <PostsList></PostsList>
</template>

<script setup>
import CreatePost from "@/components/Posts/CreatePost.vue"
import PostsList from "@/components/Posts/PostsList.vue"
import { user, postsForm } from "@/store/index"
import axios from "axios"

let thatContent = {
  textContent: '',
  imageUrl: '',
}

const createPost = async () => {
  postsForm(axios.post, 'http://127.0.0.1:3000/api/posts', thatContent)
}

</script>

<style scoped lang="scss">
.new-post-form {
  text-align: center;
}
</style>