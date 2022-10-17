<template>
  <!-- <NavBar/> -->
  <!-- <div class="main-container"> -->
    <router-view/>
  <!-- </div> -->
  <!-- <PageFooter/> -->
</template>

<script>

// import NavBar from './components/NavBar.vue'
// import PageFooter from "./components/PageFooter.vue"

export default {
  name: 'App',
  
}

</script>

<style>

html, body {
    background-image: url(../src/assets/soldier.jpg);
    background-size: cover;
    background-repeat: repeat-y;
    background-attachment: fixed;
}

.main-container {
    background-color: hsla(0, 0%, 70%, 0.623);
    border-radius: .5em;
    width: 65%;
    margin: 2em auto;
    box-shadow: 0px 0px 15px whitesmoke;
    min-height: 100vh;
    max-height: fit-content;
}


</style>