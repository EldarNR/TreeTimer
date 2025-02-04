<template>
    <div class="dark:bg-neutral-600 dark:text-white">
        <label for="lang-select" class="block text-sm font-medium ">{{ $t("language") }}</label>

        <select id="lang-select" v-model="$i18n.locale"
            class="mt-1.5 w-full rounded-lg sm:text-sm p-4 border border-gray-300 dark:border-black  dark:bg-neutral-400 dark:text-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-700">
            <option value="en" class="p-2">English</option>
            <option value="ru" class="p-2">Русский</option>
        </select>
    </div>

</template>

<script setup lang="ts">

</script>
