<script setup>
import axios from "axios"
import {ref, reactive, onMounted} from "vue"

const posts = ref(null)
const set = reactive({
    posts
})

const getPosts = () => {
    axios.get("/api/get/posts", {
    }).then((res) => {
        set.posts = res.data.posts
    }).catch((err) => {
        alert('Could not fetch data')
    })
}
getPosts()

</script>
<template>
    <div v-if="posts" class="container d-flex flex-column">
        <router-link v-for="post in posts" :to="`/view/post/${post.postID}`">{{ post.title }}</router-link>
    </div>
</template>
<style scoped>
.flex-column{
    flex-direction: column;
}
</style>