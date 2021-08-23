<template>
  <div class="characterWrapper">
    <div>
      <img class="characterImg" :src="characterImg" alt="">
    </div>
    <div>
      <h2 style="color: rgb(242,77,46)">{{ name }}</h2>
    </div>
    <div>
      <div style="width: 100%" class="healthBar">
        <div :style="{width: health + '%'}" class="health"/>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: "CharacterComp",
  props: ['characterImg', 'name', 'health'],
}
</script>

<style scoped>

.healthBar {
  background-color: rgb(247, 247, 247);
  height: 30px;
}

.health {
  background-color: rgb(26, 137, 23);
  height: 30px;
  z-index: 1;
}

.characterWrapper {
  width: 90%;
  text-align: center;
  height: 100%;
  justify-content: space-around;
  display: flex;
  flex-direction: column;
}

.characterImg {
  height: 450px;
  width: 300px;
  border-radius: 10px 10px 0 0;
}

</style>