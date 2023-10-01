<script setup lang="ts">
import { ref, reactive } from "vue";
import { collection, addDoc } from "firebase/firestore";
import { PROFILES_KEY, db } from "../../FirebaseConfig";
import { ProfileField, Profile } from "@/entities/index";
import { storage } from "../../FirebaseConfig";
import {
  uploadBytesResumable,
  getDownloadURL,
  ref as storageRef,
} from "firebase/storage";
// model
const _profileFields = [
  {
    id: 1,
    label: "名前",
    value: "",
    required: true,
  },
  {
    id: 2,
    label: "年齢",
    value: 0,
    required: true,
  },
  {
    id: 3,
    label: "趣味",
    value: "",
    required: true,
  },
];

// VM
const profileFields = ref<ProfileField[]>(_profileFields);
const customFiled = reactive({
  label: "",
  value: "",
});
const localImage = ref<any>(null); // 画像データ
const imageEvent = ref();
const imageUrl = ref(""); // アップロードされた画像のURL

const handleImageChange = (event) => {
  imageEvent.value = event.target.files[0];
  if (imageEvent.value) {
    localImage.value = URL.createObjectURL(imageEvent.value); // ローカルの画像URLを作成
  }
};
const uploadImage = async () => {
  // const file = event.target.files[0];
  const file = imageEvent.value;
  if (!file) return;
  const storageReference = storageRef(storage, `profile-images/${file.name}`);
  const uploadTask = uploadBytesResumable(storageReference, file);
  uploadTask.on(
    "state_changed",
    (snapshot) => {
      // 進行状況を追跡することも可能です
    },
    (error) => {
      console.error("Upload error: ", error);
    },
    async () => {
      imageUrl.value = await getDownloadURL(uploadTask.snapshot.ref);
    }
  );
};

const addCustomField = async () => {
  profileFields.value.push({
    id: profileFields.value.length + 1,
    label: customFiled.label,
    value: customFiled.value,
  });
  // initialize
  Object.assign(customFiled, {
    label: "",
    value: "",
  });
};

const randomId = () => {
  return Math.floor(Math.random() * 100000000000000000);
};

const submitForm = async () => {
  try {
    uploadImage();

    // FIXME: 本当はusernameを"名前"としてprofileFieldsに追加したい
    const putDoc: Profile = {
      id: randomId(),
      username: profileFields.value.filter((it) => it.label === "名前")[0]
        .value as string,
      profileFields: profileFields.value,
      profileImageUrl: imageUrl.value,
    };
    const docRef = await addDoc(collection(db, PROFILES_KEY), putDoc);
    console.log("Document written: ", docRef);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
};

const deleteField = (id: number) => {
  profileFields.value = profileFields.value.filter((field) => field.id !== id);
};
</script>

<template>
  <div class="container">
    <div class="vacant-line"></div>
    <div>
      <form @submit.prevent="submitForm" class="form">
        <h2 class="title">新規作成</h2>
        <div class="vacant-line"></div>
        <div v-for="field in profileFields" class="field">
          <label>{{ field.label }}: </label>
          <span v-if="typeof field.value === 'string'">
            <input
              v-model="field.value"
              :placeholder="`${field.label}を入力してください`"
              required
            />
          </span>
          <span v-else-if="typeof field.value === 'number'">
            <input
              type="number"
              v-model.number="field.value"
              :placeholder="`${field.label}を入力してください`"
              required
            />
          </span>
          <span v-else>
            <input
              v-model="field.value"
              :placeholder="`${field.label}を入力してください`"
            />
          </span>
          <span
            v-if="!field.required"
            @click="deleteField(field.id)"
            class="delete-icon"
            >✖</span
          >
        </div>
        <div>
          <input type="file" @change="handleImageChange" />
          <!-- アップロードされた画像を表示 -->
          <div v-if="localImage" style="display: flex; justify-content: center">
            <img :src="localImage" alt="Uploaded profile image" width="100" />
          </div>
        </div>
        <div>
          <button type="submit" class="button">作成</button>
        </div>
      </form>
    </div>
    <div class="custom-field-container">
      <h2 class="custum-field-title">カスタムフィールドの追加</h2>
      <form @submit.prevent="addCustomField" class="custom-field-form">
        <div class="custom-field">
          <label for="label">フィールド名: </label>
          <input
            id="label"
            v-model="customFiled.label"
            placeholder="例: 趣味"
            required
          />
        </div>
        <button type="submit" class="button">フィールド追加</button>
      </form>
    </div>
  </div>
</template>

<!-- ... -->

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  font-family: "Arial", sans-serif;
  background-color: #fdeef4;
}
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  font-family: "Brush Script MT", cursive;
}

