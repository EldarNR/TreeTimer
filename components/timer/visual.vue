<template>
    <div class="flex flex-col items-center justify-center space-y-4 ml-auto">
        <!-- Круговой таймер -->
        <div class="relative w-full h-[400px]">
            <svg class="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                <!-- Фоновая окружность -->
                <circle cx="50" cy="50" r="45" class="text-gray-300" stroke-width="10" fill="none"
                    stroke="currentColor" />
                <!-- Динамическая окружность (оставшееся время) -->
                <circle cx="50" cy="50" r="45" :stroke-dasharray="circumference" :stroke-dashoffset="progressOffset"
                    :class="timer.isBreak ? 'text-red-500' : 'text-blue-500'" stroke-width="10" fill="none"
                    stroke="currentColor" stroke-linecap="round" />
            </svg>
            <!-- Текст таймера внутри круга -->
            <div class="absolute inset-0 flex items-center justify-center text-4xl font-semibold">
                {{ formatTime(localTimer) }}
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useTimer } from '~/store/timer.js';
import { formatTime } from '~/utils/function/timer';
import { computed } from 'vue';

const timer = useTimer();
const localTimer = computed(() => timer.timer);

// Радиус окружности и длина
const radius = 45; // Радиус круга
const circumference = 2 * Math.PI * radius; // Длина окружности

// Определение общего времени (основной таймер или перерыв)
const totalDuration = computed(() => {
    return timer.isBreak ? timer.breakTime : timer.totalTime;
});

// Вычисление оставшейся длины окружности
const progressOffset = computed(() => {
    const remainingTime = timer.timer; // Оставшееся время (в секундах)
    const progress = remainingTime / totalDuration.value; // Прогресс от 0 до 1
    return circumference * (1 - progress); // Смещение для отображения оставшегося времени
});
</script>

<style scoped>
/* Анимация прогресса */
circle {
    transition: stroke-dashoffset 0.3s linear;
}
</style>
