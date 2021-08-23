<template>
  <div>
    <div class="leaderBoardsHead">
      <p class="w-33">Rank:</p>
      <p class="w-33">Username</p>
      <p class="w-33">Gold owned:</p>
    </div>
    <div v-for="(item,index) in sortedLeaderBoards" :key="index">
      <UserInLeaderBoards :item="item" :index="index"/>
    </div>
  </div>
</template>

<script>
import {mapState} from "vuex";
import UserInLeaderBoards from "@/components/UserInLeaderBoards";

export default {
  name: "LeaderBoards",
  components: {
    UserInLeaderBoards
  },
  data: () => {
    return {
      sortedLeaderBoards: []
    }
  },
  computed: {
    ...mapState(['allUsers'])
  },
  mounted() {
    this.$store.dispatch('getAllUsers')
  },
  watch: {
    allUsers: function (val) {
      if (val) {
        this.sortedLeaderBoards = this.allUsers.sort(function (a, b) {
          return parseFloat(b.gold) - parseFloat(a.gold);
        })
      }
    }
  }
}
</script>

<style scoped>

.leaderBoardsHead {
  flex: 1 1 0;
  display: flex;
  justify-content: space-around;
  padding: 20px;
  font-weight: bold;
  font-size: 20px;
  border-bottom: solid 2px gray;
}
.w-33 {
  width: 33%;
}

</style>