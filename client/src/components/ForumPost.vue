<script setup>
import axios from "axios"
import {ref} from "vue"

const posts = ref([])

const getPosts = () => {
    axios.get("/api/get/posts").then((res) => {
        posts.value = res.data.posts
    }).catch((err) => {
        console.error(err.response.data)
        alert(`${err.response.data.error}:
        ${err.response.data.cause}
        `)
    })
}

getPosts()

</script>

<template>


<div class="container mt-5 mb-5">
    <div class="row">
        <div class="col-1">
            <!-- LEFT BLANK -->
        </div>
        <div class="col max">
            <p>Forum</p>
        </div>
        <div class="col-3">
            <p>Last Post</p>
        </div>
        <div class="col-1">
            <p>Threads</p>
        </div>
        <div class="col-1">
            <p>Posts</p>
        </div>
    </div>



    <div class="row">
        <div class="col row-header">
            <h5>Info Section</h5>
        </div>
    </div>



    <div v-for="post in posts" class="row">
        <div class="col-1">
            <i class="bi bi-file-earmark-break fs-1"></i>
        </div>
        <div class="col max">
            <p>{{post.title}}</p>
            {{ post.postContent }}
        </div>
        <div class="col-3">
            <p>{{post.userID}}</p>
        </div>
        <div class="col-1">
            <p>1,440</p>
        </div>
        <div class="col-1">
            <p>9,733</p>
        </div>
    </div>
</div>
</template>


<style scoped>

p, h1, h2, h3, h4, h5, h6, h7, h8 {
    margin: 0;
    color: black;
}
.row {
    height: fit-content;
    background-color: var(--forum-l-green);
}
.container {
    /* background-color: rgb(240, 248, 255); */
    width: 55%;
    min-width: 1000px;
    
}
.col-1, .col-3, .col, max {
    border: 1px solid black;
}
.row-header {
    height: 3em;
    background-color: var(--forum-d-green);
}
</style>