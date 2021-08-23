<template>
  <div class="potionWrapper">
    <div @click="usePotion('small potion')" class="potion">
      <img class="potion-img"
           src="https://www.seekpng.com/png/detail/233-2339047_health-potions-are-red-zelda-red-potion.png"
           alt="">
      <span class="potion-number">{{ potionNumber('small potion') }}</span>
    </div>
    <div @click="usePotion('medium potion')" class="potion">
      <img class="potion-img"
           src="https://www.pngkit.com/png/detail/441-4412466_potion-of-healing-png-image-royalty-free-download.png"
           alt="">
      <span class="potion-number">{{ potionNumber('medium potion') }}</span>
    </div>
    <div @click="usePotion('large potion')" class="potion">
      <img class="potion-img"
           src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQiAnXe609zb5cVg9xjlcM2Yp9VrV_AUVqJjw&usqp=CAU"
           alt="">
      <span class="potion-number">{{ potionNumber('large potion') }}</span>
    </div>
  </div>
</template>

<script>
import {mapState} from "vuex";

export default {
  name: "PotionsComponentForArena",
  computed: {
    ...mapState(['user'])
  },
  methods:{
    potionNumber(potionName) {
      let filteredArr = this.user.inventory.filter((e) => e.name === potionName)
      return filteredArr.length
    },
    usePotion(potionName) {
      if (this.user.inventory.find((e) => e.name === potionName)) {
        let selectedPotion = this.user.inventory.find((e) => e.name === potionName)
        let updatedHealth = this.user.health + selectedPotion.heals
        if (updatedHealth > 100) {
          updatedHealth = 100
        }
        this.$store.dispatch('removeItemFromInventory',selectedPotion)
        this.$store.dispatch('updateUserHealth',updatedHealth)
      } else {
        console.log('out of potion')
      }
    }
  }
}
</script>

<style scoped>
.potion-number {
  background-color: rgb(40, 44, 52);
  color: white;
  font-size: 18px;
  border-radius: 0 0 10px 10px;
}

.potion-img {
  width: 50px;
  height: 50px;
  border-radius: 10px 10px 0 0;
}

.potionWrapper {
  display: flex;
}

.potion {
  display: flex;
  flex-direction: column;
  margin: 20px;
  width: 50px;
  cursor: pointer;
  border: solid 2px rgb(40, 44, 52);
  border-radius: 15px;
}

.potion:active {
  transform: scale(0.95);
}

</style>