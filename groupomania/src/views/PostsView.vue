<template>
  <div class="home">
    <div id="new_post" v-if="user.userId && user.token">
      <h2>Nouveau post</h2>
      <PostEditor></PostEditor><button type="submit" @click.prevent="createPost()">Créer un post</button>
    </div>
    <Posts></Posts>
  </div>
</template>

<script setup>
import axios from "axios"
import PostEditor from "@/components/Posts/PostEditor.vue"
import { postContent } from "@/store/index"
import Posts from "@/components/Posts/PostsList.vue"
import { user } from "@/store/index"

const createPost = (async () => {
  let formData = new FormData()
  formData.append('text_content', postContent.text_content)
  formData.append('image', postContent.image)
  await axios.post("http://127.0.0.1:3000/api/posts",
    formData
    , { headers: { "Content-Type": "multipart/form-data", "Authorization": "Bearer " + user.token } })
    .then(postContent.text_content = '')
})
</script>
