<script setup>
import {useRoute, useRouter} from "vue-router";
import Loading from "../components/Loading.vue";
import axios from "axios";
import { ref, reactive } from "vue";

const loading = ref(false)
const router = useRouter()
const route = useRoute()
const form = ref({
    password: null,
})
const set = reactive({
    loading,
})

const resetPassword = () => {
    set.loading = true
    axios.post("/api/reset-password", {
        password: form.value.password,
        resetToken: route.params.resetToken
    }).then((res) => {
        router.push("/login")
    }).catch((err) => {
        alert(err.response.data.error)
    }).finally(() => {
        set.loading = false
    })
}

</script>
<template>
<Loading :loading="loading"/>
<div class="container">
    <form @submit.prevent="resetPassword()">
        <label for="Password" class="form-label">Password</label>
        <input type="password" name="password" id="password" class="form-control" v-model="form.password">
        <button type="submit" class="btn btn-primary">Reset</button>
    </form>
</div>
</template>
<style scoped>
</style>