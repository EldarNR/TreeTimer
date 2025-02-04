<template>
    <div class="h-screen flex items-center justify-stretch dark:bg-black dark:text-white">
            <visual />
            <timer class="opacity-95 h-full" />
    </div>
</template>


<script setup lang="ts">
import timer from '~/components/timer/timer.vue';
import visual from '~/components/timer/visual.vue';
import language from '~/components/setting/language.vue';

</script>
