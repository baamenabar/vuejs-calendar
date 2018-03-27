<template>
    <div :class="dayClasses" @click="captureClick">
        {{ day.format('D') }}
        <ul class="event-list">
            <li v-for="event in events">{{ event.title }}</li>
        </ul>
    </div>
</template>

<script>
export default {
    props: ['day'],
    computed: {
        events() {
            return this.$store.state.events.filter(event => event.date.isSame(this.day, 'day'));
        },
        dayClasses() {
            const todayMoment = this.$moment();
            return {
                day: true,
                today: this.day.isSame(todayMoment, 'day'),
                past: this.day.isBefore(todayMoment, 'day'),
                active: this.day.isSame(this.$store.state.activeDate, 'day'),
                // add classes to days out of the current month
            }
        }
    },
    methods: {
        captureClick(eve) {
            this.$store.commit('eventFormPosition', {x:eve.clientX, y:eve.clientY});
            this.$store.commit('eventFormActive', true);
            this.$store.commit('activeDate', this.day);
        }
    }
}
</script>