<template>
  <div>
    <ul v-for="post of data.posts" :key="post.id">
      <article>
        <p>{{ post.User.firstName }} {{ post.User.lastName }} <time>({{ post.createdAt }})</time></p>
        <p class="last-updated" v-if="post.userEdit && post.createdAt !== post.userEdit"><time>Modifié {{ post.userEdit
        }}</time></p>
        <p>{{ post.text_content }}</p>
        <img v-if="post.image_url" :src="post.image_url">
        <p>
          <svg class="fa-like" @click="likePost(post)" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
            <!--! Font Awesome Pro 6.1.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. -->
            <path
              d="M0 190.9V185.1C0 115.2 50.52 55.58 119.4 44.1C164.1 36.51 211.4 51.37 244 84.02L256 96L267.1 84.02C300.6 51.37 347 36.51 392.6 44.1C461.5 55.58 512 115.2 512 185.1V190.9C512 232.4 494.8 272.1 464.4 300.4L283.7 469.1C276.2 476.1 266.3 480 256 480C245.7 480 235.8 476.1 228.3 469.1L47.59 300.4C17.23 272.1 .0003 232.4 .0003 190.9L0 190.9z" />
          </svg>{{ post.likes }}
        </p>
        <button>Modifier</button>
        <button v-if="post.userId == user.userId || user.role == 1"
          @click="deletePost(post.id, post.userId)">Supprimer</button>
      </article>
    </ul>
  </div>
</template>

<script setup>
import { reactive } from 'vue'
import axios from "axios"
import moment from 'moment'
import { user } from "@/store/index"

let data = reactive({ posts: {} })

const getPosts = async () => {
  axios.get("http://127.0.0.1:3000/api/posts")
    .then((response) => {
      response.data.forEach(element => {
        element.createdAt = moment(element.createdAt).fromNow()
        if (element.userEdit !== null) {
          element.userEdit = moment(element.updatedAt).fromNow()
        }
      })
      data.posts = response.data.reverse()
    })
    .catch((err) => {
      console.log(err)
    })
}
getPosts()

async function likePost(post) {
  if (user.userId) {
    // Vérifie si utilisateur a déjà liké, pour adapter la valeur du like dans la requête
    await axios.get(`http://127.0.0.1:3000/api/posts/${post.id}/`)
      .then((res) => {
        if (res.data.some(post => post.userId == user.userId)) {
          axios.post(`http://127.0.0.1:3000/api/posts/${post.id}/like`,
            { userId: user.userId, like: 0 },
            { headers: { "Authorization": "Bearer " + user.token } })
            .then(() => {
              post.likes--
            })
        } else {
          axios.post(`http://127.0.0.1:3000/api/posts/${post.id}/like`,
            { userId: user.userId, like: 1 },
            { headers: { "Authorization": "Bearer " + user.token } })
            .then(() => {
              post.likes++
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
        getPosts()
      })
  }
  // console.log(user.userId)
  // console.log(postId)
  // console.log(userId)
}

</script>

<style scoped lang="scss">
ul {
  border: 2px solid black;
  @include secondary
}

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
</style>
