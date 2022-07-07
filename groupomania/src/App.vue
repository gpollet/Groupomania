<template>
  <div class="content">
    <TheHeader></TheHeader>
    <main>
      <router-view v-if="user.userId" />
      <AuthView v-else></AuthView>
    </main>
  </div>
  <TheFooterVue></TheFooterVue>
</template>

<script setup>
import TheHeader from "@/components/UI/TheHeader.vue"
import AuthView from "@/views/AuthView.vue"
import { user } from "@/store/index"
import TheFooterVue from "./components/UI/TheFooter.vue";
</script>

<style lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Lato&display=swap');



#app {
  font-family: Lato;
  display: flex;
  flex-direction: column;
}

html,
body,
#app {
  height: 100%;
  color: $tertiary-color;
}

.content {
  flex: 1 0 auto;
}

main {
  margin-left: 5em;
  margin-right: 5em;
}

a {
  text-decoration: none;
}

.button-style {
  margin: 0.6em;
  text-decoration: none;
  background-color: white;
  border: $primary-color 2px solid;
  border-radius: 10px;
  padding: 8px;
  color: $primary-color;
  cursor: pointer;
  &:hover {
          font-weight: bold;
          color: $tertiary-color;
          border-color: $tertiary-color;
  }
}

.centered-text {
  text-align: center;
}
</style>
