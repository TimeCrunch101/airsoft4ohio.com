<template>
<NavBar/>
    
    <div class="fourm-container">
        <form @onsubmit.prevent="handleForm">            
            <input type="text" name="title" id="title" v-model="form.title" placeholder="Title">
            <!-- main body -->
            <div id="editor">
                <h1>Body</h1>
            </div>
        </form>
    </div>
</template>
<script setup>
import NavBar from "@/components/NavBar.vue"
import Quill from "quill/dist/quill.js"
import { onMounted, ref } from "vue";

onMounted(() => {
    new Quill("#editor", {
        theme: 'snow'
    })
})

const form = ref({
    title: '',
    body: ''
})

const handleForm = () => {

}

</script>
<style scoped>

.fourm-container {
    width: 700px;
    margin: 5em auto;
    background-color: hsla(0, 0%, 70%, 0.623);
}

#title {
    width: 100%;
    margin: 1em 0em;
}

</style>