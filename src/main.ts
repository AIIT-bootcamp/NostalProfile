import { createApp } from "vue";
import "./assets/styles/reset.css";
import router from "./router";
import App from "./App.vue";
import "./FirebaseConfig";

const app = createApp(App);

app.use(router);

app.mount("#app");
