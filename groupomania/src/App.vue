<template>
  <TheHeader></TheHeader>
  <router-view v-if="user.userId" />
  <AuthView v-else></AuthView>
</template>

<script setup>
import TheHeader from "@/components/TheHeader.vue"
import AuthView from "@/views/AuthView.vue"
import { user } from "@/store/index"
</script>

<style lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Lato&display=swap');

#app {
  font-family: Lato;
}
</style>
