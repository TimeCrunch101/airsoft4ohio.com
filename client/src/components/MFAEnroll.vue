<script setup>
import {ref} from "vue";
defineProps({
    userSecret: String,
    qrcode: String,
})
const emit = defineEmits(["verify-mfa"])
// defineEmits(["verify-mfa"])

const testTotp = ref({
    totp: null,
})
const verifyMfa = () => {
    emit("verify-mfa",testTotp.value.totp)
}
</script>
<template>
<img :src="qrcode" :alt="userSecret">
<p>{{ userSecret }}</p>
<input type="text" name="testTotp" id="testTotp" v-model="testTotp.totp">
<button type="button" @click="verifyMfa()">Verify</button>

</template>