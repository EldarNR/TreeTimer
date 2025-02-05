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
                {{ `${$t('findErrororbetterprj')} ${$t('contact')}` }}
            </span>
        </div>

        <div class="mt-2">
            <div class="group relative inline-block">
                <a class="focus:outline-none" href="https://github.com/EldarNR/TreeTimer">
                    <svg height="24" width="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path
                            class="group-hover:fill-[#171543] dark:group-hover:fill-white fill-black dark:fill-white duration-300"
                            d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.17 6.839 9.481.5.092.683-.217.683-.481 0-.237-.009-.866-.013-1.699-2.782.603-3.37-1.338-3.37-1.338-.454-1.15-1.11-1.458-1.11-1.458-.906-.619.069-.606.069-.606 1.002.071 1.527 1.03 1.527 1.03.89 1.529 2.34 1.087 2.911.831.091-.645.348-1.087.634-1.338-2.22-.252-4.555-1.11-4.555-4.94 0-1.09.39-1.986 1.028-2.682-.103-.252-.446-1.268.098-2.642 0 0 .837-.268 2.75 1.024a9.563 9.563 0 012.496-.335 9.58 9.58 0 012.496.335c1.913-1.292 2.75-1.024 2.75-1.024.544 1.374.202 2.39.1 2.642.64.696 1.027 1.592 1.027 2.682 0 3.839-2.338 4.685-4.567 4.933.358.309.678.916.678 1.847 0 1.334-.012 2.412-.012 2.74 0 .267.18.577.688.481A12.01 12.01 0 0022 12c0-5.523-4.477-10-10-10z"
                            fill="#FFFFFF"></path>
                    </svg>
                </a>
                <span
                    class="absolute -top-14 left-1/2 transform -translate-x-1/2 z-20 px-4 py-2 text-sm font-bold text-white bg-gray-900 rounded-lg shadow-lg transition-transform duration-300 ease-in-out scale-0 group-hover:scale-100">github</span>
            </div>

        </div>
    </div>
</template>

<script setup lang="ts">
</script>
