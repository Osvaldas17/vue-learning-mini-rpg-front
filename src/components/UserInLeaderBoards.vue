<template>
  <div :class="[checkUser() ? 'yourPosition' : '']" class="leaderBoardsUser">
    <p class="username w-33">{{index + 1}}</p>
    <p class="username w-33">{{item.username}}</p>
    <p class="gold w-33">{{item.gold}}</p>
  </div>
</template>

<script>
import {mapState} from "vuex";

export default {
  name: "UserInLeaderBoards",
  props: ['item','index'],
  computed: {
    ...mapState(['user'])
  },
  methods: {
    checkUser() {
      if (this.user) {
        return this.user.username === this.item.username;
      }
    }
  },
}
</script>

<style scoped>

.leaderBoardsUser {
  display: flex;
  justify-content: space-around;
  align-items: center;
  border-bottom: solid 1px black;
}
.yourPosition {
  background-color: #0f6674;
}
.gold {
  font-size: 25px;
  font-weight: bold;
  color: rgb(254,232,109);
}
.username {
  font-size: 25px;
  font-weight: bold;
}
.w-33 {
  width: 33%;
}

</style>