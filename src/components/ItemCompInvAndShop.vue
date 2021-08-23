<template>
  <div class="item">
    <h3 v-if="name">{{ name }}</h3>
    <h5 v-if="damage">{{'Damage: ' + damage }}</h5>
    <h5 v-if="defence">{{'Defence: ' + defence }}</h5>
    <h5 v-if="heals">{{'Heals: ' + heals }}</h5>
    <h5 v-if="price">Price: {{ price }}</h5>
    <h5 v-if="sellPrice">Sell Price: {{ sellPrice }}</h5>
    <h5 v-if="ifSpecial">Special: {{ ifSpecial }}</h5>
    <div v-if="image">
      <img class="item-img" :src="image">
    </div>
  </div>
</template>

<script>
import {mapState} from "vuex";

export default {
  name: "ItemCompInvAndShop",
  props: ['name', 'damage','defence','heals', 'price', 'sellPrice', 'ifSpecial', 'image'],
  computed: {
    ...mapState(['user'])
  },
}
</script>

<style scoped>

.item-img {
  width: 100%;
  height: 200px;
}

.item {
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  color: white;
  background-color: rgb(40,44,52);
  border-top: 2px solid #42b983;
  border-right: 2px solid #42b983;
  border-left: 2px solid #42b983;
  height: 100%;
}

.gold {
  font-size: 30px;
  font-weight: bold;
  margin: 20px 0;
}

.gold1 {
  color: rgb(254, 232, 109);
}

</style>