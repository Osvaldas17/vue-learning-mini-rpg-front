<template>
  <div class="form-main">
    <div class="form-sub">
      <h1>Log in</h1>
      <input v-model="username" class="form-input" placeholder="Username" type="text">
      <input v-model="password" class="form-input" placeholder="Password" type="password">
      <button @click="logInFn">Submit</button>
    </div>
  </div>
</template>

<script>

import { mapState} from 'vuex'
import axios from "axios";

export default {
  name: "LogIn",
  data: () => {
    return {
      username: '',
      password: '',
    }
  },
  computed: {
    ...mapState(['userAuth','user']),
  },
  methods: {
    async logInFn() {
        let userAuth = await axios.post('http://localhost:3000/user/signIn',{
          headers: {
                'Content-Type': 'application/json',
              },
          username: this.username,
          password: this.password,
        })
        this.$store.commit('setUserAuth',userAuth.headers.userauth)

      }
  },
  watch: {
    userAuth(val) {
      if (val) this.$router.push('/')
    }
  }
}

</script>

<style scoped>

.form-sub {
  margin-top: 50px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.form-sub h1 {
  margin: 30px;
}

.form-input {
  padding: 10px 20px;
  font-size: 20px;
  border: none;
  outline: none;
  margin: 20px;
  background-color: rgb(248, 249, 250);
}

.form-sub button {
  padding: 10px 20px;
  font-size: 20px;
  color: white;
  background-color: #42b983;
  border: none;
  border-radius: 10px;
  cursor: pointer;
}

.form-sub button:hover {
  transform: scale(1.02);
  background-color: #3ba97b;
}

.form-sub button:active {
  transform: scale(0.98);
}

.error {
  padding: 5px 10px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: rgb(238, 74, 68);
  background-color: rgb(248, 222, 222);
}

</style>