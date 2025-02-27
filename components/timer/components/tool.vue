<template>
    <div class="flex justify-center items-center border-2 shadow-md border-gray-300 rounded-full space-x-4 p-2 bg-white"
        :class="timer.timerId !== null ? 'w-full' : ' w-[180px]'">
        <!-- Кнопка перезапуска -->
        <button @click="resetTimer()" :disabled="!collect.restart"
            class="flex items-center justify-center w-[44px] h-[44px] bg-red-100 rounded-full hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-red-500 disabled:opacity-50 disabled:cursor-not-allowed">
            <img src="@/assets/icon/timer/restart.svg" alt="restart icon" class="w-6 h-6">
        </button>

        <!-- Кнопка старта -->
        <button @click="startTimer()" :disabled="!collect.start"
            class="flex items-center justify-center w-[44px] h-[44px] bg-green-100 rounded-full hover:bg-green-200 focus:outline-none focus:ring-2 focus:ring-green-500 disabled:opacity-50 disabled:cursor-not-allowed">
            <img src="@/assets/icon/timer/play.svg" alt="play icon" class="w-6 h-6">
        </button>

        <!-- Кнопка паузы -->
        <button @click="stopTimer()" :disabled="!collect.pause"
            class="flex items-center justify-center w-[44px] h-[44px] bg-blue-100 rounded-full hover:bg-blue-100 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed">
            <img src="@/assets/icon/timer/pause.svg" alt="pause icon" class="w-6 h-6">
        </button>
    </div>
</template>

<script setup lang="ts">
import { watch, reactive } from "vue";
import { useTimer } from "~/store/timer";
import { useAlert } from "~/store/alert";
import { useSound } from "@vueuse/sound";

import start from '@/assets/sound/start.wav';
import end from '@/assets/sound/end.wav';

const emit = defineEmits(["showTool"]);

const alert = useAlert();
const timer = useTimer();

const collect = reactive({
    restart: false,
    pause: false,
    start: true,
});

const { play: playStart } = useSound(start);
const { play: playEnd } = useSound(end);

watch(
    () => timer.timerId,
    (newVal) => {
        if (newVal === null) {
            resetCollectState();
        }
    }
);

watch(() => timer.time, (newVal) => {
    if (newVal === 0 ) {
        playEnd();
    }
});

// Запуск таймера
const startTimer = async () => {
    try {
        const isStarted = await timer.startTimer();
        if (isStarted) {
            emit("showTool", false);
            collect.start = false;
            collect.pause = true;
            collect.restart = true;

            playStart();

        } else {
            alert.setAlert(true, 0, "ErrorDontCorrectTimer");
        }
    } catch (e) {
        alert.setAlert(true, 0, "ErrorDontCorrectTimer");
    }
};


// Сброс таймера
const resetTimer = async () => {
    try {
        const isReset = await timer.resetTimer();
        if (isReset) {
            emit("showTool", true);
            resetCollectState();
        } else {
            alert.setAlert(true, 0, "ErrorResetTimer");
        }
    } catch (e) {
        alert.setAlert(true, 0, "ErrorResetTimer");
    }
};

// Остановка таймера
const stopTimer = async () => {
    try {
        const isStopped = await timer.stopTimer();
        if (isStopped) {
            emit("showTool", true);
            resetCollectState();
        } else {
            alert.setAlert(true, 0, "ErrorStopTimer");
        }
    } catch (e) {
        alert.setAlert(true, 0, "ErrorStopTimer");
    }
};

// Сброс состояния кнопок
const resetCollectState = () => {
    collect.start = true;
    collect.pause = false;
    collect.restart = false;
    emit('showTool', true); // **Показываем кнопки**
};


</script>