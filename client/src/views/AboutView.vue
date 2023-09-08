<template>
    <NavBar/>
    <div class="main-container">
        <h1>About</h1>
        <div>
            <p>This is a website that allows the good folks of Ohio to gather and talk all things Airsoft.</p>
            <p>Some things this site aims to do:</p>
            <ul>
                <div class="about-items">
                    <li>Provide a forum for Airsofters in Ohio</li>
                    <li>Plan &#38; Schedule Events</li>
                    <li>RSVP for events</li>
                    <li>View information about Airsoft fields in Ohio</li>
                    <li>Allow users to list Airsoft gear for sell. Payment processing and transactions will be handled by the users, this site will not process any form of payment.</li>
                    <li>Hook into Discord, webhooks to post notifications about event's, also allow users to RSVP from Discord</li>
                    <li>Real time chat</li>
                </div>
            </ul>
            <p>Main technologies this project uses:</p>
            <ul>
                <li><a target="_blank" href="https://nodejs.org/en/">Node JS</a>: Server side Runtime environment for JavaScript</li>
                <li><a target="_blank" href="https://expressjs.com/">Express</a>: Framework used to build out the API</li>
                <li><a target="_blank" href="https://vuejs.org/">Vue JS</a>: Frontend JavaScript Framework</li>
                <li><a target="_blank" href="https://www.mysql.com/">MySQL</a>: Backend Database</li>
            </ul>
            <p>Other Libraries / Frameworks:</p>
            <ul>
                <li><a target="_blank" href="https://getbootstrap.com/">Bootstrap</a>: Easy to use CSS Framework</li>
                
                <li><a target="_blank" href="https://www.passportjs.org/">Passport JS</a>: Authentication Middleware</li>
                <li><a target="_blank" href="https://socket.io/">Socket IO</a>: Enables bi-directional client/server communication for real time updates/notifications (WebSockets)</li>
            </ul>
        </div>
    </div>
    <PageFooter/>
</template>

<script setup>
import NavBar from "@/components/NavBar.vue"
import PageFooter from "@/components/PageFooter.vue"

</script>

<style scoped>
.about-items>li {
    font-weight: var(--fw-lg);
    font-size: var(--fs-lg);
}
a {
    font-weight: bold;
    color: aquamarine;
}
</style>
  