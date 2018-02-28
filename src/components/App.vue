<template>
    <div>
        <div class="header">
            <div>
                <h1>Vue.js Calendar</h1>
            </div>
            <div>
                <current-month></current-month>
            </div>
        </div>
        <div class="day-bar">
            <div>Montag</div>
            <div>Dienstag</div>
            <div>Mittwoch</div>
            <div>Donnerstag</div>
            <div>Freitag</div>
            <div>Samstag</div>
            <div>Sonntag</div>
        </div>
        <div class="calendar">
            <div v-for="week in weeks" class="calendar-week">
                <calendar-day v-for="day in week" :day="day"></calendar-day>
            </div>
        </div>
    </div>
</template>

<script>
import calendarDay from './calendarDay.vue';
import currentMonth from './currentMonth.vue';
import eventForm from './eventForm.vue';

export default {
    components: {
        calendarDay,
        currentMonth,
        eventForm,
    },
    computed: {
        year() {
            return this.$store.state.currentYear;
        },
        month() {
            return this.$store.state.currentMonth;
        },
        days() {
            // current month logic
            const theMonth = `${this.year}-${this.month}`;
            const numberOfdaysInMonth = this.$moment(theMonth, 'YYYY-M').daysInMonth();
            const days = Array.from( Array(numberOfdaysInMonth).keys(), dayNumber => {
                return this.$moment(`${theMonth}-${ dayNumber+1 }`, 'YYYY-M-D')
            }, this);
            console.log('days', days)

            // previous month logic --> getPreviousMonth(days[0])
            const prevMonthDays = Array.from( 
                Array(days[0].day() - 1).keys(), 
                weekDayNumber => this.$moment(days[0]).subtract(weekDayNumber + 1, 'days') 
            ).reverse();
            console.log('prev', prevMonthDays)

            // next month logic
            const lastDay = days[days.length - 1];
            const lastWeekDay = lastDay.day() === 0 ? 7 : lastDay.day();// to end the week at sunday
            const nextMonthDays = Array.from( 
                Array(7 - lastWeekDay).keys(), 
                extraDayIndex => this.$moment(lastDay).add(extraDayIndex + 1, 'days') 
            );
            console.log('next', nextMonthDays)

            return prevMonthDays.concat(days).concat(nextMonthDays);
            
        },
        weeks() {
            const weeks = [];
            const week = [];

            this.days.forEach( day => {
                week.push(day);
                if ( week.length % 7 == 0) {
                    weeks.push(week.splice(0))
                }
            });

            return weeks;
        },
    },
}
</script>