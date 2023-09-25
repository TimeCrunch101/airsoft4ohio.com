<script setup>
import axios from 'axios'
import { ref, computed, reactive } from 'vue';
import { useRouter } from "vue-router"
import Loading from '../components/Loading.vue';

const router = useRouter()
const loading = ref(false)
const form = ref({
    username: null,
    email: null,
    password: null,
    confirmPassword: null,
})
const errorMessage = ref(null)
const set = reactive({
    errorMessage,
    loading
})


const validatePassword = computed(() => {
    if (form.value.password !== null) {
        if (form.value.password !== form.value.confirmPassword) {
            errorMessage.value = "Passwords do not match"
            return true
        } else {
            if (form.value.password.length < 8) {
                errorMessage.value = "Passwords must be at least 8"
                return true
            }
        }
        set.errorMessage = false
        return false
    }
})

const register = () => {
    if (!errorMessage.value) {
        set.loading = true
        axios.put("/api/register",{
            username: form.value.username,
            email: form.value.email,
            password: form.value.password,
        }).then((res) => {
            if (res.data.success) {
                alert("Account Created")
                router.push("/login")
            }
        }).catch((err) => {
            console.error(err.response.data.error)
            alert(err.response.data.error)
        }).finally(() => {
            set.loading = false
        })
    } else {
        alert("Fix your errors first")
    }
}







</script>




<template>
    <Loading :loading="loading"/>


<div class="container">
    <p><router-link to="/login">Login</router-link></p>
    <div class="row">
        <div class="col">
            <form @submit.prevent="register">
                <div class="mb-3">
                    <label for="username" class="form-label">Username</label>
                    <input class="form-control" type="text" name="username" id="username" v-model="form.username">
                </div>
                <div class="mb-3">
                    <label for="email" class="form-label">Email address</label>
                    <input class="form-control" type="email" name="email" id="email" aria-describedby="emailHelp" v-model="form.email">
                    <div id="emailHelp" class="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div class="mb-3">
                    <label for="password" class="form-label">Password</label>
                    <input type="password" class="form-control" id="password" name="password" v-model="form.password">
                </div>
                <div class="mb-3">
                    <label for="confirmPassword" class="form-label">Confirm Password</label>
                    <input type="password" class="form-control" id="confirmPassword" name="confirmPassword" v-model="form.confirmPassword">
                    <p class="text-danger" v-if="validatePassword">{{errorMessage}}</p>
                </div>
                <button type="submit" class="btn btn-primary">Register</button>
                <!-- <p class="text-danger" v-if="validation">{{valMessage}}</p> -->
            </form>
        </div>
    </div>
</div>
</template>

















<style scoped>

</style>