<template>
<NavBar/>
    <div class="main-container">
        <h1>Create Post</h1>
        <div id="editor">
            <p>Hello World!</p>
            <p>Some initial <strong>bold</strong> text</p>
            <p><br></p>
        </div>
    </div>
<PageFooter/>
</template>
<script setup>
import NavBar from "@/components/NavBar.vue"
import PageFooter from "@/components/PageFooter.vue"
import Quill from "quill/dist/quill.js"
import { onMounted } from "vue";

onMounted(() => {
    new Quill("#editor", {
        theme: 'snow'
    })
})

</script>
<style>

</style>