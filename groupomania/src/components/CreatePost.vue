<template>
  <h2>Nouveau post</h2>
  <form method="post" action="http://127.0.0.1:3000/api/posts">
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
// let file

let formData = new FormData()

function getAddedFile(e) {
  // file = e.target.files[0]
  formData.append('image', e.target.files[0])
  // formData.append('text_content', this.text_content)
  // console.log(file)
  // console.log(formData)
}


function createPost() {
  // console.log(text_content)
  formData.append('text_content', this.text_content)
  axios.post("http://127.0.0.1:3000/api/posts",
    formData
    , { headers: { "Content-Type": "multipart/form-data", "Authorization": "Bearer " + user.token } })
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
#new-text-content {
  width: 50em;
  height: 20em;
}
</style>
