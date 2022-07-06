<template>
  <div id="style">
    <h1>Connexion</h1>
    <p>
      <button @click="displayLogin()" :class="{ active_button: loginActive.state }">Se connecter</button> <button
        @click="displaySignup()" :class="{ active_button: !loginActive.state }">Créer
        un compte</button>
    </p>
    <login v-if="loginActive.state"></login>
    <register v-else></register>
  </div>
</template>

<script setup>
import { reactive, onMounted } from 'vue'
import Login from "@/components/Auth/Login.vue"
import Register from "@/components/Auth/Register.vue"
import router from "@/router";
import { useRoute } from 'vue-router'
import { user } from '@/store';

const route = useRoute()
const loginActive = reactive({ state: null })

onMounted(async () => {
  await router.isReady()
  if (!user.userId) {
    if (route.path === "/login" || route.path === "/") {
      displayLogin()
    } else {
      displaySignup
    }
  }
})

function displayLogin() {
  loginActive.state = true
  router.push({ path: "/login" })
}

function displaySignup() {
  loginActive.state = false
  router.push({ path: "/signup" })
}
</script>

<style scoped lang="scss">
h1 {
  color: $primary-color;
}

#style::v-deep button {
  width: 20em;
  height: 4em;

  &:hover {
    @include tertiary;
  }
}

.active_button {
  @include secondary;
  font-weight: bold;

  &:hover {
    @include secondary;
  }
}
</style>
