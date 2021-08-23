<template>
  <div id="nav">
    <div class="nav-menu">
      <router-link to="/">Home</router-link>
      <span class="separator">|</span>
      <router-link to="/shop">Shop</router-link>
      <span class="separator">|</span>
      <router-link to="/arena">Arena</router-link>
      <span class="separator">|</span>
      <router-link to="/inventory">Inventory</router-link>
      <span class="separator">|</span>
      <router-link to="/leader-boards">Leader Boards</router-link>
    </div>
    <div v-if="!userAuth" class="nav-user">
      <router-link to="/register">Register</router-link>
      <span class="separator">|</span>
      <router-link to="/log-in">Log in</router-link>
    </div>
    <div v-if="userAuth" class="nav-user">
      <button class="log-out-btn" @click="logOut">Log out</button>
    </div>
  </div>
  <router-view/>
</template>

<script>
import {mapState,mapMutations} from "vuex";

export default {
  name: 'App',
  methods: {
    ...mapMutations(['setUserAuth']),
    logOut() {
      this.$router.push('/')
      this.$store.commit('setUser',{})
      this.$store.commit('setUserAuth','');
    }
  },
  computed: {
    ...mapState(['userAuth'])
  },
  mounted() {
    this.$store.dispatch('getAllUsers')
  }
}
</script>

<style>
*{
  margin: 0;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
body {
  min-height: 100%;
}
.separator {
  font-size: 30px;
  margin: 0 10px;
}
.log-out-btn {
  font-size: 20px;
  font-weight: bold;
  color: #3f5780;
  background-color: rgb(40, 44, 52);
  text-decoration: none;
  border: none;
  cursor: pointer;
}
.nav-user {
  display: flex;
  align-items: center;
  justify-content: center;
}
.nav-menu {
  display: flex;
  align-items: center;
  justify-content: center;
}

#nav {
  display: flex;
  justify-content: space-between;
  padding: 30px;
  background-color: rgb(40, 44, 52);
  position: sticky;
}

#nav a {
  font-size: 20px;
  font-weight: bold;
  color: #3f5780;
  text-decoration: none;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
