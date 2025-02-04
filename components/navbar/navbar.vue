<template>
    <div class="w-full mx-auto">
        <div class="flex items-center justify-center space-x-4 bg-neutral-300 w-[100px] mx-auto rounded-3xl">
            <div class="w-[24px] to-red-400" @click="switchPage('index')">
                <img src="../../assets/icon/clock.svg" alt="icon">
            </div>
            <div class="w-[24px] to-black" @click="switchPage('game')">
                <img src="../../assets/icon/calendar.svg" alt="icon">
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
const emit = defineEmits<{
    (event: 'switch-page', page: string): void;
}>();

const switchPage = (page: string): void => {
    // Отправляем событие наверх
    emit('switch-page', page);
};
</script>
