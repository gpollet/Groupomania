<template>
  <div v-if="loginActive.state" class="auth-form">
    <h1 class="centered-text">Se connecter</h1>
    <login></login>
  </div>
  <div v-else class="auth-form">
    <h1 class="centered-text">Créer un compte</h1>
    <register></register>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import Login from "@/components/Auth/Login.vue"
import Register from "@/components/Auth/Register.vue"
import router from "@/router";
import { useRoute } from 'vue-router'
import { user, loginActive } from '@/store';

const route = useRoute()

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
  margin-bottom: 1em;
}

.auth-form {
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: white;
  width: 80%;
  padding: 0.8em;
  padding-bottom: 3em;
  margin: 1.5em;
  margin-left: auto;
  margin-right: auto;
  border: $tertiary-color 1px solid;

  @include desktop {
    width: 42%;
    padding: 3em;
  }

  &::v-deep {
    & form {

      display: flex;
      flex-direction: column;

      & label {
        padding-right: 1em;

        @include phone {
          margin-bottom: 0.2em;
        }
      }

      & p {
        display: flex;
        align-items: center;
        justify-content: space-between;

        @include phone {
          flex-direction: column;
          align-items: flex-start;
        }
      }

      & input,
      button {
        border: $primary-color 2px solid;
        background-color: white;
        border-radius: 15px;
        height: 2.5em;
        text-align: center;
        cursor: pointer;
      }

      & button {
        color: $primary-color;
        font-size: 1.2em;

        &:hover {
          font-weight: bold;
          color: $tertiary-color;
          border-color: $tertiary-color;
        }
      }
    }

    & .error-message {
      color: $primary-color;
      font-weight: bold;
    }
  }
}
</style>
