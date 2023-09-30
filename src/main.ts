import { createApp } from "vue";
// import "./style.css";
import "./assets/styles/reset.css";
import router from "./router";
import App from "./App.vue";

// createApp(App).mount("#app");
const app = createApp(App);

app.use(router);

app.mount("#app");
