<script setup>
import axios from 'axios';
import {useRouter} from "vue-router";
import { ref, reactive } from "vue";
import Loading from '../components/Loading.vue';

const form = ref({
    email: null,
})
const loading = ref(false)
const router = useRouter()
const set = reactive({
    loading
})

const submitEmail = () => {
    set.loading = true;
    axios.post("/api/forgot-password", {
        email: form.value.email
    }).then((res) => {
        if (res.status === 200) {
            setTimeout(() => {
                router.push("/login")
            }, 500);
        }
    }).catch((err) => {
        console.error(err.response.data)
        alert("Could not post email")
    }).finally(() => {
        set.loading = false
    })
}

</script>
<template>
    <Loading :loading="loading"/>

<div class="container">
    <form @submit.prevent="submitEmail()">
        <label class="form-label" for="email">Email</label>
        <input type="text" name="email" id="email" class="form-control" v-model="form.email">  
        <button type="submit" class="btn btn-primary m-1">Submit</button>
    </form>
</div>

</template>
<style scoped>
</style>