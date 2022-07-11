<template>
  <article>
    <div class="post-part">
      <p class="post-user">{{ firstName }} {{ lastName }} <span v-if="role === 1" class="admin">[Admin]</span><time> ({{
          createdAt
      }})</time>
      </p>
      <span class="last-updated" v-if="userEdit"><time>Modifié {{
          userEdit
      }}</time></span>
    </div>
    <div class="post-part">
      <p>
        <img v-if="imageUrl" :src="imageUrl">
      </p>
      <p v-if="displayState == false || displayState == null">{{ textContent }}</p>
      <div id="edit-form">
        <create-post-form :post-text="textContent" v-if="displayState == true" v-slot:edit-post
          @post-text-edit="(text) => thatContent.textContent = text"
          @post-image-edit="(imageUrl) => thatContent.imageUrl = imageUrl">
          <button class="button-style" @click.prevent="displayEditForm">Annuler les modifications</button>
          <button class="button-style" type="submit" @click.prevent="editPost(postId)">Envoyer les
            modifications</button>
        </create-post-form>
      </div>
    </div>
    <div class="post_bottom-part">
      <div class="like-count">
        <svg v-if="userLiked == 1" class="fa-like" @click="likePost(0, postId)" xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 512 512">
          <!--! Font Awesome Pro 6.1.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. -->
          <path
            d="M0 190.9V185.1C0 115.2 50.52 55.58 119.4 44.1C164.1 36.51 211.4 51.37 244 84.02L256 96L267.1 84.02C300.6 51.37 347 36.51 392.6 44.1C461.5 55.58 512 115.2 512 185.1V190.9C512 232.4 494.8 272.1 464.4 300.4L283.7 469.1C276.2 476.1 266.3 480 256 480C245.7 480 235.8 476.1 228.3 469.1L47.59 300.4C17.23 272.1 .0003 232.4 .0003 190.9L0 190.9z" />
        </svg>
        <svg v-else @click="likePost(1, postId)" class="fa-like" xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 512 512">
          <!--! Font Awesome Pro 6.1.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. -->
          <path
            d="M244 84L255.1 96L267.1 84.02C300.6 51.37 347 36.51 392.6 44.1C461.5 55.58 512 115.2 512 185.1V190.9C512 232.4 494.8 272.1 464.4 300.4L283.7 469.1C276.2 476.1 266.3 480 256 480C245.7 480 235.8 476.1 228.3 469.1L47.59 300.4C17.23 272.1 0 232.4 0 190.9V185.1C0 115.2 50.52 55.58 119.4 44.1C164.1 36.51 211.4 51.37 244 84C243.1 84 244 84.01 244 84L244 84zM255.1 163.9L210.1 117.1C188.4 96.28 157.6 86.4 127.3 91.44C81.55 99.07 48 138.7 48 185.1V190.9C48 219.1 59.71 246.1 80.34 265.3L256 429.3L431.7 265.3C452.3 246.1 464 219.1 464 190.9V185.1C464 138.7 430.4 99.07 384.7 91.44C354.4 86.4 323.6 96.28 301.9 117.1L255.1 163.9z" />
        </svg>
        {{ likes }}
      </div>
      <div class="post_bottom-right" v-if="userId == user.userId || user.role == 1">
        <button v-if="displayState == false || displayState == null" class="button-style"
          @click="displayEditForm">Modifier le post</button>
        <button v-if="displayState == false || displayState == null" class="button-style"
          @click="deletePost(postId, userId)">Supprimer le post</button>
      </div>
    </div>
  </article>
</template>

    <script setup>
import axios from "axios"
import { user, postsForm, data, userLikedPosts, needRefresh } from "@/store/index"
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
  displayState: Boolean,
  userLiked: Number
})

let thatContent = {
  textContent: '',
  imageUrl: '',
}

function editPost(postId) {
  postsForm(axios.put, `http://127.0.0.1:3000/api/posts/${postId}`, thatContent).then(() => {
    emit('getPosts')
  })
}

function displayEditForm() {
  emit('displayEdit')
}

async function likePost(likeParam, postId) {
  if (user.userId) {
    // Vérifie si utilisateur a déjà liké, pour adapter la valeur du like dans la requête
    if (likeParam == 0) {
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
  max-height: 20em;

  @include phone {
    max-width: 230px;
  }
}

.last-updated {
  color: $tertiary-color;
  margin-top: 0;
}

.admin {
  color: $primary-color;
}

.post-part {
  border-bottom: 2px $secondary-color solid;
  width: 100%;
}

.post-user {
  font-weight: bold;
  margin-bottom: 0;
  font-size: 1.2em;
}

time {
  font-weight: normal;
  font-style: italic;
}

.like-count {
  font-size: 1.2em;
  text-align: center;

  @include phone {
    margin-right: 0.8em;
  }
}

#edit-form {
  text-align: left;
}

.post_bottom-part {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 0.6em;
  margin-bottom: 0.6em;
}

.post_bottom-right {
  display: flex;
}
</style>