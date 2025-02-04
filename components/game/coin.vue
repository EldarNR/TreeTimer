<template>
    <div class="mb-4 flex items-center justify-end">
        <img src="@/assets/icon/coin.svg" alt="icon"  class="w-[24px]">
        <p class="text-lg font-bold">Монеты: {{ game.coins }}</p>
    </div>
</template>

<script setup lang="ts">
import { useGame } from "~/store/game";

const game = useGame();
</script>
