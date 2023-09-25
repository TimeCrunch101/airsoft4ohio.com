<script setup>
import { ref, reactive } from "vue"
import axios from "axios"
import {useRoute} from "vue-router"
import Loading from "../components/Loading.vue";

const post = ref(null)
const loading = ref(true)
const route = useRoute()
const set = reactive({
    post,
    loading
})

const getPost = () => {
    axios.get(`/api/get/post/${route.params.postID}`).then((res) => {
        set.post = res.data.post
        const div = document.getElementById("content")
        div.innerHTML = post.value.postContent
        set.loading = false
    }).catch((err) => {
        console.error(err.response.data.error)
        console.error(err.response.data.cause)
        alert("Could not fetch post")
    })
}

getPost()

</script>
<template>
<Loading :loading="loading"/>
<p v-if="post">{{ post.title }}</p>
<div id="content" class="container">

</div>
</template>