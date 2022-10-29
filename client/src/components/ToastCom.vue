<template>


<button v-on:click="triggerToast" type="button" class="btn btn-primary" id="liveToastBtn">Show live toast</button>
<div class="toast-container position-fixed bottom-0 end-0 p-3">
  <div id="liveToast" class="toast" role="alert" aria-live="assertive" aria-atomic="true">
    <div class="toast-header">
      <strong class="me-auto">Alert From Server</strong>
      <small>Just Now</small>
      <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
    </div>
    <div class="toast-body">
      This is a notification
    </div>
  </div>
</div>


</template>

<script setup>

import bootstrap from 'bootstrap/dist/js/bootstrap.js'
const triggerToast = () => {
    const toastLiveExample = document.getElementById('liveToast')
    const toast = new bootstrap.Toast(toastLiveExample)
    toast.show()
  }
</script>