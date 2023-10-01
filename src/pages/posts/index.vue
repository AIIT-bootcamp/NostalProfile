<script setup lang="ts">
import { useRoute } from "vue-router";
import { collection, getDocs, query, where } from "firebase/firestore";
import { ref, onMounted } from "vue";
import { PROFILES_KEY, db } from "../../FirebaseConfig";

const route = useRoute();
const id = parseInt(route.params.id as string);
const data = ref({});

onMounted(async () => {
  try {
    const q = query(collection(db, PROFILES_KEY), where("id", "==", id));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      data.value = doc.data();
    });
  } catch (error) {
    console.error("Error fetching data:", error);
  }
});
</script>

<template>
  <div>
    <h2>Post</h2>
    <p>post content</p>
    {{ data ?? "データがありません" }}
  </div>
</template>

<style scoped></style>
