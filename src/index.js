import { createApp } from "vue";
import Prompts from "./prompts.vue";
const app = createApp(Prompts);
import createPrompt from "./createPrompts";

const VuePrompts = {
  install(Vue) {
    const id = `vue-prompts-${Date.now()}`;
    const promptElement = document.createElement("div");
    promptElement.id = id;
    document.body.appendChild(promptElement);
    app.mount(`#${id}`);
    const prompts = createPrompt();
    Vue.config.globalProperties.$prompt = prompts;
  }
};

export default VuePrompts;
