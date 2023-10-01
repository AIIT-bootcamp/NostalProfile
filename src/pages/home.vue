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
  <div class="center-container">
    <div class="title">
      <img
        class="image-inline"
        v-for="n in 3"
        :key="n"
        src="src/assets/images/kirakira_star.gif"
        alt="star"
      >
      メニュー
      <img
        class="image-inline"
        v-for="n in 3"
        :key="n"
        src="src/assets/images/kirakira_star.gif"
        alt="star"
      >
    </div>
    <div class="title">
      <img class="image-inline" src="src/assets/images/shooting_star.gif">
        はじめての方
      <img class="image-inline" src="src/assets/images/shooting_star.gif">
    </div>
    <router-link to="/new">プロフを作る</router-link>
    <div class="title">
      <div class="marquee">
        <div class="marquee-content">
          ＼＼＼ ﾅ ｶ ﾏ をさがす ／／／
        </div>
      </div>
    </div>
    <div class="title">
      <img
        class="image-inline"
        v-for="n in 8"
        :key="n"
        src="src/assets/images/lovely_heart.gif"
        alt="star"
      >
    </div>
    <div v-for="item in dataAry">
      <router-link :to="`/posts/${item.id}`">{{ item.username }}</router-link>
    </div>
    <div class="title">
      <img
        class="image-inline"
        v-for="n in 8"
        :key="n"
        src="src/assets/images/lovely_heart.gif"
        alt="star"
      >
    </div>
  </div>
</template>

<style scoped>
  .center-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: #ff66b2;
  }
  .title {
    margin-top: 20px;
    margin-bottom: 20px;
  }
  .image-inline {
    display: inline-block;
    vertical-align: middle;
  }

  .marquee {
    overflow: hidden;
    white-space: nowrap;
  }
  
  .marquee-content {
    display: inline-block;
    padding-left: 100%;
    animation: marquee 5s linear infinite;
  }

  @keyframes marquee {
    0% {
      transform: translate(0, 0);
    }
    100% {
      transform: translate(-100%, 0);
    }
  }
</style>
