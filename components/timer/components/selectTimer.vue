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
import { getSessionStorageItem } from '~/utils/function/timer';
import { useI18n } from 'vue-i18n';
import { type timer } from '../timer.vue';
const alert = useAlert();
const timer = useTimer();
const { t } = useI18n();

// Состояние для выбранных значений
const selected = reactive({
    selectedTime: 4,
    cycle: 1,
});
// Слежка за изменением выбора пользователя
watch(selected, (newValue) => {
    getSessionStorageItem('selectedTime', newValue.selectedTime),
        getSessionStorageItem('cycle', newValue.cycle),

        sessionStorage.setItem('selectedTime', JSON.stringify(newValue.selectedTime));
    sessionStorage.setItem('cycle', JSON.stringify(newValue.cycle));

    onTimeChange(selected.selectedTime);
});

// Обработчик выбора времени
const onTimeChange = (selectID: number | null) => {
    const selectedTime = times.find(time => time.id === selectID);


    if (selectedTime && selected.cycle !== null) {
        sessionStorage.setItem("time", String(selectedTime.value));
        sessionStorage.setItem("breakTime", String(selectedTime.break));
        sessionStorage.setItem("cycle", String(selected.cycle));
        console.log(selected.cycle)
        timer.setTimer(selectedTime.value, selectedTime.break, selected.cycle);
    } else {
        alert.setAlert(true, 0, "ErrorNeedPickTimerOrCycle");
    }
};

onMounted(() => {
    let selectT = Number(sessionStorage.getItem('selectedTime'));
    let selectC = Number(sessionStorage.getItem('cycle'));

    if ((selectT !== null && selectT) && (selectC !== null && selectC)) {
        selected.selectedTime = selectT;
        selected.cycle = selectC;

        onTimeChange(selectT);
    }

    else {
        selected.selectedTime = 3;
        selected.cycle = 2
    }

});

const times: timer[] = [
    { id: 1, value: 1500, label: '25', break: 300, },
    { id: 2, value: 1800, label: '30', break: 360, },
    { id: 3, value: 2100, label: '35', break: 420, },
    { id: 4, value: 2400, label: '40', break: 480, },
    { id: 5, value: 2700, label: '45', break: 540, },
    { id: 6, value: 3000, label: '50', break: 600, },
    { id: 7, value: 3300, label: '55', break: 660, },
    { id: 8, value: 3600, label: '1', break: 720, },
    { id: 9, value: 5, label: '5', break: 5, },
];

const formTime = (num: number) => {
    return num / 60;
}
const nameTime = (value: number) =>
    value < 60 ? t("second") : value < 3600 ? t("minute") : t("hour");


</script>
