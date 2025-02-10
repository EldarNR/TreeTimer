import { defineStore } from "pinia";
import { useAlert } from "./alert";
import { useGame } from "./game";

export const useTimer = defineStore("timer", {
  state: () => ({
    time: 0,
    breakTime: 0,
    cycle: 0,
    currentCycle: 0,
    totalTime: 0,
    isBreak: false,
    timerId: null as ReturnType<typeof setInterval> | null,
    initialSettings: null as {
      time: number;
      breakTime: number;
      cycle: number;
    } | null,
  }),
  getters: {
    timer: (state) => state.time,
  },
  actions: {
    setTimer(time: number, breakTime: number, cycle: number): void {
      this.time = time;
      this.totalTime = time;
      this.breakTime = breakTime;
      this.cycle = cycle;
      this.currentCycle = 0;

      if (!this.initialSettings) {
        this.initialSettings = { time, breakTime, cycle };
      }
    },

    async startTimer(): Promise<boolean> {
      if (this.time === 0 || this.cycle === 0) {
        useAlert().setAlert(true, 0, "ErrorNeedStartTimer");
        return false;
      }

      if (this.timerId) {
        return false;
      }

      this.timerId = setInterval(() => {
        if (this.time > 0) {
          this.time--;
        } else {
          if (this.isBreak) {
            this.currentCycle++;
            if (this.currentCycle >= this.cycle) {
              this.stopTimer();
              useAlert().setAlert(true, 1, "complatedCycle");
              this.resetButtonState();

              let reward = Number(sessionStorage.getItem("reward"));
              let cycle = Number(sessionStorage.getItem("cycle"));

              if (reward && cycle) {
                useGame().finishTimer(reward, cycle);
              }

              if (this.initialSettings) {
                this.setTimer(
                  this.initialSettings.time,
                  this.initialSettings.breakTime,
                  this.initialSettings.cycle
                );
              }
              return;
            }
          }

          this.isBreak = !this.isBreak;
          this.time = this.isBreak ? this.breakTime : this.totalTime;
        }
      }, 1000);

      return true;
    },

    async stopTimer(): Promise<boolean> {
      if (this.timerId) {
        clearInterval(this.timerId);
        this.timerId = null;
        return true;
      }
      return false;
    },

    async resetTimer(): Promise<boolean> {
      if (this.timerId) {
        await this.stopTimer();
      }

      if (this.initialSettings) {
        this.time = this.initialSettings.time;
        this.breakTime = this.initialSettings.breakTime;
        this.cycle = this.initialSettings.cycle;
        this.totalTime = this.initialSettings.time;
      }

      this.currentCycle = 0;
      this.isBreak = false;

      return true;
    },

    resetButtonState(): void {
      this.currentCycle = 0;
      this.isBreak = false;
      this.timerId = null;

      useAlert().setAlert(true, 1, "timercomplete");
    },
  },
});
