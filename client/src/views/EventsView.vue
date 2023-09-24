<script setup>
import FullCalendar from '@fullcalendar/vue3'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from '@fullcalendar/interaction'
import {ref} from "vue";

const calendarOptions = ref({
    plugins: [dayGridPlugin,interactionPlugin],
    initialView: "dayGridMonth",
    events: [
        {
            id: 1,
            title: "Event 1",
            date: "2023-09-15"
        },
        {
            id: 2,
            title: "Event 2",
            date: "2023-09-23"
        }
    ]
})



// export default {
//   components: {
//     FullCalendar // make the <FullCalendar> tag available
//   },
//   data() {
//     return {
//       calendarOptions: {
//         plugins: [ dayGridPlugin, interactionPlugin ],
//         initialView: 'dayGridMonth'
//       }
//     }
//   }
// }
</script>
<template>
    <div class="container">
        <FullCalendar :options="calendarOptions"/>
    </div>
</template>