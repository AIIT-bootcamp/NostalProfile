<script setup lang="ts">
import { collection, getDocs } from "firebase/firestore";
import { ref, onMounted } from "vue";
import { PROFILES_KEY, db } from "../FirebaseConfig";
import { Profile } from "@/entities/index";

const dataAry = ref<Profile[]>([]);
const c = collection(db, PROFILES_KEY);
onMounted(async () => {
  try {
    const querySnapshot = await getDocs(c);
    querySnapshot.forEach((doc) => {
      dataAry.value.push(doc.data() as Profile);
    });
  } catch (error) {
    console.error("Error fetching data:", error);
  }
});
</script>

<template>
  <div>
    <router-link to="/new">プロフを作る</router-link>
    <div v-for="item in dataAry">
      <router-link :to="`/posts/${item.id}`">{{ item.username }}</router-link>
    </div>
  </div>
</template>

<style scoped></style>
