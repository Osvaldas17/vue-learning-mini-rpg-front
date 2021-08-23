<template>
  <div class="shop-wrapper" v-if="userAuth">
    <h1 class="shop">Shop</h1>
    <p class="gold">GOLD: <span class="gold gold1">{{ user.gold }}</span></p>
    <div class="inv-item-wrapper">
      <div class="item-con" v-for="(item,index) in shop" :key="index">
        <ItemCompInvAndShop
            :image="item.image"
            :ifSpecial="item.special"
            :damage="item.damage"
            :defence="item.defence"
            :heals="item.heals"
            :name="item.name"
            :sellPrice="item.sellPrice"
            :price="item.price"
        />
        <button v-if="!checkIfPurchased(item)" @click="buyFn(item.price,item)" class="Btn">Purchase</button>
        <button v-if="checkIfPurchased(item)"  class="purchasedBtn">Purchased</button>
      </div>
    </div>
  </div>
</template>
<script>

import {mapState} from "vuex";
import ItemCompInvAndShop from "@/components/ItemCompInvAndShop";

export default {
  name: 'Shop',
  components: {
    ItemCompInvAndShop
  },
  computed: {
    ...mapState(['userAuth', 'user', 'shop'])
  },
  methods: {
    checkIfPurchased(item) {
      let foundItem = this.user.inventory.find((i) => i.name === item.name)
      if (item.type !== 'potion' && foundItem) {
        return true
      }
    },
    buyFn(price, item) {
      if (price > this.user.gold) {
        console.log('not enough money')
      } else {
        let userGold = this.user.gold -= price
        this.$store.dispatch('updateUserGold', userGold)
        this.$store.dispatch('addItemToInventory', item)
      }

    },
  },
  mounted() {
    if (!this.userAuth) this.$router.push('/log-in')
  }
}
</script>

<style>

.gold {
  font-size: 30px;
  font-weight: bold;
  margin: 20px 0;
  color: white;
}

.shop-wrapper {
  background-color: #2c3e50;
}

.inv-item-wrapper {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  align-items: center;
}

.item-con {
  height: 400px;
  width: 200px;
  margin: 45px 5px 45px 5px;
  border-radius: 15px;
}

.gold1 {
  color: rgb(254, 232, 109);
}

.shop {
  padding: 30px 0;
  color: white;
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

.purchasedBtn {
  background-color: rgb(186,104,200);
  width: 100%;
  border: none;
  cursor: pointer;
  font-size: 20px;
  color: white;
  padding: 5px;
}

</style>