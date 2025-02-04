<template>
    <transition name="fade">
        <div v-if="alert.showAlert && alert.msg"
            class="fixed top-5 left-1/2 transform -translate-x-1/2 px-6 py-3 rounded-lg shadow-lg text-white text-sm font-semibold"
            :class="alert.type === 0 ? 'bg-red-500' : 'bg-green-500'">
            {{ $t(alert.msg) }}
        </div>
    </transition>
</template>

<script setup lang="ts">
import { useAlert } from '~/store/alert';

const alert = useAlert();
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}
</style>
