<template>
  <div class="post-form">
    <slot name="form-title"></slot>
    <form method="post" action="http://127.0.0.1:3000/api/posts">
      <label for="text">Texte (requis) : </label>
      <p>
        <input type="text" name="text" class="new-text-content" placeholder="Votre texte..." @keydown.enter.prevent
          v-model="newContent.textContent" @change="emitText" />
      </p>
      <div class="new-post-buttons"><label for="image">Ajouter une image : </label>
        <input type="file" name="image" accept="image/jpg, image/jpeg, image/png" v-on:change="getAddedFile">
        <slot name="new-post"></slot>
      </div>
      <slot name="edit-post"></slot>
    </form>
  </div>
</template>

<script setup>
import { reactive } from 'vue'

let newContent = reactive({
  textContent: null,
  imageUrl: null
})

const emit = defineEmits(['postTextEdit', 'postImageEdit'])

const props = defineProps({
  postText: String
})

const getEditedPostText = function (postText) {
  if (postText && newContent.textContent == null) {
    newContent.textContent = props.postText
  }
}

getEditedPostText(props.postText)

function emitText() {
  emit('postTextEdit', newContent.textContent)
}

function getAddedFile(e) {
  newContent.imageUrl = e.target.files[0]
  emit('postImageEdit', newContent.imageUrl)
}

</script>

<style scoped lang="scss">
.new-text-content {
  width: 60%;
  height: 20em;
  color: black;
  background-color: rgba(255, 255, 255, 0.7);
  border-radius: 10px;

  @include phone {
    width: 80%;
  }

  @include tablet {
    width: 80%;
  }
}

.new-post-buttons {

  @include phone {
    text-align: left;

    & label {
      margin-left: 0.8em;
    }
  }
}

::file-selector-button {
  margin: 0.6em;
  text-decoration: none;
  background-color: white;
  border: $primary-color 2px solid;
  border-radius: 10px;
  padding: 8px;
  color: $primary-color;
  cursor: pointer;

  &:hover {
    font-weight: bold;
    color: $tertiary-color;
    border-color: $tertiary-color;
  }
}

::-webkit-file-upload-button {
  margin: 0.6em;
  text-decoration: none;
  background-color: white;
  border: $primary-color 2px solid;
  border-radius: 10px;
  padding: 8px;
  color: $primary-color;
  cursor: pointer;

  &:hover {
    font-weight: bold;
    color: $tertiary-color;
    border-color: $tertiary-color;
  }
}

form {
  margin-bottom: 1em;
}
</style>