.title,
.custum-field-title {
  color: #ff88cc;
  border-bottom: 2px solid #ffbbdd;
  text-shadow: 3px 3px 5px #ff66aa, -3px -3px 5px #ff66aa;
  padding-bottom: 8px;
  text-align: center;
  margin-bottom: 20px;
  font-size: 24px;
  text-shadow: 2px 2px 4px #ff66aa;
}

.form {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 80vw;
  max-width: 1000px;
  /* box-shadow: 0px 0px 15px 0px rgba(255, 102, 170, 0.7); */
}
.vacant-line {
  margin: 0.5rem;
}

.custom-field-form {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
}

.field,
.custom-field {
  display: flex;
  align-items: flex-start;
  justify-content: center;
  width: 100%;
  margin-bottom: 12px;
}

.field > label {
  margin-bottom: 8px;
  color: #ff4499; /* ギャルピンク */
  font-weight: bold; /* 太字 */
  font-size: 18px;
}

.field > input {
  width: 100%;
  padding: 8px;
  border: 2px solid #ffbbdd; /* 明るいピンク色のボーダー */
  border-radius: 4px;
  font-size: 16px;
  background-color: #fff1f3; /* ペールピンク */
  transition: all 0.3s ease-in-out; /* スムーズな遷移 */
}

.field > input:hover {
  box-shadow: 0px 0px 10px 0px rgba(255, 102, 170, 0.5);
}

.button {
  padding: 8px 16px;
  background-color: #ff4499; /* ギャルピンク */
  text-shadow: 2px 2px 4px #ff66aa, -2px -2px 4px #ff66aa;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-top: 16px;
  box-shadow: 0px 0px 10px 0px rgba(255, 102, 170, 0.7);
  transition: transform 0.2s; /* スムーズな遷移 */
}

.button:hover {
  background-color: #ff2266; /* 濃いピンク */
  transform: scale(1.05); /* ホバー時に若干拡大 */
}

.delete-icon {
  margin-left: 10px;
  cursor: pointer;
  color: #ff2266; /* 濃いピンク */
  font-size: 20px;
  transition: transform 0.2s; /* スムーズな遷移 */
}

.delete-icon:hover {
  transform: scale(1.2); /* ホバー時に拡大 */
  color: #ff0044; /* より濃いピンク */
}

.custom-field-container {
  margin-top: 40px;
  width: 80%;
  /* box-shadow: 0px 0px 15px 0px rgba(255, 102, 170, 0.6); */
}
</style>

<!-- <style scoped>
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  font-family: "Arial", sans-serif;
}

.title {
  color: #444;
  border-bottom: 2px solid #ddd;
  padding-bottom: 8px;
  margin-bottom: 20px;
}

.custum-field-title {
  color: #444;
  border-bottom: 2px solid #ddd;
  padding-bottom: 8px;
  margin-bottom: 20px;
}
.form {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 400px;
}
.custom-field-form {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
}

.field {
  display: flex;
  align-items: flex-start;
  width: 100%;
  margin-bottom: 12px;
}

.custom-field {
  display: flex;
  align-items: flex-start;
  margin-bottom: 12px;
}

.field > label {
  margin-bottom: 8px;
  color: #666;
}

.field > input {
  width: 100%;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 16px;
}

.button {
  padding: 8px 16px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-top: 16px;
}

.button:hover {
  background-color: #0056b3;
}

.delete-icon {
  margin-left: 10px;
  cursor: pointer;
  color: red;
}

.custom-field-container {
  margin-top: 40px;
  width: 80%;
}
</style> -->
