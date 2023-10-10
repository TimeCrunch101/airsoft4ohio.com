<script setup>
import axios from 'axios'
import { ref, reactive } from 'vue';
import { useRouter } from "vue-router"
import { useAuthStore } from '../stores/auth';
import MFAEnroll from '../components/MFAEnroll.vue';
import Loading from '../components/Loading.vue';
const auth = useAuthStore()
const router = useRouter()

const loading = ref(false)
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
  enrollMFA,
  loading
})

const login = () => {
  set.loading = true
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
      auth.setUserInfo(res.data.username, res.data.email, res.data.token, null, res.data.isVendor)
      router.push("/")
    } else {
      alert("Something expected happened, please refresh and try again.")
    }
  }).catch((err) => {
    console.error(err)
    alert("Unsuccessful login attempt, please try again.")
  }).finally(() => {
    set.loading = false
  })
}

const verifyMFA = (totp) => {
  set.loading = true
  axios.post("/api/verify-mfa-enrollment",{
    username: form.value.username,
    password: form.value.password,
    testTotp: totp
  }).then((res) => {
    alert('MFA Successfully enrolled, redirecting to home page.')
    router.push("/")
  }).catch((err) => {
    alert(err.response.data)
  }).finally(() => {
    set.loading = false
  })
}

const forgotPassword = () => {
  router.push("/forgot-password")
}

</script>

<template>
  <Loading :loading="loading"/>
  <div class="container max">
    <div class="mb-3 d-flex gap-1">
      <router-link to="/register">Register</router-link>
      <span v-if="error.show" class="text-danger">{{ error.message }}</span>
    </div>
  
  <form @submit.prevent="login()">
    <label for="username" class="form-label">Username</label>
    <input class="form-control mb-2" type="text" name="username" id="username" v-model="form.username">
    <label for="password" class="form-label">Password</label>
    <input class="form-control mb-2" type="password" name="password" id="password" v-model="form.password">
    <input v-if="needSecondFactor" class="form-control mb-2" type="text" name="totp" id="totp" v-model="form.totp" placeholder="TOTP">
    <button class="btn btn-primary" type="submit">Login</button>
    <button @click="forgotPassword()" type="button" class="btn btn-outline-secondary m-1">Forgot Password</button>
  </form>
  
  <MFAEnroll v-if="enrollMFA.status" @verify-mfa="verifyMFA($event)" :userSecret="enrollMFA.userSecret" :qrcode="enrollMFA.qrcode"/>
  </div>

</template>


<style scoped>
.max {
  max-width: 50%;
}
#totp {
  max-width: 130px;
}

</style>
