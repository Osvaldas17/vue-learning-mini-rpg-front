<template>
  <div class="arenaWrapper" v-if="userAuth">
    <h1 class="arena">ARENA</h1>
    <h2 class="goldText">Gold: <span class="goldAmount">{{ user.gold }}</span></h2>
    <div>
      <div class="fight-con">
        <div class="character-window">
          <CharacterComp :characterImg="user.image" :name="user.username" :health="user.health"/>
        </div>
        <div class="middle-con">
          <h2>Potions:</h2>
          <PotionsComponentForArena/>
          <AttackComponent/>
          <div>
            <CharacterWeapons/>
          </div>
          <div>
            <CharacterArmors/>
          </div>
        </div>
        <div class="character-window">
          <CharacterComp :characterImg="enemies[currentEnemy].img" :name="enemies[currentEnemy].name"
                         :health="enemyHealth"/>
        </div>
      </div>
    </div>
    <RespawnComponent v-if="respawn" />
  </div>
</template>

<script>
import {mapState} from "vuex";
import CharacterComp from "@/components/CharacterComp";
import PotionsComponentForArena from "@/components/PotionsComponentForArena";
import CharacterWeapons from "@/components/CharacterWeapons";
import CharacterArmors from "@/components/CharacterArmors";
import AttackComponent from "@/components/AttackComponent";
import RespawnComponent from "@/components/RespawnComponent";

export default {
  name: "Arena",
  components: {
    RespawnComponent,
    CharacterComp,
    PotionsComponentForArena,
    CharacterWeapons,
    CharacterArmors,
    AttackComponent
  },
  computed: {
    ...mapState(['userAuth', 'user', 'enemies', 'currentEnemy', 'enemyHealth','respawn'])
  },
  methods: {},
  mounted() {
    if (!this.userAuth) this.$router.push('/log-in')
  }
}
</script>

<style scoped>

* {
  margin: 0;
}
.arenaWrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  height: 90vh;
}

.middle-con {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.goldText {
  margin-bottom: 20px;
}

.goldAmount {
  color: rgb(254, 232, 109);
}

.character-window {
  width: 380px;
  height: 600px;
  background-color: rgb(40, 44, 52);
  margin: 10px;
  display: flex;
  justify-content: center;
  border-radius: 5px;
}

.item-con {
  display: flex;
}

.arena {
  margin-bottom: 20px;
}

.fight-con {
  display: flex;
  justify-content: space-around;
}

</style>