<template>
    <div :class="dayClasses">{{ day.format('D') }}</div>
</template>

<script>
export default {
    props: ['day'],
    computed: {
        dayClasses() {
            const todayMoment = this.$moment();
            return {
                day: true,
                today: this.day.isSame(todayMoment, 'day'),
                past: this.day.isBefore(todayMoment, 'day'),
            }
        }
    }
}
</script>