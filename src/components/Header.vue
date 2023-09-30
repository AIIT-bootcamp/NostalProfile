<script setup lang="ts">
import { useRouter, useRoute } from "vue-router";
import { ref } from "vue";

const router = useRouter();
const route = useRoute();
const canGoBack = ref(window.history.length > 1);
const goBack = () => {
  router.go(-1);
};
</script>

<template>
  <div class="header">
    <button
      v-if="canGoBack && route.path !== '/'"
      class="back-button"
      @click="goBack"
    >
      戻る
    </button>
    <h1 class="header-title">前略プロフィール</h1>
  </div>
</template>

<style scoped>
.header {
  display: flex;
  align-items: center;
  padding: 1rem;
  background-color: #333;
  color: white;
}
.back-button {
  flex-shrink: 0; /* 戻るボタンのサイズは固定 */
}
.header-title {
  justify-content: center;
  margin: 0;
  flex-grow: 1;
  text-align: center;
}
.spacer {
  flex-shrink: 0; /* スペーサーのサイズは固定 */
  width: 80px; /* 戻るボタンと同じサイズにするための仮の値 */
}
</style>
