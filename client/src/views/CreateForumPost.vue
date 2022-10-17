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
<script>
import NavBar from "@/components/NavBar.vue"
import PageFooter from "@/components/PageFooter.vue"

import Quill from "quill/dist/quill.js"


export default {
    name: 'CreateForumPost',
    components: {
        NavBar,
        PageFooter
    },
    mounted() {
        // eslint-disable-next-line no-unused-vars
        var quill = new Quill("#editor", {
          theme: 'snow'
        });
    }
}
</script>
<style>

</style>