<template>
  <div id="style">
    <h1>Connexion</h1>
    <p>
      <button @click="displayLogin()" :class="{ active_button: state.loginActive }">Se connecter</button> <button
        @click="displaySignup()" :class="{ active_button: !state.loginActive }">Créer
        un compte</button>
    </p>
    <component v-if="state.loginActive" :is="Login"></component>
    <component v-else :is="Register"></component>
  </div>
</template>

<!-- <script>
import Login from "@/components/Auth/Login.vue"
import Register from "@/components/Auth/Register.vue"

export default {
  name: ["LoginForm", "RegisterForm"],
  components: {
    Login,
    Register,
  },
  data() {
    return {
      loginActive: true,
      buttonColor: "",
    }
  },
  methods: {
    displayLogin() {
      return this.loginActive = true
    },
    displaySignup() {
      return this.loginActive = false
    },
  }
}
</script> -->

<script setup>
import { reactive } from 'vue'
import Login from "@/components/Auth/Login.vue"
import Register from "@/components/Auth/Register.vue"

const state = reactive({ loginActive: true })

function displayLogin() {
  state.loginActive = true
}

function displaySignup() {
  state.loginActive = false
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
