<template>
  <!-- <h2>Se connecter</h2> -->
  <form method="post" action="http://127.0.0.1:3000/api/auth/login">
    <p>
      <label for="email">Email : </label>
      <input type="email" name="email" placeholder="john.doe@email.com" v-model="username" />
    </p>
    <p>
      <label for="password">Mot de passe : </label><input type="password" name="password" v-model="password" />
    </p>
    <button type="submit" @click.prevent="login()">Se connecter</button>
  </form>
</template>

<script setup>
import axios from "axios"
import { user } from "@/store/index"
import router from "@/router";

let username
let password
let role


function login() {
  axios.post("http://127.0.0.1:3000/api/auth/login", {
    email: this.username, password: this.password
  }, { "Content-Type": "application/json" }).then((res) => {
    user.userId = res.data.userId
    user.token = res.data.token
    user.role = res.data.role
    router.push({ path: "/" })
  })
}
</script>


<style scoped lang="scss">
</style>
