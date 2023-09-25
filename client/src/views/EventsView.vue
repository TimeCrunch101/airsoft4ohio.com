<script setup>
import FullCalendar from "@fullcalendar/vue3";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import timeGridPlugin from "@fullcalendar/timegrid";
import listPlugin from "@fullcalendar/list";
import { ref } from "vue";

const calendarOptions = ref({
  plugins: [dayGridPlugin, interactionPlugin, timeGridPlugin, listPlugin],
  initialView: "dayGridMonth",
  editable: true,
  headerToolbar: {
    start: "title",
    center: "",
    end: "today dayGridMonth,timeGridWeek,timeGridDay prevYear,prev,next,nextYear"
  },
  navLinks: true,
  events: [
    {
      id: 1,
      title: "Meeting",
      start: "2023-09-22T14:30:00",
      eventResizableFromStart: true,
      eventDurationEditable: true
    },
    {
      id: 2,
      title: "Birthday Party",
      start: "2023-09-24T07:00:00",
      eventResizableFromStart: true,
      eventDurationEditable: true
    },
  ],
});

</script>
<template>
  <div class="container">
    <FullCalendar :options="calendarOptions" />
  </div>
</template>
