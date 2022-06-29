<template>
  <!-- <h2>Créer un compte</h2> -->
  <form method="post" action="http://127.0.0.1:3000/api/auth/signup">
    <p>
      <label for="email">Email : </label>
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
    <button type="submit" @click.prevent="signup()">Créer un compte</button>
  </form>
</template>

<script setup>
import axios from "axios"

let username
let firstName
let lastName
let password

function signup() {
  axios.post("http://127.0.0.1:3000/api/auth/signup", {
    email: this.username, lastName: this.lastName, firstName: this.firstName, password: this.password
  })
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>
