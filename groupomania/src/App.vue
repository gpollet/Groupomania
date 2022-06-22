<template>
  <nav>
    <router-link to="/">Accueil</router-link> |
    <router-link to="/auth">Connexion</router-link>
  </nav>
  <router-view />
</template>

<style lang="scss">
$primary-color: #fd2d01;
$secondary-color: #ffd7d7;
$tertiary-color: #4e5166;
</style>