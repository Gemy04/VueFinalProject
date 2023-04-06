<template>
    <div class="cont">
        <div class="container">
            <div class="image">
                <img src="../../images/login.jpg" alt="Login Image" />
            </div>
            <div class="form">
                <h2>Login</h2>
                <form @submit.prevent="registerUser">
                    <div class="form-group">
                        <label for="email">Email</label>
                        <input type="text" placeholder="Email" v-model="state.email" />
                        <span v-if="v$?.email?.$error">
                            {{ v$?.email?.$errors[0].$message }}
                        </span>
                    </div>
                    <div class="form-group">
                        <label for="password">Password</label>
                        <input type="password" placeholder="Password" v-model="state.password.password" />
                        <span v-if="v$?.password?.password?.$error">
                            {{ v$?.password?.password?.$errors[0].$message }}
                        </span>
                    </div>
                    <div class="remember">
                        <label for="remember" class="rem">
                            <input id="remember" type="checkbox" v-model="state.remember" /> Remember me
                        </label>
                        <router-link to="Forgotpassword" class="link">Forgot password?</router-link>
                    </div>
                    <button @click="submitForm">Log in</button>
                    <span v-if="v$?.$dirty">
                        <span v-if="errorResponse">{{ errorResponse }}</span>
                    </span>
                </form>
            </div>
        </div>
    </div>
</template>
  
  
<script>
import axios from "axios";
import { useVuelidate } from "@vuelidate/core";
import { required, email, minLength, helpers } from "@vuelidate/validators";
import { reactive, computed } from "vue";
import { useRouter } from 'vue-router';

export default {
    setup() {
        const state = reactive({
            email: "",
            password: {
                password: "",
            },
            
        });

        const mustBeGmail = (value) => value.includes("gmail.com");

        const rules = computed(() => {
            return {
                email: {
                    required,
                    email,
                    mustBeGmail: helpers.withMessage("Must be Gmail", mustBeGmail),
                },
                password: {
                    password: { required, minLength: minLength(8) },
                },
            };
        });

        const v$ = useVuelidate(rules, state);

        const router = useRouter();

        return { state, v$, router };
    },
    data() {
        return {
            errorResponse: "",
        };
    },
    methods: {
        async submitForm() {
            try {
                const success = await this.v$.$validate();
                if (success) {
                    const response = await axios.post(
                        "http://127.0.0.1:8000/api/login",
                        {
                            email: this.state.email,
                            password: this.state.password.password,
                        }
                    );
                    console.log(response);
                    if (response.data.token) {
                        document.cookie = `token=${response.data.token || "" }; path=/; expires=${new Date(
                            new Date().getTime() + 60 * 60 * 48 * 1000
                        )}`;
                        document.cookie = `user=${JSON.stringify(response.data.user) || "" }; path=/; expires=${new Date(
                            new Date().getTime() + 60 * 60 * 48 * 1000
                        )}`;
                        this.router.push({ name: 'home' }); // redirect to home
                    }
                }
            } catch (error) {
                if (error.response.status === 401) {
                    this.v$.$touch();
                    this.errorResponse = "Invalid email or password";
                } else {
                    // handle other errors
                }
            }
        },
    },
};
</script>
<style scoped>
.cont {
    background-color: rgb(243, 243, 243);
    height: 100vh;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;

}


.container {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 70vh;
    width: 60%;
    margin: 0 auto;
}

.form-group label {
    margin-bottom: 0.5rem;
    font-size: 1rem;
    color: #333;
    font-weight: 500;
    text-align: start;
    margin-left: 7vh;
}

.image {
    width: 45%;
    height: 100%;
}

.image img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 8px 0 0 8px;

}

form {
    background-color: white;

}

.form {
    border-radius: 0 8px 8px 0;
    width: 55%;
    height: 100%;
    background-color: white;
    display: flex;
    flex-direction: column;
    justify-content: center;
    text-align: center;


}

.form h2 {
    margin-bottom: 1rem;
    background-color: white;

}

.form-group {
    display: flex;
    flex-direction: column;
    margin-bottom: 1rem;
    background-color: white;


}

input[type="text"],
input[type="password"] {
    border: none;
    border-radius: 4px;
    padding: 1rem;
    font-size: 1rem;
    background-color: white;
    box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
    margin-bottom: 0.5rem;
    width: 80%;
    margin: 0 auto;
}

.remember {
    display: flex;
    justify-content: space-between;
    color: #e03ed7;
    width: 80%;
    margin: auto;
    margin-bottom: 1rem;

}

.remember label {
    display: flex;
    color: #e03ed7;
    font-size: 1rem;
    font-weight: 500;
    cursor: pointer;
    width: 50%;
    text-align: start;
    align-items: center;

}
.rem input{
    justify-content: flex-start;
    accent-color: #e03ed7;

}

.link {
    color: #adadad;
    text-decoration: none;
    width: 50%;
    text-align: end;
}

input:focus {
    border: #e03ed7 solid 1px !important;
}

button {
    border: none;
    border-radius: 4px;
    padding: 0.5rem 1rem;
    font-size: 1rem;
    background-color: #e03ed7;
    color: #fff;
    cursor: pointer;
    width: 80%;
    height: 3rem;
    margin-top: 0.8rem;


}

button:hover {
    background-color: #c236bb;
}

span {
    color: red;
    font-size: 0.8rem;
    margin-top: 0.25rem;

}
</style>