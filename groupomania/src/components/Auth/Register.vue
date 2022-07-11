<template>
  <form method="post" action="http://127.0.0.1:3000/api/auth/signup">
    <p class="error-message" v-if="email.status == false">Cet email n'est pas reconnu.</p>
    <p>
      <label for="email">Email Groupomania : </label>
      <input type="email" name="email" placeholder="john.doe@email.com" v-model="username" />
    </p>
    <p>
      <label for="lastName">Nom : </label>
      <input type="text" name="lastName" placeholder="Doe" v-model="lastName" />
    </p>
    <p>
      <label for="firstName">Prénom : </label>
      <input type="text" name="firstName" placeholder="John" v-model="firstName" />
    </p>
    <p>
      <label for="password">Mot de passe : </label><input type="password" name="password" v-model="password" />
    </p>
    <button type="submit" @click.prevent="signup()" @keypress.enter="signup()">Créer un
      compte</button>
  </form>
</template>

<script setup>
import axios from "axios"
import router from "@/router";
import { reactive } from 'vue'

let username
let firstName
let lastName
let password
let email = reactive({ status: null })

async function signup() {
  if (this.username) {
    email.status = (this.username.endsWith("@groupomania.com"))
    if (email.status == true) {
      await axios.post("http://127.0.0.1:3000/api/auth/signup", {
        email: this.username, lastName: this.lastName, firstName: this.firstName, password: this.password
      })
        .then(() => router.push({ path: "/login" }))
        .catch((err) => {
        })
    }
  }
}
</script>

<style scoped lang="scss">

</style>