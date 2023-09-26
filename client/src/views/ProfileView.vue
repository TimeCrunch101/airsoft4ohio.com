<script setup>
import axios from "axios"
import { ref, reactive } from "vue"
import { useAuthStore } from "../stores/auth";
import Loading from "../components/Loading.vue";
import router from "../router";

const auth = useAuthStore()
const token = ref(auth.getToken)
const loading = ref(false)
const user = ref(null)
const testTotp = ref(null)
const mfaData = ref({
    secret: null,
    qrcode: null,
    username: auth.getUser
})
const set = reactive({
    user,
    loading,
    mfaData
})

const getUserProfile = () => {
    axios.get("/api/get/user-profile", {
        headers: {
            Authorization: `Bearer ${token.value}`
        }
    }).then((res) => {
        set.user = res.data.user
    }).catch((err) => {
        console.error(err.response.data)
        alert("Error getting data")
    }).finally(() => {
        set.loading = false
    })
}

const enrollMFA = () => {
    set.loading = true
    axios.get("/api/enroll-mfa", {
        headers: {
            Authorization: `Bearer ${token.value}`
        }
    }).then((res) => {
        set.mfaData.secret = res.data.secret
        set.mfaData.qrcode = res.data.qrcode
    }).catch((err) => {
        console.error(err.response.data)
    }).finally(() => {
        set.loading = false
    })
}

const validateTotp = () => {
    set.loading = true
    axios.post("/api/validate/mfa-enrollment", {
        testTotp: testTotp.value,
        username: user.value.username
    }, {
        headers: {
            Authorization: `Bearer ${token.value}`
        }
    }).then((res) => {
        if (confirm("Validation Successful, we recommend you log out now. Click OK to be redirected to the login screen.")) {
            if (res.status === 200) {
                axios.patch("/api/enforce/mfa",{},{
                    headers: {
                        Authorization: `Bearer ${token.value}`
                    }
                }).then(() => {
                    auth.logoutUser()
                    router.push("/login")
                    setTimeout(() => {
                        location.reload()
                    }, 300);
                })
            }
        }
    }).catch((err) => {
        console.error(err.response.data)
        alert("Could not validate TOTP, please try again")
    }).finally(() => {
        set.loading = false
    })

}

const disableMFA = () => {
    set.loading = true
    axios.patch("/api/disable/mfa", {}, {
        headers: {
            Authorization: `Bearer ${token.value}`
        }
    }).then((res) => {
        alert("MFA Disabled")
        getUserProfile()
    }).catch((err) => {
        console.error(err.response.data)
        alert("Could not disable MFA")
    }).finally(() => {
        set.loading = false
    })
}

const purgeAccount = () => {
    set.loading = true
    if (confirm("This action will delete your Airsoft4Ohio account and all it's related data. This action is irreversible, do you wish to continue?")) {
        axios.delete("/api/purge-account", {
            headers: {
                Authorization: `Bearer ${token.value}`
            }
        }).then((res) => {
            if (res.status === 201) alert("ACCOUNT DELETED")
        }).catch((err) => {
            console.error(err.response.data)
            alert("An error occurred, please try again later.")
        }).finally(() => {
            auth.logoutUser()
            router.push("/")
            set.loading = false
            location.reload()
        })
    }
}

getUserProfile()


</script>
<template>
<Loading :loading="loading"/>

<div v-if="user" class="container">
    <p>{{ user.username }}</p>
    <p>{{ user.email }}</p>
    <button class="btn btn-outline-success" v-if="user.mfa_enforced !== 1" @click="enrollMFA()">Enroll MFA</button>
    <button class="btn btn-outline-danger" @click="disableMFA()" v-else>Disable MFA</button>
    <div v-if="mfaData.qrcode">
        <img :src="mfaData.qrcode" alt="QRCODE">
        <p>{{ mfaData.secret }}</p>
        <input type="text" name="totp" id="totp" v-model="testTotp">
        <button @click="validateTotp()">Submit TOTP Validation</button>
    </div>
    <br>
    <button type="button" class="btn btn-danger m-3" @click="purgeAccount()">PURGE ACCOUNT</button>
</div>


</template>
<style scoped>
</style>