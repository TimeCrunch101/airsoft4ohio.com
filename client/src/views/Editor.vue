<script setup>
import { ref } from "vue";
const content = ref(null)

const clicked = () => {
    console.log(content.value)
}

</script>
<template>
    <QuillEditor @change="clicked($event)" theme="snow" v-model:content="content" contentType="html"/>
    <button @click="clicked()">SAVE</button>
</template>