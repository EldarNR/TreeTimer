<template>
    <div class="tree-game text-center">
        <div class="flex justify-center space-x-4 relative">
            <coin />

            <div v-for="tree in game.trees" :key="tree.level" class="relative cursor-pointer"
                @click="game.selectTree(tree.level)">
                <!-- Обычное дерево -->
                <img :src="tree.image" alt="tree" class="h-[300px] object-cover transition-opacity m-4" :class="{
                    'opacity-100 border border-red-400 ': game.activeTree === tree.level,
                    'opacity-50 blur-md ': game.activeTree !== tree.level && game.level < tree.level
                }" />

                <!-- Подсказка при наведении на закрытое дерево -->
                <div v-if="game.level < tree.level"
                    class="absolute inset-0 flex flex-col items-center justify-center bg-black/60 text-white text-sm rounded-lg opacity-0 hover:opacity-100 transition-opacity">
                    <p>Разблокировать за {{ tree.cost }} монет</p>
                    <button @click.stop="game.buyFertilizer(tree.level)" :disabled="game.coins < tree.cost"
                        class="mt-2 px-4 py-1 bg-green-500 text-white rounded-lg disabled:bg-gray-400">
                        Купить
                    </button>
                </div>
            </div>
        </div>

        <div class="mt-4">
            <button @click="game.finishTimer" class="px-4 py-2 bg-blue-500 text-white rounded-lg">
                Завершить таймер (получить монеты)
            </button>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useGame } from "~/store/game";
import coin from "./coin.vue";
const game = useGame();
</script>