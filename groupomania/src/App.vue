<template>
  <TheHeader></TheHeader>
  <router-view />
</template>

<script setup>
import TheHeader from "@/components/TheHeader.vue"
</script>

<style lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Lato&display=swap');

#app {
  font-family: Lato;
}
</style>
