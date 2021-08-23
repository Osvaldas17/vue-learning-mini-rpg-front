<template>
  <div class="respawnWindow">
    <p class="respawnText">Your Character is Dead!</p>
    <button @click="resetUser" class="respawnBtn">Respawn</button>
  </div>
</template>

<script>

export default {
  name: "RespawnComponent",
  methods: {
    resetUser() {
        this.$store.dispatch('resetUserStats')
        this.$router.push('./')
    }
  }
}
</script>

<style scoped>

.respawnWindow {
  position: absolute;
  background-color: rgba(93, 89, 89, 0.8);
  top: 200px;
  width: 80%;
  height: 500px;
  z-index: 99;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: space-around;
}
.respawnBtn {
  font-size: 35px;
  font-weight: bold;
  padding: 20px 50px;
  cursor: pointer;
  background-color: rgb(239,239,239);
  border: none;
}
.respawnBtn:hover {
  background-color: white;
  transform: scale(1.05);
}
.respawnText {
  font-size: 60px;
  font-weight: bold;
  color: rgb(238,74,68);
  border-bottom: solid 5px white;
}

</style>