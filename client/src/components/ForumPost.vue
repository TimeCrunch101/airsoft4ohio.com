<template>

    <div class="forum-post">
        <img class="forum-img" src="../assets/face.png" alt="">
        <div class="forum-body">
            <div class="forum-text">
                <h4>Some Post About Airsoft</h4>
                <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Autem odit nobis illum. Vel, modi voluptatum dolores aut pariatur rerum! Voluptates nemo architecto praesentium veritatis quisquam atque sed ab, rerum excepturi?</p>
            </div>
            <div class="forum-footer">
                <ul class="forum-footer-list">
                    <li>like</li>
                    <li>follow</li>
                    <li>post</li>
                    <li>view</li>
                </ul>
            </div>
        </div>
    </div>
    <div class="forum-post">
        <img class="forum-img" src="../assets/face.png" alt="">
        <div class="forum-body">
            <div class="forum-text">
                <h4>Some Post About Airsoft</h4>
                <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Autem odit nobis illum. Vel, modi voluptatum dolores aut pariatur rerum! Voluptates nemo architecto praesentium veritatis quisquam atque sed ab, rerum excepturi?</p>
            </div>
            <div class="forum-footer">
                <ul class="forum-footer-list">
                    <li>like</li>
                    <li>follow</li>
                    <li>post</li>
                    <li>view</li>
                </ul>
            </div>
        </div>
    </div>

</template>
<script>

export default {
    name: 'ForumPost'
}

</script>
<style scoped>

.forum-post {
    width: 75%;
    height: 8em;
    border: 2px solid hsl(183, 68%, 11%);
    border-radius: 0.5em;
    margin-bottom: 2em;
    display: flex;
}

.forum-body {
    max-width: 100%;
    margin-left: 1em;
    
}

.forum-img-wrapper {
    border: 1px solid pink;
}


.forum-img {
    
    width: 7em;
    height: 7em;
    border: 1px solid purple;
    border-radius: 50%;
    /* float: left; */

}

.forum-footer-list{
    display: flex;
    list-style: none;
    gap: 0.5em;
    margin: 0;
    padding: 0;
}

.forum-footer-list>li {
    color: aquamarine;
}

.forum-footer-list>li:hover {
    cursor: pointer;
}

</style>