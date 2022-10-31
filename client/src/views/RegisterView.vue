<script setup>
import axios from 'axios'
import { ref, computed } from 'vue';
import { useRouter } from "vue-router"
const router = useRouter()


const form = ref({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
})
const err = ref(false)
const valMessage = ref(false)

const showErr = computed(() => {
    if (form.value.password !== form.value.confirmPassword) {
        err.value = "Passwords don't match..."
        return true
    } else {
        if (form.value.password.length < 8 && form.value.password.length !== 0) {
            err.value = 'Please user a longer password'
            return true
        }
        err.value = false
        return false
    }
})

const validation = computed(() => {
    if (valMessage.value) {
        return true
    }
})

const register = async () => {
    if (!err.value) {
        await axios.post('http://airsoft4ohio.com:5050/api/create/user', {
            username: form.value.username,
            email: form.value.email,
            password: form.value.password
        }).then((res) => {
            if (!res.data.success) valMessage.value = res.data.message
            if (res.data.success) router.push('/login')
        }).catch((err) => {
            console.error(err)
        })
    } else {
        console.log("Could not submit")
    }

}




</script>




<template>


<div class="container">
    <div class="row">
        <div class="col">
            <div id="testing">
                Register to post in the Forums
            </div>
            <p><router-link to="/login">Login</router-link></p>
        </div>
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
                    <p class="text-danger" v-if="showErr">{{err}}</p>
                </div>
                <button type="submit" class="btn btn-primary">Register</button>
                <p class="text-danger" v-if="validation">{{valMessage}}</p>
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
    height: 100%;
    text-align: center;
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