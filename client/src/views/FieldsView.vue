<template>
<NavBar/>
    <div class="main-container">
        <h1>Fields</h1>
    </div>
<PageFooter/>
</template>
<script>
import NavBar from "@/components/NavBar.vue"
import PageFooter from "@/components/PageFooter.vue"
export default {
    name: 'FieldsView',
    components: {
        NavBar,
        PageFooter
    }
}
</script>
<style>
</style>