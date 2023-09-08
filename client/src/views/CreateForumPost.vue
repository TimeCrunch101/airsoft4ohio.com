<script setup>
import NavBar from "../components/NavBar.vue"
import {ref} from 'vue'

const value = ref(`
# This is a test
this is another test 'test'
`)

const clicked = () => {
    console.log(value.value)
}

const HTMLcode = (e) => {
    console.log(e)
}

</script>


<template>
    <NavBar/>
    <div class="container">
        <div class="mt-5">
            <mavon-editor @change="HTMLcode($event)" language="en" v-model="value" :html="true" :editable="false"/>
        </div>
        <button @click="clicked()" type="button" class="btn btn-sm btn-primary">Test</button>
    </div>
    <div class="testing" v-if="value !== null">
        {{ value }}
    </div>
</template>
<style scoped>
.testing {
    color: white;
}
</style>