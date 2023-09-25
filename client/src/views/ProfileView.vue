<script setup>
import axios from "axios"
import { ref, reactive } from "vue"
import { useAuthStore } from "../stores/auth";
import Loading from "../components/Loading.vue";

const auth = useAuthStore()
const token = ref(auth.getToken)
const loading = ref(false) // TODO: Finish this
const user = ref(null)
const set = reactive({
    user,
    loading
})

const getUserProfile = () => {
    axios.get("/api/get/user-profile", {
        headers: {
            Authorization: `Bearer ${token.value}`
        }
    }).then((res) => {
        set.user = res.data.user
        console.log(res.data.user)
    }).catch((err) => {
        console.error(err.response.data)
        alert("Error getting data")
    }).finally(() => {
        set.loading = false
    })
}

getUserProfile()


</script>
<template>
<Loading :loading="loading"/>

<div v-if="user" class="container">
    <p>{{ user.username }}</p>
    <p>{{ user.email }}</p>
    




</div>


</template>
<style scoped>
</style>