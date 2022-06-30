<template>
  <div class="home">
    <h2 v-if="user.userId && user.token">Nouveau post</h2>
    <CreatePost></CreatePost>
    <Posts></Posts>
  </div>
</template>

<script setup>
import CreatePost from "@/components/Posts/CreatePost.vue"
import Posts from "@/components/Posts/PostsList.vue"
import { user } from "@/store/index"
import { ref } from 'vue'


</script>
