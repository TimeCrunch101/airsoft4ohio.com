<script setup>
import {useAuthStore} from "../stores/auth"
import { ref } from "vue";
import axios from "axios"
const auth = useAuthStore()
const token = ref(auth.getToken)
const title = ref('')
const content = ref(null)

const publishPost = () => {
    axios.put("/api/create-post",{
        postContent: content.value,
        title: title.value
    },{
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
    <input type="text" name="title" id="title" placeholder="Title" v-model="title">
    <QuillEditor theme="snow" v-model:content="content" contentType="html" :readOnly="false"/>
    <button @click="publishPost()">SAVE</button>
</template>