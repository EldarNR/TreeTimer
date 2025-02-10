<template>
    <div class="border dark:bg-black w-full h-dvh">
        <error class=" z-10" />
        <indexPage class=" z-0" />
    </div>
</template>

<script setup lang="ts">
import indexPage from '~/components/timer/index-page.vue';
import error from '~/components/ui/error.vue';
import { useGame } from '~/store/game';

const game = useGame();
onMounted(() => {
    game.initialize();
})

</script>
