<template>
  <img src="@/assets/logos/icon-left-font.png" />
  <nav>
    <router-link to="/">Accueil</router-link>
    <router-link to="/login">Connexion</router-link>
  </nav>
</template>

<script setup>

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
nav {
  @include secondary;
}

a {
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
