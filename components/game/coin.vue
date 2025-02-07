<template>
    <div class="flex items-center justify-center  border-2 m-2 w-[120px] h-[30px] rounded-3xl">
        <img src="@/assets/icon/coin.svg" alt="icon" class="w-[28px]">
        <p class="text-xl font-bold">{{ $t("coin") }}: {{ game.coins }}</p>
    </div>
</template>

<script setup lang="ts">
import { useGame } from "~/store/game";

const game = useGame();
</script>
