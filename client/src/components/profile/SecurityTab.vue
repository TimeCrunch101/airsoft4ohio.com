<script setup>
import { ref } from "vue";
import axios from "axios";

const newPassword = ref(null)
const emit = defineEmits(['loading-toggle'])
const props = defineProps({
    token: String,
    userID: String
})

const setNewPassword = () => {
    emit("loading-toggle", true)
    if (confirm("Are you sure you want to reset your password?")) {
        axios.patch("/api/set-new/password", {
            password: newPassword.value,
            uuid: props.userID,
            newPass: true
        }, {
            headers: {
                Authorization: `Bearer ${props.token}`
            }
        }).then((res) => {
            alert("Your password has been reset")
            location.reload()
        }).catch((err) => {
            alert(err.response.data.error)
        }).finally(() => {
            emit("loading-toggle", false)
        })
    }
}

</script>
<template>

<div class="container">
    <input type="password" name="newPassword" id="newPassword" class="form-control" v-model="newPassword" placeholder="New Password...">
    <button @click="setNewPassword()" type="button" class="btn btn-outline-primary">Reset Password</button>
</div>

</template>
<style scoped>
#newPassword {
    max-width: 40%;
}

</style>