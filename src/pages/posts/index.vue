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
    console.error("エラーが発生しました:", error);
  }
});
</script>

<template>
  <div class="post">
    <dl>
      <template v-for="item in data.profileFields">
        <div class="profile-item">
          <h2>{{ item.label }}</h2>
          <p>{{ item.value }}</p>
        </div>
      </template>
    </dl>
  </div>
</template>

<style scoped>
.post {
  background-color: #ff66b2;
}

.profile-item {
  margin-bottom: 20px;
  padding-bottom: 10px;
}

h2 {
  font-size: 18px; /* ラベルを大きくしてみたよ！👑 */
  color: #cd4187; /* ピンク色でアピール！💖 */
  margin-bottom: 5px;
  background-color: #ffcccb; /* h2の背景色を追加してみたよ！💫 */
  display: block; /* 背景色を横いっぱいに広げるために display を block に変更！ */
  padding: 5px 0; /* 上下の余白を調整してみたよ！ */
  font-family: "Brush Script MT", cursive;
}

p {
  font-size: 16px; /* 値のフォントサイズも調整してみたよ！✨ */
  color: #ffffff;
  font-family: "Brush Script MT", cursive;
}

dl {
  padding: 5% 40%;
}
</style>
