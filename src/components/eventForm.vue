<template>
    <div :class="{'event-form': true, active:active}" :style="{ top: top, left: left } ">
        <h4>Add an event</h4>
        <p class="formatted-date">{{ date }}</p>
        <div class="text">
            <input type="text" v-focus @keyup.enter="create" v-model="description" placeholder="Cumpleaños de Perico los Palotes">
        </div>
        <div class="buttons">
            <button type="button" @click="create" :disabled="!description">Create</button>
        </div>
        <button class="js-close-button close-button" @click="close">&#10005</button>
    </div>
</template>

<script>
export default {
  data () {
    return {
        description: '',
    }
  },
  computed: {
    date() {
        return this.$store.state.activeDate ? this.$store.state.activeDate.format('DD,MM,YYYY') : '';
    },
    top() {
        return `${this.$store.state.formPosition.y}px`;
    },
    left() {
        return `${this.$store.state.formPosition.x}px`;
    },
    active() {
        return this.$store.state.eventFormActive;
    }
  },
  methods: {
    close() {
        this.$store.commit('eventFormActive',false);
    },
    create() {
        this.$store.commit('addEvent', this.description);
        this.$store.commit('eventFormActive', false);
        this.description='';
    }
  },
  directives: {
    focus: {
        update(el){
            // this will also be called on every leter we introduce in the input
            el.focus();
        }
    }
  }
}
</script>
