<template>
    <div class="opacity-95 container flex flex-col items-center justify-center gap-6 h-screen transition-all duration-700 ease-in-out w-full"
        :class="timerS.timerId !== null ? 'md:justify-center md:items-center' : 'md:flex-row md:justify-end md:items-center md:gap-12 md:h-dvh'">
        <visual class="w-full flex justify-center" />
        <timer class="opacity-95" :class="timerS.timerId !== null ? 'md:h-auto ' : 'md:h-screen'" />
    </div>
</template>
<script setup lang="ts">
import timer from '~/components/timer/timer.vue';
import visual from '~/components/timer/visual.vue';
import { useTimer } from '~/store/timer';

const timerS = useTimer();
</script>
