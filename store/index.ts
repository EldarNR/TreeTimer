import { defineStore } from "pinia";
import { useTimer } from "./timer";

export const useStore = defineStore("index", {
  getters: {
    timer: () => {
      const timer = useTimer();
      timer.time;
    },
  },
});
