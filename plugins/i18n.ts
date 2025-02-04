import { createI18n } from "vue-i18n";

import ru from "~/assets/locales/ru.json";
import en from "~/assets/locales/en.json";

export const i18n = createI18n({
  legacy: false,
  locale: "en",
  messages: {
    en,
    ru,
  },
});

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(i18n);
});
