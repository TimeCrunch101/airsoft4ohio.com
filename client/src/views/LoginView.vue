<script setup>
import axios from 'axios'
import { ref, reactive } from 'vue';
import { useRouter } from "vue-router"
import { useAuthStore } from '../stores/auth';
import MFAEnroll from '../components/MFAEnroll.vue';
const auth = useAuthStore()
const router = useRouter()

const form = ref({
  username: null,
  password: null,
  totp: null,
})
const error = ref({
  show: false,
  message: null,
})
const needSecondFactor = ref(false)
const enrollMFA = ref({
  status: false,
  userSecret: null,
  qrcode: null,
})
const set = reactive({
  needSecondFactor,
  error,
  enrollMFA
})

const login = () => {
  axios.post("/api/login",{
    username: form.value.username,
    password: form.value.password,
    totp: form.value.totp,
  }).then((res) => {
    if (res.data.firstFactor) {
      set.needSecondFactor = true
    } else if (res.data.mfaEnrollment) {
      set.enrollMFA.userSecret = res.data.userSecret
      set.enrollMFA.qrcode = res.data.qrcode
      set.enrollMFA.status = true
    } else if (res.data.success) {
      console.log(res.data)
      auth.setUserInfo(res.data.username, res.data.email, res.data.token, null)
      router.push("/")
    } else {
      alert("Something expected happened, please refresh and try again.")
    }
  }).catch((err) => {
    alert(err.response.data)
  })
}

const verifyMFA = (totp) => {
  axios.post("/api/verify-mfa-enrollment",{
    username: form.value.username,
    password: form.value.password,
    testTotp: totp
  }).then((res) => {
    alert('MFA Successfully enrolled, redirecting to home page.')
    router.push("/")
  }).catch((err) => {
    alert(err.response.data)
  })
}

</script>

<template>
  <p v-if="error.show" class="danger">{{ error.message }}</p>

<form @submit.prevent="login()">
  <input type="text" name="username" id="username" v-model="form.username" placeholder="username">
  <input type="password" name="password" id="password" v-model="form.password" placeholder="password">
  <input v-if="needSecondFactor" type="text" name="totp" id="totp" v-model="form.totp" placeholder="TOTP">
  <button type="submit">Login</button>
</form>

<MFAEnroll v-if="enrollMFA.status" @verify-mfa="verifyMFA($event)" :userSecret="enrollMFA.userSecret" :qrcode="enrollMFA.qrcode"/>

</template>


<style scoped>

</style>
