<script setup>
import { useAuthStore } from "../stores/auth"
import { ref } from "vue";
import axios from "axios"
const auth = useAuthStore()
const token = ref(auth.getToken)
const title = ref('')
const content = ref(null)

const publishPost = () => {
    axios.put("/api/create-post", {
        postContent: content.value,
        title: title.value
    }, {
        headers: {
            Authorization: `Bearer ${token.value}`
        }
    }).then((res) => {
        alert(res.data.message)
    }).catch((err) => {
        alert(err.response.data.error)
    })
}

</script>
<template>
    <div class="container">
        <input class="form-control mb-3" type="text" name="title" id="title" placeholder="Title" style="max-width: 40%;"
            v-model="title">
        <QuillEditor theme="snow" v-model:content="content" contentType="html" :readOnly="false" />
        <button @click="publishPost()">SAVE</button>
    </div>

    <div class="container myContainer">
        <div id="carouselExampleIndicators" class="carousel slide">
            <div class="carousel-indicators">
                <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" class="active"
                    aria-current="true" aria-label="Slide 1"></button>
                <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1"
                    aria-label="Slide 2"></button>
                <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2"
                    aria-label="Slide 3"></button>
            </div>
            <div class="carousel-inner">
                <div class="carousel-item active">
                    <img src="/imgs/fields/overview.jpg" class="d-block w-100" alt="...">
                </div>
                <div class="carousel-item">
                    <img src="/imgs/fields/town.jpg" class="d-block w-100" alt="...">
                </div>
                <div class="carousel-item">
                    <img src="/imgs/fields/walloguns.jpg" class="d-block w-100" alt="...">
                </div>
            </div>
            <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators"
                data-bs-slide="prev">
                <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                <span class="visually-hidden">Previous</span>
            </button>
            <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators"
                data-bs-slide="next">
                <span class="carousel-control-next-icon" aria-hidden="true"></span>
                <span class="visually-hidden">Next</span>
            </button>
        </div>
    </div>
    
</template>
<style scoped>
.myContainer {
    max-width: 800px;
    max-height: 800px;
}
</style>