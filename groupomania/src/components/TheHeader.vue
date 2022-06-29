<template>
  <header>
    <img src="@/assets/logos/icon-left-font.png" alt="Logo groupomania" />
    <nav>
      <router-link to="/">Accueil</router-link>
      <router-link to="/login" v-if="!user.userId && !user.token">Connexion</router-link>
      <span id="logout" v-else @click="logout()">Se déconnecter</span>
    </nav>
  </header>
</template>

<script setup>
import { user } from "@/store/index"

function logout() {
  user.userId = null,
  user.token = null
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
nav {
  @include secondary;
}

a, #logout {
  font-size: 2em;
  @include secondary;
  text-decoration: none;

  &:active {
    @include secondary;
  }

  &:hover {
    @include primary;
  }
}

img {
  height: 10em;
}
</style>
