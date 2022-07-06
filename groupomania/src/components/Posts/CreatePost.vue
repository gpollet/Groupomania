<template>
  <slot name="form-title"></slot>
  <form method="post" action="http://127.0.0.1:3000/api/posts">
    <p>
      <label for="text">Texte : </label>
      <input type="text" name="text" id="new-text-content" placeholder="Votre texte..." @keydown.enter.prevent
        v-model="newContent.textContent" v-on:change="emitText"/>
    </p>
    <label for="image">Ajouter une image :</label>
    <input type="file" name="image" accept="image/jpg, image/jpeg, image/png" v-on:change="getAddedFile">
    <slot name="new-post"></slot>
    <slot name="edit-post"></slot>
  </form>
</template>

<script setup>
import { user, data, postContent, postsForm } from "@/store/index"

const emit = defineEmits(['postTextEdit', 'postImageEdit'])

function emitText()  {
emit('postTextEdit', newContent.textContent)
}

let newContent = {
  textContent: '',
  imageUrl: ''
}

function getAddedFile(e) {
  newContent.imageUrl = e.target.files[0]
  emit('postImageEdit', newContent.imageUrl)
}
</script>

<style scoped lang="scss">
#new-text-content {
  width: 50em;
  height: 20em;
}
</style>
