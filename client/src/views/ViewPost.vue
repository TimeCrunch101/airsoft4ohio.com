<script setup>
import { ref, reactive } from "vue"
import axios from "axios"
import {useRoute} from "vue-router"

const post = ref(null)
const route = useRoute()
const set = reactive({
    post
})

const getPost = () => {
    axios.get(`/api/get/post/${route.params.postID}`).then((res) => {
        set.post = res.data.post
        const div = document.getElementById("content")
        div.innerHTML = post.value.postContent
    }).catch((err) => {
        alert("Could not fetch post")
    })
}

getPost()

</script>
<template>
<p v-if="post">{{ post.title }}</p>
<div id="content" class="container">

</div>
</template>