<script setup>
import axios from 'axios'
import { ref } from 'vue';
import { useRouter } from "vue-router"
import { useAuthStore } from '../stores/auth';
const auth = useAuthStore()
const router = useRouter()

const form = ref({
    username: null,
    password: null
})

const login = async () => {
    await axios.post('/api/login', {
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
    <router-link to="/register">Register</router-link>
    <form @submit.prevent="login">

            <label for="username" class="form-label">Username</label>
            <input class="form-control" type="text" name="username" id="username" v-model="form.username">

            <label for="password" class="form-label">Password</label>
            <input type="password" class="form-control" id="password" name="password" v-model="form.password">
        
        <button type="submit" class="btn btn-primary">Login</button>
    </form>
</div>




</template>


<style scoped>

</style>
