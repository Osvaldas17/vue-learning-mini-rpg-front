<template>
  <div class="home-wrapper">
    <div class="home" v-if="!userAuth">
      Mini rpg game
    </div>
    <div class="userWindow" v-if="(user && userAuth)">
      <h1>User: {{ user.username }}</h1>
      <img class="user-image" :src="user.image" alt="">
      <div>
        <div style="width: 100%" class="healthBar">
          <div :style="{width: user.health + '%'}" class="health">{{ user.health + '%' }}</div>
        </div>
      </div>
      <p class="gold">GOLD: <span class="gold gold1">{{ user.gold }}</span></p>
      <div class="input-con">
        <input v-model="img" class="changeImg inp" placeholder="image Url" type="text">
        <button @click="changeImg" class="changeImg btn">Change img</button>
      </div>
    </div>
    <RespawnComponent v-if="respawn" />
  </div>
</template>

<script>

import {mapState, mapActions} from "vuex";
import RespawnComponent from "@/components/RespawnComponent";


export default {
  name: 'Home',
  data: () => {
    return {
      img: ''
    }
  },
  components: {
    RespawnComponent
  },
  computed: {
    ...mapState(['userAuth', 'user','respawn'])
  },
  methods: {
    ...mapActions(['setUserFetch']),
    changeImg() {
      let data = {
        image: this.img
      }
      fetch('http://localhost:3000/user/updateUserImage', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'userauth': this.$store.state.userAuth
        },
        body: JSON.stringify(data)
      })
          .then(res => res.json())
          .catch((e) => {
            console.log(e)
          })
      this.$store.dispatch('setUserFetch')
    }
  },
  mounted() {
    this.$store.dispatch('setUserFetch')
  },
}
</script>

<style>
.home-wrapper {
  display: flex;
  justify-content: center;
  min-height: 100%;
}

.inp {
  background-color: rgb(40, 44, 52);
  color: white;
  border-radius: 5px;
}

.btn {
  color: white;
  background-color: #42b983;
  border-radius: 5px;
  cursor: pointer;
}
.home {
  display: flex;
  align-items: center;
  font-weight: bold;
  font-size: 100px;
  height: 90vh;
}

.btn:hover {
  background-color: rgb(40, 44, 52);
}

.btn:active {
  transform: scale(0.98);
}

.changeImg {
  padding: 5px 10px;
  font-size: 25px;
  font-weight: bold;
  margin: 10px;
  border: none;
  outline: none;
}

.input-con {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.gold {
  font-size: 30px;
  font-weight: bold;
  margin: 20px 0;
}

.gold1 {
  color: rgb(254, 232, 109);
}

.userWindow {
  margin-top: 50px;
}

.healthBar {
  background-color: rgb(247, 247, 247);
  height: 30px;
}

.health {
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  font-size: 25px;
  background-color: rgb(26, 137, 23);
  height: 30px;
  z-index: 1;
}

.user-image {
  width: 400px;
  height: 400px;
}
</style>
