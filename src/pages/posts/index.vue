<script setup lang="ts">
import { useRoute } from "vue-router";
const route = useRoute();
const id = parseInt(route.params.id);
</script>

<template>
  <div>
    <h2>Post</h2>
    <p>post content</p>
  </div>
</template>

<style scoped></style>
