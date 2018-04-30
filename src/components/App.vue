<template>
    <div>
        <div class="header">
            <div>
                <img src="../assets/logo.png" alt="">
                <h1>Vue.js Calendar</h1>
            </div>
            <div>
                <current-month></current-month>
            </div>
        </div>
        <month-grid></month-grid>
        <event-form></event-form>
    </div>
</template>

<script>
import currentMonth from './currentMonth.vue';
import monthGrid from './monthGrid.vue';
import eventForm from './eventForm.vue';

export default {
    components: {
        currentMonth,
        monthGrid,
        eventForm,
    },
}
</script>