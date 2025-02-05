<template>
    <div class="min-h-screen flex flex-col items-center justify-center gap-6 md:flex-row md:gap-12  
                dark:bg-black dark:text-white">
        <visual class="mr-0" />
        <timer class="opacity-95 h-auto md:h-dvh " />
    </div>
</template>


<script setup lang="ts">
import timer from '~/components/timer/timer.vue';
import visual from '~/components/timer/visual.vue';
</script>
