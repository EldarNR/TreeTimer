<template>
    <div
        class="flex flex-col justify-center mx-auto items-center gap-6 font-custom w-full max-w-sm p-4 shadow-md rounded-lg dark:bg-neutral-700 dark:border-black dark:text-white">
        <!-- Компонент для переключения режимов -->
        <setting @show-setting="handleSetting" />

        <!-- Контейнер для отображения компонентов -->
        <div v-show="showTool"
            class="border w-full rounded-lg p-4 bg-gray-50 shadow-sm dark:bg-neutral-600 dark:border-black">
            <selectTimer v-if="isSetting === 'auto'"   />
            <div v-show="isSetting === 'setting'">
                <them />
                <language />
            </div>
            <info v-if="isSetting === 'info'" />
        </div>


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
