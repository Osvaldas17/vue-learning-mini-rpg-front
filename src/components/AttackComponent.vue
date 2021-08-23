<template>
  <div>
    <button @click="attackOpponentFn(selectedWeapon.name)" class="attack-btn">ATTACK</button>
  </div>
</template>

<script>
import {mapState} from "vuex";

export default {
  name: "AttackComponent",
  computed: {
    ...mapState(['user', 'selectedWeapon', 'selectedArmor', 'currentEnemy', 'enemies', 'respawn','enemyHealth'])
  },
  methods: {
    attackOpponentFn(weaponName) {
      let blockChance = Math.random() < 0.2
      let doubleDamageChance = Math.random() < 0.3
      let chanceToHeal = Math.random() < 0.4
      let weaponDamage = 5
      let negatedDamage = 2

      if (this.selectedArmor.defence) {
        negatedDamage = this.selectedArmor.defence
      }
      if (this.selectedWeapon.damage) {
        weaponDamage = Math.floor(Math.random() * this.selectedWeapon.damage)
      }
      let opponentDamage = (Math.floor(Math.random() * this.enemies[this.currentEnemy].maxDamage)) - negatedDamage
      if (opponentDamage < 0) opponentDamage = 0
      let goldReceived = this.user.gold += Math.floor(Math.random() * 20)
      this.$store.commit('damageEnemy', weaponDamage)
      this.user.health -= opponentDamage
      if (weaponName) {
        switch (weaponName) {
          case 'sword':
            if (blockChance) {
              console.log('blocked')
              this.user.health += opponentDamage
            }
            break;
          case 'bow':
            if (doubleDamageChance) {
              console.log('doubleDamage')
              this.$store.commit('damageEnemy', weaponDamage)
            }
            break;
          case 'magic wand':
            if (chanceToHeal) {
              console.log('healed')
              this.user.health += 10
              if (this.user.health > 100) {
                this.user.health = 100
              }
            }
            break;
          default:
            console.log('switch default',this.selectedWeapon);
        }
      }
      this.$store.dispatch('updateUserHealth', this.user.health)
      this.$store.dispatch('updateUserGold', goldReceived)
    }
  },
  watch: {
    user: function (val) {
      if (val.health <= 0) {
        this.$store.commit('respawn',true)
      }
    }
  }
}
</script>

<style scoped>

.attack-btn:hover {
  background-color: rgb(242, 77, 46);
}

.attack-btn:active {
  transform: scale(0.95);
}

.attack-btn {
  padding: 20px 40px;
  cursor: pointer;
  margin-top: 25px;
  margin-bottom: 25px;
  background-color: rgb(238, 74, 68);
  border: none;
  border-radius: 10px;
  font-size: 30px;
  font-weight: bold;
  color: white;
}

</style>