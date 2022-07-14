<template>
  <header>
    <img src="@/assets/logos/icon-left-font.png" alt="Logo Groupomania" />
    <nav>
      <router-link to="/" v-if="user.userId"><button class="active_button">Accueil</button></router-link>
      <router-link to="/login" v-if="!user.userId && !user.token"><button @click="displayLogin()"
          :class="{ active_button: loginActive.state }">Se connecter</button></router-link>
      <router-link to="/signup" v-if="!user.userId && !user.token"><button @click="displaySignup()"
          :class="{ active_button: !loginActive.state }">Créer
          un compte</button></router-link>
      <router-link to="/logout" v-else @click="logout()"><button>Se déconnecter</button></router-link>
    </nav>
  </header>
</template>

<script setup>
import router from "@/router";
import { user, loginActive } from '@/store';


function displayLogin() {
  loginActive.state = true
  router.push({ path: "/login" })
}

function displaySignup() {
  loginActive.state = false
  router.push({ path: "/signup" })
}

function logout() {
  user.userId = null
  user.token = null
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
header {
  border-bottom: 1px solid $tertiary-color;
  background-color: white;
  display: flex;
  align-items: center;
  justify-content: space-between;

}

a {
  padding: 8px;
  margin: 0.8em;
  font-size: 1.2em;
  cursor: pointer;

  &:active,
  :hover {
    // color: $tertiary-color;
    font-weight: bold;
    cursor: pointer;
  }

  & button {
    background-color: white;
    border: 0;
    font-size: 1.2em;
  }
}

.button {
  text-decoration: none;
  background-color: white;
  border: 0;
  color: $secondary-color;
  cursor: pointer;
}

img {
  width: 200px;
  margin: 1em;
  margin-left: 2em;
}

.active_button {
  color: $primary-color;
  font-weight: bold;
}

*> {
  @include phone {
    header {
      flex-wrap: wrap;
    }

    img {
      margin: 0.8em;
    }

    a {
      margin: 0;
      font-size: 1.18em;
      padding-left: 0;
      padding-right: 0;
    }

    nav {
      display: flex;
    }
  }
}
</style>
