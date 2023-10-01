<script setup lang="ts">
import Create from "../components/Profile/Create.vue";
</script>

<template>
  <div class="create-profile-page">
    <p></p>
    <Create />
  </div>
</template>

<style scoped>
.create-profile-page {
  background-color: #fdeef4;
  height: 95vh;

  display: flex;
  flex-direction: column;
  align-items: center;
  font-family: "Brush Script MT", cursive; /* ギャル風のフォントに変更 */
  background: linear-gradient(
    100deg,
    #fdeef4,
    #ffd2e8,
    #fbb1d1
  ); /* キラキラとした背景 */
  background-size: 600% 600%;
  animation: gradientAnimation 10s infinite;
}

@keyframes gradientAnimation {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}
</style>
