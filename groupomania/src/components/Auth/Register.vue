<template>
  <form method="post" action="http://127.0.0.1:3000/api/auth/signup">
    <p class="error-message" v-if="email.status == false">Cet email n'est pas reconnu. Assurez-vous d'utiliser votre
      email
      Groupomania.</p>
    <p>
      <label for="email">Email Groupomania : </label>
      <input id="email" type="email" name="email" placeholder="john.doe@email.com" v-model="username" />
    </p>
    <p>
      <label for="lastName">Nom : </label>
      <input id="lastName" type="text" name="lastName" placeholder="Doe" v-model="lastName" />
    </p>
    <p>
      <label for="firstName">Prénom : </label>
      <input id="firstName" type="text" name="firstName" placeholder="John" v-model="firstName" />
    </p>
    <p>
      <label for="password">Mot de passe : </label>
      <input id="password" type="password" name="password" v-model="password" />
    </p>
    <button type="submit" @click.prevent="signup()" @keypress.enter="signup()">Créer un
      compte</button>
    <p class="error-message" v-if="emptyFields.status == true">Tous les champs doivent être remplis pour pouvoir créer
      un
      compte.</p>
  </form>
  <p class="success-message" v-if="accountCreated.status == true">Le compte a bien été créé. Vous allez être redirigé
    vers la page de connexion.</p>
</template>

<script setup>
import axios from "axios"
import router from "@/router";
import { reactive } from 'vue'
import { loginActive } from '@/store';

let username
let firstName
let lastName
let password
let email = reactive({ status: null })
let accountCreated = reactive({ status: false })
let emptyFields = reactive({ status: false })

async function signup() {
  email.status = (this.username.endsWith("@groupomania.com"))
  if (!this.username || !this.firstName || !this.lastName || !this.password || !this.email) {
    emptyFields.status = true
  } else {
    emptyFields.status = false
    if (email.status == true) {
      await axios.post("http://127.0.0.1:3000/api/auth/signup", {
        email: this.username, lastName: this.lastName, firstName: this.firstName, password: this.password
      })
        .then(() => {
          accountCreated.status = true
          setTimeout(redirectToLogin, 5000)

        })
        .catch((err) => {
          accountCreated = false
        })
    }

  }
}

function redirectToLogin() {
  router.push({ path: "/login" })
  loginActive.state = true
}
</script>

<style scoped lang="scss">
.success-message {
  font-weight: bold;
  text-align: center;
}
</style>