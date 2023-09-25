<script setup>
defineProps({
  loading: Boolean,
});
</script>
<template>
  <div v-if="loading" class="loading">
    <div class="spinner-border text-light" role="status">
      <span class="visually-hidden">Loading...</span>
    </div>
  </div>
</template>
<style scoped>
.loading {
  position: absolute;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.082);
}

.spinner-border {
    position: relative;
    top: 50%;
    left: 50%;
}

</style>
