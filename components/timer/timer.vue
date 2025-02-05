<template>
    <div class="flex flex-col  justify-center mx-auto items-center gap-4 font-custom w-full max-w-lg p-4 sm:p-6 shadow-md rounded-3xl 
        dark:bg-neutral-700 dark:border-black dark:text-white">

        <!-- Компонент для переключения режимов -->
        <setting v-if="timer.timerId === null" @show-setting="handleSetting" />

        <!-- Контейнер для отображения компонентов -->
        <div v-show="showTool" class="border w-full  sm:rounded-lg p-2 sm:p-4 bg-gray-50 shadow-sm rounded-lg
            dark:bg-neutral-600 dark:border-black">
            <!-- Контейнер для выбора таймера и цикла -->
            <selectTimer v-show="isSetting === 'auto'" />
            <!-- Контейнер для настройки -->
            <div v-show="isSetting === 'setting'">
                <them />
                <language />
            </div>
            <!-- Контейнер для информации -->
            <info v-show="isSetting === 'info'" />
        </div>
        <!-- Кнопки для запуска,сброса и остановки таймера -->
        <tool @showTool="handleValue" />
    </div>
</template>


<script setup lang="ts">
import { ref } from 'vue';
import tool from './components/tool.vue';
import language from '../setting/language.vue';
import them from './components/them.vue';
import setting from './components/setting.vue';
import info from './components/info.vue';
import selectTimer from './components/selectTimer.vue';
import { useTimer } from '~/store/timer';

const timer = useTimer();
const isSetting = ref<string>('auto'); // По умолчанию "auto"

const showTool = ref<boolean>(true);
export type timer = {
    id: number
    value: number,
    label: string,
    break: number
}
// Обработчик переключения
const handleValue = (value: boolean) => {
    showTool.value = value;
};

const handleSetting = (value: string) => {
    isSetting.value = value;
};

</script>
