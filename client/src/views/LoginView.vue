<script setup>
import axios from 'axios'
import { ref } from 'vue';
import { useRouter } from "vue-router"
import { useAuthStore } from '../stores/auth';
const auth = useAuthStore()
const router = useRouter()

const form = ref({
    username: '',
    password: ''
})

const login = async () => {
    await axios.post('https://airsoft4ohio.com/api/login', {
        username: form.value.username,
        password: form.value.password
    }).then((res) => {
        console.log(res.data)
        if (res.data.success) {
            auth.setUserInfo(res.data.user)
            router.push('/')
        }
    }).catch((err) => {
        console.log(err.data)
    })
}



</script>

<template>
<div class="container">
    <div class="row">
        <div class="col">
            <div id="testing">
                Login to post in the Forums
            </div>
            <p><router-link to="/register">Register</router-link></p>
        </div>
        <div class="col">
            <form @submit.prevent="login">
                <div class="mb-3">
                    <label for="username" class="form-label">Username</label>
                    <input class="form-control" type="text" name="username" id="username" v-model="form.username">
                </div>
                <div class="mb-3">
                    <label for="password" class="form-label">Password</label>
                    <input type="password" class="form-control" id="password" name="password" v-model="form.password">
                </div>
                <!-- <div class="mb-3 form-check"> -->
                    <!-- <input type="checkbox" class="form-check-input" id="remember_me"> -->
                    <!-- <label class="form-check-label" for="remember_me">Remember Me</label> -->
                <!-- </div> -->
                <button type="submit" class="btn btn-primary">Login</button>
            </form>
            <div class="other-logins">
                <i class="bi bi-google"></i>
                <i class="bi bi-facebook"></i>
            </div>
        </div>
    </div>
</div>




</template>


<style scoped>
#testing {
    height: 500px;
    text-align: center;    
    line-height: 250px;
    vertical-align: middle;
    
}
a {
    text-decoration: none;
    color: black;
}

.container {   
    border-radius: 1em;
    margin-top: 10em;
    width: 900px;
    box-shadow: 0px 0px 5px white;
}


.col {
    height: 325px;
    background-color: whitesmoke;
}
.col:first-child {
    position: relative;
    border-right: 1px solid black;
    border-radius: 1em 0em 0em 1em; /* Top Left | Top Right | Bottom Right | Bottom Left */
}

.col:first-child>p:last-child {
    position: absolute;
    margin-bottom: 0;
    bottom: 5px;
    left: 5px;
    
}
.col:last-child {
    padding-top: 1em;
    border-radius: 0em 1em 1em 0em;
}
</style>
