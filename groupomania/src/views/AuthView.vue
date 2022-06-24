<template>
  <div>
    <h1>Connexion</h1>
    <p>
      <button @click="displayLogin" :class="{ active_button: loginActive }">Se connecter</button> <button
        @click="displaySignup" :class="{ active_button: !loginActive }">Créer
        un compte</button>
    </p>
    <login v-if="loginActive"></login>
    <register v-else></register>
  </div>
</template>

<script>
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
</script>

<style scoped lang="scss">
h1 {
  color: $primary-color;
}

button {
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
