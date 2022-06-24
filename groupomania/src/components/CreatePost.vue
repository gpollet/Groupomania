<template>
  <h2>Nouveau post</h2>
  <form method="post" action="http://127.0.0.1:3000/api/posts">
    <p>
      <label for="text">Texte : </label>
      <input type="text" name="text" id="new-text-content" placeholder="Votre texte..." v-model="text_content" />
    </p>
    <label for="image">Ajouter une image :</label>
    <input type="file" name="image" accept="image/jpg, image/jpeg, image/png">
    <button type="submit" @click.prevent="createPost()">Créer un post</button>
  </form>
</template>

<script setup>
import axios from "axios"

let user
let text_content
let imageUrl = null

function createPost() {
  axios.post("http://127.0.0.1:3000/api/posts", {
    text_content: text_content, imageUrl: imageUrl
  })
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
#new-text-content {
  width: 50em;
  height: 20em;
}
</style>
