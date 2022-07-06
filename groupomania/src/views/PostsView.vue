<template>
  <div class="home">
    <CreatePost>
      <template v-slot:form-title>
        <h2 v-if="user.userId && user.token">Nouveau post</h2>
      </template>
      <template v-slot:new-post>
        <button type="submit" @click.prevent="createPost()">Créer le post</button>
      </template>
    </CreatePost>
    <PostsList></PostsList>
  </div>
</template>

<script setup>
import CreatePost from "@/components/Posts/CreatePost.vue"
import PostsList from "@/components/Posts/PostsList.vue"
import { user, needRefresh, postsForm } from "@/store/index"
import axios from "axios"

const createPost = async () => {
  postsForm(axios.post, 'http://127.0.0.1:3000/api/posts').then(() => {
    needRefresh.status = true
  })
}

</script>
