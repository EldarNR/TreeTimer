<template>
    <div class="bg-white dark:bg-neutral-900 p-6 rounded-2xl shadow-lg max-w-lg mx-auto text-center">
        <h2 class="text-2xl font-bold text-gray-900 dark:text-white">
            {{ $t('prject_hello') }}
        </h2>
        <p class="text-gray-600 dark:text-gray-300 mt-3 text-md text-justify">
            {{ $t('project_info') }}
        </p>
        <div class="mt-4 p-3 bg-red-100 dark:bg-red-500 text-red-800 dark:text-white rounded-lg">
            <span class="font-semibold">
                {{   `${$t('findErrororbetterprj')} ${$t('contact')}` }}
            </span>
        </div>
    </div>
</template>

<script setup lang="ts">
</script>
