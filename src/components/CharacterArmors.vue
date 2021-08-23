<template>
  <div class="armorsWrapper">
    <div class="armorsSubWrapper" v-if="ownedArmorsArr">
      <div class="armorSubCon" @click="selectArmor(item)" :class="{'armorSelectedClass' : selectedArmor.name === item.name}"
           v-for="(item,index) in ownedArmorsArr" :key="index">
        <h4>{{ item.name }}</h4>
        <h4>Defence: {{ item.defence }}</h4>
        <img class="armorImg" :src="item.image" alt="">
      </div>
    </div>
  </div>
</template>

<script>
import {mapState} from "vuex";

export default {
  name: "CharacterArmors",
  computed: {
    ...mapState(['user','selectedArmor'])
  },
  data: () => {
    return {
      ownedArmorsArr: [],
    }
  },
  methods: {
    selectArmor(item) {
      this.$store.commit('selectArmor',item)
    }
  },
  mounted() {
    this.ownedArmorsArr = this.user.inventory.filter((e) => e.type === 'armor')
  },
  watch: {
    ownedArmorsArr: function () {
      this.$store.commit('selectArmor',{})
    }
  }
}
</script>

<style scoped>

.armorImg {
  width: 100px;
  height: 150px;
}

.armorSubCon {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  width: 100px;
  height: 200px;
  border: solid 3px rgb(40,44,52);
  cursor: pointer;
  margin: 5px;
}

.armorSelectedClass {
  border: solid 3px rgb(186,104,200);
}
.armorsSubWrapper {
  display: flex;
  justify-content: center;
}

.armorsWrapper {
  display: flex;
  flex-direction: column;
  width: 400px;
}

</style>