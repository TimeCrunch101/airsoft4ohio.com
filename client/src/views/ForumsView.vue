<script setup>
import axios from "axios"
import {ref, reactive} from "vue"
import Loading from "../components/Loading.vue";

const posts = ref(null)
const loading = ref(true)
const set = reactive({
    posts,
    loading
})

const getPosts = () => {
    axios.get("/api/get/posts", {
    }).then((res) => {
        set.posts = res.data.posts
        set.loading = false
    }).catch((err) => {
        alert('Could not fetch data')
    })
}
getPosts()

</script>
<template>
<Loading :loading="loading"/>
    <div v-if="posts" class="container d-flex flex-column">
        <router-link v-for="post in posts" :to="`/view/post/${post.postID}`">{{ post.title }}</router-link>
    </div>
</template>
<style scoped>
.flex-column{
    flex-direction: column;
}
</style>