<template>
  <div class="weaponsWrapper">
    <div class="weaponsSubWrapper" v-if="ownedWeaponsArr">
      <div class="weaponSubCon" @click="selectWeapon(item)" :class="{'weaponSelectedClass' : selectedWeapon.name === item.name}"
           v-for="(item,index) in ownedWeaponsArr" :key="index">
        <h4>{{ item.name }}</h4>
        <h4>Damage: {{ item.damage }}</h4>
        <img class="weaponImg" :src="item.image" alt="">
      </div>
    </div>
    <div class="specialText">
      <h3>{{ selectedWeapon.special }}</h3>
    </div>
  </div>
</template>

<script>
import {mapState} from "vuex";

export default {
  name: "CharacterWeapons",
  computed: {
    ...mapState(['user','selectedWeapon']),
  },
  data: () => {
    return {
      ownedWeaponsArr: [],
    }
  },
  methods: {
    selectWeapon(item) {
      this.$store.commit('selectWeapon',item)
    }
  },
  mounted() {
    this.ownedWeaponsArr = this.user.inventory.filter((e) => e.type === 'weapon')
  },
  watch: {
    ownedWeaponsArr: function () {
      this.$store.commit('selectWeapon',{})
    }
  }
}
</script>

<style scoped>

.weaponImg {
  width: 60px;
  height: 60px;
}

.weaponSubCon {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100px;
  height: 100px;
  border: solid 3px rgb(40,44,52);
  cursor: pointer;
  margin: 5px;
}

.weaponSelectedClass {
  border: solid 3px rgb(252,96,66);
}

.weaponsSubWrapper {
  display: flex;
  justify-content: center;
}

.weaponsWrapper {
  display: flex;
  flex-direction: column;
  width: 400px;
}

.specialText {
  padding: 15px;
  height: 60px;
  color: rgb(252,96,66);
}

</style>