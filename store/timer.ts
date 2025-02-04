import { defineStore } from "pinia";
import { useAlert } from "./alert";

export const useTimer = defineStore("timer", {
  state: () => ({
    time: 0, // Текущее время
    breakTime: 0, // Время на перерыв
    cycle: 0, // Количество циклов
    currentCycle: 0, // Текущий цикл
    totalTime: 0, // Общее время
    isBreak: false, // Флаг, определяющий, идет ли перерыв
    timerId: null as ReturnType<typeof setInterval> | null | number, // ID таймера
    initialSettings: null as {
      time: number;
      breakTime: number;
      cycle: number;
    } | null, // Первоначальные настройки
  }),
  getters: {
    timer: (state) => state.time,
  },
  actions: {
    // Установка времени, перерыва, цикла
    setTimer(time: number, breakTime: number, cycle: number): void {
      console.log(time, breakTime, cycle);
      this.time = time;
      this.totalTime = time;
      this.breakTime = breakTime;
      this.cycle = cycle;
      this.currentCycle = 0;

      // Сохраняем первоначальные настройки
      if (!this.initialSettings) {
        this.initialSettings = { time, breakTime, cycle };
      }
    },

    // Запуск таймера
    async startTimer(): Promise<boolean> {
      if (this.time === 0 || this.cycle === 0) {
        useAlert().setAlert(true, 0, "ErrorNeedStartTimer");
        return false; // Возвращаем false, если данные некорректны
      }

      if (this.timerId) {
        return false; // Если таймер уже запущен, ничего не делаем
      }

      // Устанавливаем таймер
      this.timerId = setInterval(() => {
        if (this.time > 0) {
          this.time--;
        } else {
          if (this.isBreak) {
            // Если перерыв завершен, увеличиваем текущий цикл
            this.currentCycle++;
            if (this.currentCycle >= this.cycle) {
              // Все циклы завершены, останавливаем таймер
              this.stopTimer();
              useAlert().setAlert(true, 1, "complatedCycle");
              return;
            }
          }

          // Переключение режима
          this.isBreak = !this.isBreak;
          this.time = this.isBreak ? this.breakTime : this.totalTime;
        }
      }, 1000);

      return true; // Возвращаем true сразу после успешного запуска
    },

    // Остановка таймера
    async stopTimer(): Promise<boolean> {
      if (this.timerId) {
        clearInterval(this.timerId);
        this.timerId = null;
        return true; // Таймер успешно остановлен
      }
      return false; // Нечего останавливать
    },

    // Сброс таймера
    async resetTimer(): Promise<boolean> {
      if (this.timerId) {
        await this.stopTimer(); // Останавливаем таймер
      }

      // Восстанавливаем первоначальные настройки
      if (this.initialSettings) {
        this.time = this.initialSettings.time;
        this.breakTime = this.initialSettings.breakTime;
        this.cycle = this.initialSettings.cycle;
        this.totalTime = this.initialSettings.time; // Восстанавливаем totalTime
      }

      // Сбрасываем текущий цикл и флаг перерыва
      this.currentCycle = 0;
      this.isBreak = false;

      return true; // Успешный сброс
    },
  },
});
