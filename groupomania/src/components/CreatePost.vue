<template>
  <h2 v-if="user.userId && user.token">Nouveau post</h2>
  <form method="post" action="http://127.0.0.1:3000/api/posts" v-if="user.userId && user.token">
    <p>
      <label for="text">Texte : </label>
      <input type="text" name="text" id="new-text-content" placeholder="Votre texte..." v-model="text_content" />
    </p>
    <label for="image">Ajouter une image :</label>
    <input type="file" name="image" accept="image/jpg, image/jpeg, image/png" v-on:change="getAddedFile">
    <button type="submit" @click.prevent="createPost()">Créer un post</button>
  </form>
</template>

<script setup>
import axios from "axios"
import { user } from "@/store/index"

let text_content = ""

let formData = new FormData()

function getAddedFile(e) {
  formData.append('image', e.target.files[0])
}


function createPost() {
  formData.append('text_content', this.text_content)
  axios.post("http://127.0.0.1:3000/api/posts",
    formData
    , { headers: { "Content-Type": "multipart/form-data", "Authorization": "Bearer " + user.token } })
}
</script>

<style scoped lang="scss">
#new-text-content {
  width: 50em;
  height: 20em;
}
</style>
