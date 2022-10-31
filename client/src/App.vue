
<template>
  <RouterView />
</template>
<script setup>
// import "./socketServer/client"
import {useAuthStore} from "./stores/auth.js"
const auth = useAuthStore()

</script>

<style scoped>

</style>
