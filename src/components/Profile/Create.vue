<script setup lang="ts">
import { ref, reactive } from "vue";
import { collection, addDoc } from "firebase/firestore";
import { PROFILES_KEY, db } from "../../FirebaseConfig";
import { ProfileField, Profile } from "@/entities/index";

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
    // FIXME: 本当はusernameを"名前"としてprofileFieldsに追加したい
    const putDoc: Profile = {
      id: randomId(),
      username: profileFields.value.filter((it) => it.label === "名前")[0]
        .value as string,
      profileFields: profileFields.value,
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
    <h2 class="title">新規作成</h2>
    <div>
      <form @submit.prevent="submitForm" class="form">
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

<style scoped>
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
</style>
