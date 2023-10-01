<script setup lang="ts">
import { ref } from "vue";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../FirebaseConfig";

const data = ref();
const isLoading = ref(false);
const error = ref();

const getNostalProfile = async () => {
  isLoading.value = true;
  try {
    const c = collection(db, "nostal-profiles");
    const s = await getDocs(c);
    data.value = s.docs.map((doc: any) => doc.data());
  } catch (e) {
    error.value = e;
  } finally {
    isLoading.value = false;
  }
};
getNostalProfile();
</script>

<template>
  <div>
    <h1>About</h1>
    <p>About page content</p>
  </div>
</template>

<style scoped></style>
