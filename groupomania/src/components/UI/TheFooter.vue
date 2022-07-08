<template>
  <footer>
    <p>
      © Groupomania -
      <a href="#">Mentions légales</a> - <a href="#">CGU</a> - <a href="#">Signaler un problème</a>
    </p>
  </footer>
</template>

<script setup>

</script>

<style lang="scss" scoped>
footer {
  flex-shrink: 0;
  color: $tertiary-color;
  background-color: white;
  text-align: center;

  & a {
    text-decoration: underline;
    color: $tertiary-color;

    &:visited {
      color: $tertiary-color;
    }
  }
}
</style>