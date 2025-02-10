import { defineStore } from "pinia";
import tree1 from "@/assets/img/tree/tree-default.png";
import tree2 from "@/assets/img/tree/tree-lvl2.png";
import tree3 from "@/assets/img/tree/tree-lvl3.png";

const loadState = () => {
  const savedState = localStorage.getItem("gameState");
  if (savedState) {
    return JSON.parse(savedState);
  }
  return null;
};

const saveState = (state: any) => {
  localStorage.setItem("gameState", JSON.stringify(state));
};

export const useGame = defineStore("game", {
  state: () => ({
    coins: 0, // Стартовые монеты
    activeTree: 1, // Активное дерево
    level: 1, // Открытый уровень дерева
    trees: [
      { level: 1, image: tree1, cost: 0, multiplier: 2 },
      { level: 2, image: tree2, cost: 1000, multiplier: 4 },
      { level: 3, image: tree3, cost: 2500, multiplier: 6 },
    ],
  }),
  getters: {
    stats: (state) => {
      return {
        coin: state.coins,
        activeTree: state.activeTree,
        lvl: state.level,
      };
    },
    unlockedTrees: (state) =>
      state.trees.filter((tree) => tree.level <= state.level),
  },
  actions: {
    initialize() {
      const savedState = loadState();
      if (savedState) {
        this.coins = savedState.coins;
        this.activeTree = savedState.activeTree;
        this.level = savedState.level;
      }
    },
    buyFertilizer(treeLevel: number) {
      const tree = this.trees.find((t) => t.level === treeLevel);
      if (tree && this.coins >= tree.cost) {
        this.coins -= tree.cost;
        this.level = Math.max(this.level, treeLevel);
        saveState(this.$state);
      }
    },
    selectTree(treeLevel: number) {
      if (treeLevel <= this.level) {
        this.activeTree = treeLevel;
        saveState(this.$state);
      }
    },
    finishTimer(time: number, cycle: number) {
      const tree = this.trees.find((t) => t.level === this.activeTree);
      if (tree && time && cycle) {
        const earnedCoins =
          Math.max((time / 3600) * 50 * tree.multiplier, 1) * cycle;
        this.coins += Math.round(earnedCoins);
        saveState(this.$state);
      }
    },
  },
});
