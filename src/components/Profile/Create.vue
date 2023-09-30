<script setup lang="ts">
import { ref, reactive } from "vue";
type ProfileField = {
  id: number;
  label: string;
  value: string | number;
};
// interface User {
//   id: string;
//   name: string;
//   email: string;
//   password: string;
//   profileFields: ProfileField[];
//   createdAt: Date;
//   updatedAt: Date;
// }

// model
const _profileFields = [
  {
    id: 1,
    label: "名前",
    value: "",
  },
  {
    id: 2,
    label: "年齢",
    value: 0,
  },
  {
    id: 3,
    label: "趣味",
    value: "",
  },
];

// VM
const profileFields = ref<ProfileField[]>(_profileFields);
const customFiled = reactive({
  label: "",
  value: "",
});

const addCustomField = () => {
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

const submitForm = () => {};

const deleteField = (id: number) => {
  profileFields.value = profileFields.value.filter((field) => field.id !== id);
};
</script>

<template>
  <div>
    <h2>新規作成</h2>
    <form @submit.prevent="submitForm">
      <div v-for="field in profileFields">
        <label>{{ field.label }}:</label>
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
        <span @click="deleteField(field.id)" class="delete-icon">✖</span>
      </div>
      <button type="submit">作成</button>
    </form>
    <div>
      <h2>カスタムフィールドの追加</h2>
      <form @submit.prevent="addCustomField">
        <div>
          <label for="label">フィールド名:</label>
          <input
            id="label"
            v-model="customFiled.label"
            placeholder="例: 趣味"
            required
          />
        </div>
        <button type="submit">フィールド追加</button>
      </form>
    </div>
  </div>
</template>

<style scoped>
/* ここでスタイリングを追加 */
</style>
