<template>
    <NavBar/>
    <div class="main-container">
        <div>
            <h1>WORK IN PROGRESS</h1>
            <p>Want to assist? This project is available on <a target="_blank" href="https://github.com/TimeCrunch101/airsoft4ohio.com">GitHub</a><i class="bi bi-github fs-4"></i></p>
        </div>
        <ToastCom/>
    </div>
    <PageFooter/>
</template>

<script>
import PageFooter from "../components/PageFooter.vue"
import ToastCom from "@/components/ToastCom.vue"
import NavBar from "@/components/NavBar.vue"
export default {
    name: 'HomeView',
    components: {
        ToastCom,
        PageFooter,
        NavBar,
    }
}
</script>

<style scoped>
div {
    text-align: center;   
}
a {
    font-weight: bold;
    color: aquamarine;
}
</style>