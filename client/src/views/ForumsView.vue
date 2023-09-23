<script setup>
import axios from "axios"
import {ref} from "vue"

const posts = ref(null)

const getPosts = () => {
    axios.get("/api/get/posts", {
    }).then((res) => {
        posts.value = res.data.posts
    }).catch((err) => {
        alert('Could not fetch data')
    })
}

getPosts()

</script>
<template>
    <div class="d-flex flex-column">
        <router-link v-for="post in posts" :to="`/view/post/${post.postID}`">{{ post.title }}</router-link>
    </div>
</template>
<style scoped>
.flex-column{
    flex-direction: column;
}
</style>