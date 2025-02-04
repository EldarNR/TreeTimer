<template>
    <div class="border dark:bg-black w-full h-dvh">
        <error />
        <navbar @switch-page="handleSwitchPage" />
        <indexPage v-show="currentPage === 'index'"  />
        <gamePage v-show="currentPage === 'game'" />
    </div>
</template>

<script setup lang="ts">
import indexPage from '~/components/timer/index-page.vue';
import error from '~/components/ui/error.vue';
import navbar from '~/components/navbar/navbar.vue';
import gamePage from '~/components/game/game-page.vue';

// Управляем текущей страницей
let currentPage = ref("index");

// Обработка переключения страницы
const handleSwitchPage = (page: string): void => {
    currentPage.value = page;
};
</script>
