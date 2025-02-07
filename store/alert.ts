import { defineStore } from "pinia";

export const useAlert = defineStore("alert", {
  state: () => ({
    showAlert: false as boolean,
    type: null as number | null,
    msg: null as string | null,
  }),
  getters: {
    alert: (state) => {
      {
        state.type, state.showAlert, state.msg;
      }
    },
  },
  actions: {
    // 0 - success, 1 - error
    setAlert(show: boolean, type: 0 | 1, msg: string) {
      this.$state.showAlert = show;
      this.$state.type = type;
      this.$state.msg = msg;

      setTimeout(() => {
        this.showAlert = false;
        this.type = null;
        this.msg = null;
      }, 5000);
    },
  },
});
