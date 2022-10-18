<template>
<NavBar/>
<!-- <div class="main-container"> -->
        <!-- <div class="forum-post-wrapper"> -->
            <ForumPost/>
        <!-- </div> -->
<!-- </div> -->
<!-- <PageFooter/> -->

</template>
<script>
import NavBar from "@/components/NavBar.vue"
// import PageFooter from "@/components/PageFooter.vue"
import ForumPost from '../components/ForumPost.vue'

export default {
    name: 'ForumsView',
    components: {
        ForumPost,
        NavBar,
        // PageFooter
    }
}

</script>
<style scoped>

.forum-post-wrapper {
    width: 100%;
    height: 100%;
    
    padding: 3px;
}

</style>