<template>
  <div class="cont">
    <div class="container-register">
      <div class="image-register">
        <img src="../images/login.jpg" alt="Register Image" />
      </div>
      <div class="form-register">
        <h2>Create an Account</h2>
        <form @submit.prevent="registerUser">
          <div class="form-group">
            <label for="first_name">First Name</label>
            <input type="text" id="first_name" placeholder="First Name" v-model="state.first_name" />
          </div>
          <div class="form-group">
            <label for="last_name">Last Name</label>
            <input type="text" id="last_name" placeholder="Last Name" v-model="state.last_name" />
          </div>
          <div class="form-group">
            <label for="email">Email</label>
            <input type="text" id="email" placeholder="Email" v-model="state.email" />
            <span v-if="v$.email.$error">
              {{ v$.email.$errors[0].$message }}
            </span>
          </div>
          <div class="form-group">
            <label for="password">Password</label>
            <input type="password" id="password" placeholder="Password" v-model="state.password.password" />
            <span v-if="v$.password.password.$error">
              {{ v$.password.password.$errors[0].$message }}
            </span>
          </div>
          <div class="form-group">
            <label for="password_confirmation">Confirm Password</label>
            <input type="password" id="password_confirmation" placeholder="Confirm Password"
              v-model="state.password.password_confirmation" />
            <span v-if="v$.password.password_confirmation.$error">
              {{ v$.password.password_confirmation.$errors[0].$message }}
            </span>
          </div>
          <button @click="submitForm">Submit</button>
        </form>
      </div>
    </div>
  </div>
</template>

<style scoped>
.cont {
  background-color: rgb(243, 243, 243);
  height: 100vh;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.container-register {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 85vh;
  width: 60%;
  margin: 0 auto;
}

.image-register {
  width: 45%;
  height: 100%;
}

.image-register img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 8px 0 0 8px;
}

.form-register {
  border-radius: 0 8px 8px 0;
  width: 60%;
  height: 100%;
  background-color: white;
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
}

.form-register h2 {
  margin-bottom: 1rem;
}

label {
  margin-bottom: 0.5rem;
  text-align: start;
  margin-left: 7vh;
}

.form-group {
  display: flex;
  flex-direction: column;
  margin-bottom: 0.5rem;
}

input[type="text"],
input[type="password"] {
  border: none;
  border-radius: 4px;
  padding: 1rem;
  font-size: rem;
  background-color: white;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
  width: 80%;
  margin: auto;
  margin-bottom: 0.5rem;

}

input:focus {
  border: #e03ed7 solid 1px !important;
}

button {
  border: none;
  border-radius: 4px;
  padding: 1rem 3rem;
  font-size: 1rem;
  background-color: #e03ed7;
  color: white;
  cursor: pointer;
  transition: all 0.3s ease-in-out;
}

button:hover {
  background-color: #c02db5;
}

button:active {
  background-color: #a01c93;
}

span {
  color: red;
  font-size: 0.8rem;
  margin-top: 0.25rem;
}

@media screen and (max-width: 768px) {
  .container-register {
    flex-direction: column;
    height: 100%;
    width: 100%;
  }

  .image-register {
    width: 100%;
    height: 40%;
  }

  .form-register {
    width: 100%;
    height: 60%;
    border-radius: 8px;
  }

  .form-register h2 {
    margin-bottom: 1rem;
  }

  label {
    margin-bottom: 0.5rem;
    text-align: start;
    margin-left: 7vh;
  }

  .form-group {
    display: flex;
    flex-direction: column;
    margin-bottom: 0.5rem;
  }

  input[type="text"],
  input[type="password"] {
    border: none;
    border-radius: 4px;
    padding: 1rem;
    font-size: 1rem;
    background-color: white;
    box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
    width: 80%;
    margin: auto;
    margin-bottom: 0.5rem;
  }

  input:focus {
    border: #e03ed7 solid 1px !important;
  }

  button {
    border: none;
    border-radius: 4px;
    padding: 1rem 3rem;
    font-size: 1rem;
    background-color: #e03ed7;
    color: white;
    cursor: pointer;
    transition: all 0.3s ease-in-out;
  }

  button:hover {
    background-color: #c02db5;
  }

  button:active {
    background-color: #a01c93;
  }

  span {
    color: red;
    font-size: 0.8rem;
    margin-top: 0.25rem;
  }
}

@media screen and (max-width: 480px) {
  .container-register {
    flex-direction: column;
    height: 100%;
    width: 100%;
  }

  .image-register {
    width: 100%;
    height: 40%;
  }

  .form-register {
    width: 100%;
    height: 60%;
    border-radius: 8px;
  }

  .form-register h2 {
    margin-bottom: 1rem;
  }

  label {
    margin-bottom: 0.5rem;
    text-align: start;
    margin-left: 7vh;
  }

  .form-group {
    display: flex;
    flex-direction: column;
    margin-bottom: 0.5rem;
  }

  input[type="text"],
  input[type="password"] {
    border: none;
    border-radius: 4px;
    padding: 1rem;
    font-size: 1rem;
    background-color: white;
    box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
    width: 80%;
    margin: auto;
    margin-bottom: 0.5rem;
  }

  input:focus {
    border: #e03ed7 solid 1px !important;
  }

  button {
    border: none;
    border-radius: 4px;
    padding: 1rem 3rem;
    font-size: 1rem;
    background-color: #e03ed7;
    color: white;
    cursor: pointer;
    transition: all 0.3s ease-in-out;
  }

  button:hover {
    background-color: #c02db5;
  }

  button:active {
    background-color: #a01c93;
  }

  span {
    color: red;
    font-size: 0.8rem;
    margin-top: 0.25rem;
  }
}
</style>




<script>
import axios from 'axios'
import useValidate from '@vuelidate/core'
import { required, email, minLength, sameAs, helpers, } from '@vuelidate/validators'
import { reactive, computed } from 'vue'
export default {
  setup() {
    const state = reactive({
      first_name: '',
      last_name: '',
      email: '',
      password: {
        password: '',
        password_confirmation: '',
      },
    })
    const mustBeGmail = (value) => value.includes('gmail.com')
    const rules = computed(() => {
      return {
        first_name: { required, minLength: minLength(3) },
        last_name: { required, minLength: minLength(3) },
        email: {
          required,
          email,
          mustBeGmail: helpers.withMessage('Must be Gmail', mustBeGmail),
        },
        password: {
          password: { required, minLength: minLength(8) },
          password_confirmation: { required, sameAs: sameAs(state.password.password) },
        },
      }
    })
    const v$ = useValidate(rules, state)
    return { state, v$ }
  },
  methods: {
    submitForm() {
      this.v$.$validate().then((success) => {
        if (success) {
          axios.post('http://127.0.0.1:8000/api/register', {
            first_name: this.state.first_name,
            last_name: this.state.last_name,
            email: this.state.email,
            password: this.state.password.password,
            password_confirmation: this.state.password.password_confirmation,
          })
            .then(response => {
              console.log(response)
              this.$router.push("/login")
            })
            .catch(error => {
              console.log(error)
              // handle error
            })
        }
      })
    },
  },
}
</script>
