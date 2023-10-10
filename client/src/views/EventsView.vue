<script setup>
import { useAuthStore } from "../stores/auth";
import FullCalendar from "@fullcalendar/vue3";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import timeGridPlugin from "@fullcalendar/timegrid";
import listPlugin from "@fullcalendar/list";
import { reactive, ref } from "vue";

const auth = useAuthStore()
const isVendor = ref(auth.isVendor)

const calendarOptions = ref({
  plugins: [dayGridPlugin, interactionPlugin, timeGridPlugin, listPlugin],
  initialView: "dayGridMonth",
  editable: false,
  headerToolbar: {
    start: "title",
    center: "",
    end: "today dayGridMonth,timeGridWeek,timeGridDay prevYear,prev,next,nextYear"
  },
  navLinks: true,
  events: []
});
const set = reactive({
  calendarOptions
})

// id: 3,
// title: "Meeting",
// start: "2023-10-27T07:00:00",
// end: "2023-10-27T08:00:00",
// eventResizableFromStart: true,
// eventDurationEditable: true


</script>
<template>
  <div class="container">
    <button v-if="isVendor" type="button" class="btn btn-primary">New Event</button>
    <FullCalendar :options="calendarOptions" />
  </div>
</template>
