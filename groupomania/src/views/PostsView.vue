<template>
  <div class="home">
    <h2 v-if="user.userId && user.token">Nouveau post</h2>
    <CreatePost><button type="submit" @click.prevent="createPost()">Créer un post</button>
    </CreatePost>
    <PostsList></PostsList>
  </div>
</template>

<script setup>
import CreatePost from "@/components/Posts/CreatePost.vue"
import PostsList from "@/components/Posts/PostsList.vue"
import { user, data, postsForm } from "@/store/index"
import axios from "axios"
import {ref} from 'vue'

const createPost = async () => {
  postsForm(axios.post, 'http://127.0.0.1:3000/api/posts')
}

</script>
