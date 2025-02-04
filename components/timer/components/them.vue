<template>
    <div :class="{ 'dark': isDarkMode }" class="dark:text-white text-sm font-semibold">
        <span>{{ $t("them") }}</span>
        <div
            class="flex items-center justify-center space-y-2 border-2 mt-2 border-[#e7e8ea] bg-white dark:bg-neutral-500">
            <label class="inline-flex items-center relative">
                <input v-model="isDarkMode" class="peer hidden" type="checkbox" />
                <div
                    class="relative w-[110px] h-[50px] bg-white peer-checked:bg-zinc-500 dark:border-black border rounded-full after:absolute after:content-[''] after:w-[40px] after:h-[40px] after:bg-gradient-to-r from-orange-500 to-yellow-400 peer-checked:after:from-zinc-900 peer-checked:after:to-white after:rounded-full after:top-[5px] after:left-[5px] active:after:w-[50px] peer-checked:after:left-[105px] peer-checked:after:translate-x-[-100%] shadow-sm duration-300 after:duration-300 after:shadow-md">
                </div>
            </label>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, watch  } from 'vue';

const isDarkMode = ref(false);

onMounted(() => {
    const savedTheme = localStorage.getItem("them");
    isDarkMode.value = savedTheme === 'dark';
    updateTheme();
});

watch(isDarkMode, (newValue) => {
    localStorage.setItem("them", newValue ? 'dark' : 'light');
    updateTheme();
});

function updateTheme() {
    if (isDarkMode.value) {
        document.documentElement.classList.add('dark');
    } else {
        document.documentElement.classList.remove('dark');
    }
}
</script>
