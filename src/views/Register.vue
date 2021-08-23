<template>
  <div class="form-main">
    <div class="form-sub">
      <h1>Create user</h1>
      <h3 v-if="message" class="error">{{ message.message }}</h3>
      <input :class="[validations[0].username ? 'validationTrue' : '']" v-model="username" class="form-input"
             placeholder="Username" type="text">
      <input :class="[validations[1].password ? 'validationTrue' : '']" v-model="password" class="form-input"
             placeholder="Password" type="password">
      <input :class="[validations[2].repeatPassword ? 'validationTrue' : '']" v-model="repeatPassword"
             class="form-input" placeholder="Repeat password" type="password">
      <div class="btnCon">
        <i v-if="registerAllowed" class="fas fa-check"></i>
        <button @click="registerFn">Submit</button>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: "Register",
  data: () => {
    return {
      username: '',
      password: '',
      repeatPassword: '',
      registerAllowed: false,
      validations: [
        {username: false},
        {password: false},
        {repeatPassword: false}
      ],
      message: undefined,
    }
  },
  methods: {
    registerFn() {
      if (this.registerAllowed) {
        const data = {
          username: this.username,
          password: this.password
        };
        fetch('http://localhost:3000/user/signUp', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data)
        })
            .then(response => response.json())
            .then(data => {
              this.message = data
              if (data.success !== false) {
                this.$router.push('/log-in')
              }
            })
            .catch((e) => {
              console.log('register error', e)
            })
      }
    }
  },
  watch: {
    username: function (username) {
      this.message = ''
      this.validations[0].username = username.length > 4 && username.length < 20;
    },
    password: function (password) {
      this.message = ''
      this.validations[1].password = password.length > 4 && password.length < 20;
    },
    repeatPassword: function (repeatPassword) {
      this.message = ''
      this.validations[2].repeatPassword = repeatPassword.length >= 5 && repeatPassword.length < 20 && this.password === this.repeatPassword;
    },
    validations: {
      deep: true,
      handler: function () {
        if (this.validations[0].username && this.validations[1].password && this.validations[2].repeatPassword)
          return this.registerAllowed = true
        else return this.registerAllowed = false
      }
    }
  }
}
</script>

<style scoped>

.fa-check {
  font-size: 35px;
  color: #42b983;
  margin-right: 10px;
}

.btnCon {
  display: flex;
  justify-content: center;
  align-items: center;
}

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

.validationTrue {
  background-color: #89ffc0;
}

</style>