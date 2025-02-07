<template>
    <div
        class="flex items-center justify-center w-[220px] p-1 border rounded-full bg-gray-100 dark:bg-neutral-700 text-center">
        <!-- Кнопка "Auto" -->
        <button @click="setSetting('auto')" :class="[
            'w-1/3 py-1 rounded-full text-sm font-medium transition-all duration-300',
            setting === 'auto' ? 'bg-blue-500 text-white shadow-md' : 'text-gray-500 hover:bg-gray-200 dark:hover:bg-neutral-600'
        ]">
            {{ $t('auto') }}
        </button>

        <!-- Кнопка "Setting" -->
        <button @click="setSetting('setting')" :class="[
            'w-1/3 py-1 rounded-full text-sm font-medium transition-all duration-300',
            setting === 'setting' ? 'bg-blue-500 text-white shadow-md' : 'text-gray-500 hover:bg-gray-200 dark:hover:bg-neutral-600'
        ]">
            {{ $t('setting') }}
        </button>

        <!-- Кнопка "GamePage" -->
        <button @click="setSetting('game')" :class="[
            'w-1/3 py-1 rounded-full text-sm font-medium transition-all duration-300',
            setting === 'game' ? 'bg-blue-500 text-white shadow-md' : 'text-gray-500 hover:bg-gray-200 dark:hover:bg-neutral-600'
        ]">
            {{ $t('game') }}
        </button>

        <!-- Кнопка "Info" -->
        <button @click="setSetting('info')" :class="[
            'w-1/3 py-1 rounded-full text-sm font-medium transition-all duration-300',
            setting === 'info' ? 'bg-blue-500 text-white shadow-md' : 'text-gray-500 hover:bg-gray-200 dark:hover:bg-neutral-600'
        ]">
            {{ $t('info') }}
        </button>
    </div>
</template>

<script setup lang="ts">
const emit = defineEmits(['showSetting']);
const setting = ref<'auto' | 'setting' | "game" | 'info'>('auto'); // Текущее состояние

const setSetting = (value: 'auto' | 'setting' | 'game' | 'info') => {
    setting.value = value;
    emit('showSetting', value);
};
</script>