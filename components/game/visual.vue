<template>
    <div class="tree-game text-center">
        <coin />

        <div class="flex justify-center space-x-4 relative">

            <div v-for="tree in game.trees" :key="tree.level" class="relative cursor-pointer"
                @click="game.selectTree(tree.level)">
                <!-- Обычное дерево -->
                <img :src="tree.image" alt="tree" class="h-[72px] md:h-[120px] object-cover transition-opacity m-4"
                    :class="{
                        'opacity-100 border border-red-800 ': game.activeTree === tree.level,
                        'opacity-50 blur-md ': game.activeTree !== tree.level && game.level < tree.level
                    }" />

                <!-- Подсказка при наведении на закрытое дерево -->
                <div v-if="game.level < tree.level"
                    class="absolute inset-0 flex flex-col items-center justify-center bg-black/60 text-white text-sm rounded-lg opacity-0 hover:opacity-100 transition-opacity">
                    <p> {{ $t('unlock') }} {{ tree.cost }} {{ $t('coin') }}</p>
                    <button @click.stop="buyT(tree)" :disabled="game.coins < tree.cost"
                        class="mt-2 px-4 py-1 bg-green-500 text-white rounded-lg disabled:bg-gray-400">
                        {{ $t("buy") }}
                    </button>


                </div>
            </div>
        </div>

    </div>
</template>

<script setup lang="ts">
import { useGame } from "~/store/game";
import coin from "./coin.vue";
import { useAlert } from "~/store/alert";

const game = useGame();

const buyT = (tree: { level: number; cost: number }) => {
    if (game.coins >= tree.cost) {
        game.buyFertilizer(tree.level);
        game.selectTree(tree.level);
    } else {
        useAlert().setAlert(true, 0, 'ErrorNotEnoughCoin')
    }
};
</script>