<template>
  <article>
    <p>{{ firstName }} {{ lastName }} <span v-if="role === 1" class="admin">[Admin] </span><time>({{ createdAt
    }})</time>
    </p>
    <span class="last-updated" v-if="userEdit && createdAt !== userEdit"><time>Modifié {{
        userEdit
    }}</time></span>
    <p>{{ textContent }}</p>
    <img v-if="imageUrl" :src="imageUrl">
    <p>
      <svg class="fa-like" @click="likePost(postId)" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
        <!--! Font Awesome Pro 6.1.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. -->
        <path
          d="M0 190.9V185.1C0 115.2 50.52 55.58 119.4 44.1C164.1 36.51 211.4 51.37 244 84.02L256 96L267.1 84.02C300.6 51.37 347 36.51 392.6 44.1C461.5 55.58 512 115.2 512 185.1V190.9C512 232.4 494.8 272.1 464.4 300.4L283.7 469.1C276.2 476.1 266.3 480 256 480C245.7 480 235.8 476.1 228.3 469.1L47.59 300.4C17.23 272.1 .0003 232.4 .0003 190.9L0 190.9z" />
      </svg>{{ likes }}
    </p>
    <div v-if="userId == user.userId || user.role == 1">
      <button @click="displayEditForm">Modifier</button>
      <create-post-form v-if="displayState == true" v-slot:edit-post>
        <button type="submit" @click.prevent="editPost(postId)">Modifier le
          post</button>
      </create-post-form>
      <button @click="deletePost(postId, userId)">Supprimer le post</button>
    </div>
  </article>
</template>

    <script setup>
import axios from "axios"
import { user, postsForm } from "@/store/index"
import createPostForm from "@/components/Posts/CreatePost.vue"

const emit = defineEmits(['getPosts', 'liked', 'unliked', 'displayEdit'])

defineProps({
  postId: Number,
  firstName: String,
  lastName: String,
  role: Number,
  createdAt: String,
  userEdit: String,
  textContent: String,
  imageUrl: String,
  likes: Number,
  userId: Number,
  displayState: Boolean
})

function displayEditForm() {
  emit('displayEdit')
}

function editPost(postId) {
  postsForm(axios.put, `http://127.0.0.1:3000/api/posts/${postId}`).then(() => {
    emit('getPosts')
  })
}

async function likePost(postId) {
  if (user.userId) {
    // Vérifie si utilisateur a déjà liké, pour adapter la valeur du like dans la requête
    await axios.get(`http://127.0.0.1:3000/api/posts/${postId}/like`)
      .then((res) => {
        if (res.data.some(post => post.userId == user.userId)) {
          axios.post(`http://127.0.0.1:3000/api/posts/${postId}/like`,
            { userId: user.userId, like: 0 },
            { headers: { "Authorization": "Bearer " + user.token } })
            .then(() => {
              emit('unliked')
            })
        } else {
          axios.post(`http://127.0.0.1:3000/api/posts/${postId}/like`,
            { userId: user.userId, like: 1 },
            { headers: { "Authorization": "Bearer " + user.token } })
            .then(() => {
              emit('liked')
            })
        }
      })
      .catch((err) => {
        console.log(err)
      })
  } else {
    throw error
  }
}

async function deletePost(postId, userId) {
  if (user.role == 1 || user.userId && user.userId == userId) {
    await axios.delete(`http://127.0.0.1:3000/api/posts/${postId}`, { headers: { "Authorization": `Bearer ${user.token}` } })
      .then(() => {
        emit('getPosts')
      })
  }
}

</script>

<style scoped lang="scss">
.fa-like {
  width: 1.5em;
  fill: $primary-color;
  cursor: pointer;
}

img {
  height: 10em;
}

.last-updated {
  color: $tertiary-color;
}

.admin {
  @include primary;
}
</style>