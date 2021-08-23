<template>
  <div class="inv-wrapper" v-if="userAuth">
    <p class="gold">GOLD: <span class="gold gold1">{{ user.gold }}</span></p>
    <div class="inv-item-wrapper">
      <div class="item-con" v-for="(item,index) in user.inventory" :key="index">
        <ItemCompInvAndShop
            :image="item.image"
            :ifSpecial="item.special"
            :damage="item.damage"
            :defence="item.defence"
            :heals="item.heals"
            :name="item.name"
            :sellPrice="item.sellPrice"
         />
        <button @click="sellFn(item.sellPrice,item)" class="Btn">Sell</button>
      </div>
    </div>
  </div>
</template>

<script>
import {mapState} from "vuex";
import ItemCompInvAndShop from "@/components/ItemCompInvAndShop";

export default {
  name: "Inventory",
  components: {
    ItemCompInvAndShop
  },
  methods: {
    sellFn(price, item) {
        let userGold = this.user.gold += price
        this.$store.dispatch('updateUserGold', userGold)
        this.$store.dispatch('removeItemFromInventory', item)
    },
  },
  computed: {
    ...mapState(['userAuth', 'user'])
  },
  mounted() {
    if (!this.userAuth) this.$router.push('/log-in')
  }
}
</script>

<style scoped>

.item-con {
  width: 200px;
  margin: 45px 5px 45px 5px;
}

.gold {
  color: white;
}

.gold1 {
  color: rgb(254,232,109);
}

.inv-wrapper {
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  background-color: #2c3e50;
}

.inv-item-wrapper {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
}

.Btn {
  width: 100%;
  border: none;
  background-color: #42b983 ;
  cursor: pointer;
  font-size: 20px;
  color: white;
  padding: 5px;
}

.Btn:active {
  background-color: rgb(186,104,200);
}

</style>