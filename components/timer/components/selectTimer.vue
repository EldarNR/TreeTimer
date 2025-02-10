<template>
    <div class="w-full">
        <!-- Выбор времени -->
        <label for="time-select" class="block text-sm font-semibold mb-2">
            {{ $t('setTimer') }}
        </label>
        <select id="time-select" v-model="selected.selectedTime" @change="onTimeChange(selected.selectedTime)"
            class="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-700">
            <option v-for="time in times" :key="time.value" :value="time.id">
                {{ `${time.label} ${nameTime(time.value)} | ${formTime(time.break)} ${nameTime(time.break)}
                ${$t('break')}` }}
            </option>
        </select>

        <!-- Ввод количества циклов -->
        <div class="mt-4">
            <label for="cycle" class="block text-sm font-semibold mb-2">
                {{ $t("cycle") }}
            </label>
            <input type="number" v-model="selected.cycle" name="cycle" id="cycle-box"
                class="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-700" />
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, reactive, watch, onMounted } from 'vue';
import { useTimer } from '~/store/timer';
import { useAlert } from '~/store/alert';
import { useI18n } from 'vue-i18n';
import { type Timer } from '../timer.vue';

const alert = useAlert();
const timer = useTimer();
const { t } = useI18n();

const selected = reactive({
    selectedTime: 4,
    cycle: 1,
});

// Проверка и обновление sessionStorage только на клиенте
const updateSessionStorage = () => {
    if (process.client) {
        sessionStorage.setItem('selectedTime', JSON.stringify(selected.selectedTime));
        sessionStorage.setItem('cycle', JSON.stringify(selected.cycle));
    }
};

watch(selected, () => {
    updateSessionStorage();
    onTimeChange(selected.selectedTime);
});

const onTimeChange = (selectID: number | null) => {
    if (!process.client) return; // Защита от выполнения на сервере

    const selectedTime = times.find(time => time.id === selectID);

    if (selectedTime && selected.cycle !== null) {
        sessionStorage.setItem("time", String(selectedTime.value));
        sessionStorage.setItem("breakTime", String(selectedTime.break));
        sessionStorage.setItem("cycle", String(selected.cycle));
        timer.setTimer(selectedTime.value, selectedTime.break, selected.cycle);

        // Вычисление reward и сохранение в sessionStorage
        const reward = selectedTime.value / 3600;
        sessionStorage.setItem("reward", JSON.stringify(reward));
    } else {
        alert.setAlert(true, 0, "ErrorNeedPickTimerOrCycle");
    }
};

onMounted(() => {
    if (!process.client) return;

    let selectT = sessionStorage.getItem('selectedTime');
    let selectC = sessionStorage.getItem('cycle');

    if (selectT && selectC) {
        selected.selectedTime = Number(selectT);
        selected.cycle = Number(selectC);
        onTimeChange(selected.selectedTime);
    } else {
        selected.selectedTime = 3;
        selected.cycle = 2;
    }
});

const times: Timer[] = [
    { id: 1, value: 1500, label: '25', break: 300 },
    { id: 2, value: 1800, label: '30', break: 360 },
    { id: 3, value: 2100, label: '35', break: 420 },
    { id: 4, value: 2400, label: '40', break: 480 },
    { id: 5, value: 2700, label: '45', break: 540 },
    { id: 6, value: 3000, label: '50', break: 600 },
    { id: 7, value: 3300, label: '55', break: 660 },
    { id: 8, value: 3600, label: '1', break: 720 },
    { id: 9, value: 5, label: '5', break: 5 },
];

const formTime = (num: number) => num / 60;
const nameTime = (value: number) =>
    value < 60 ? t("second") : value < 3600 ? t("minute") : t("hour");

</script>