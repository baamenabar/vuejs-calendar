import './style.scss';

import Vue from 'vue';
import App from './components/App.vue';

import moment from 'moment-timezone';
moment.tz.setDefault('UTC');
Object.defineProperty(Vue.prototype, '$moment', { get() { return this.$root.moment } })

import store from './store/';

new Vue({
  el: '#app',
  data: {
    moment,
  },
  components: {
    App,
  },
  store,
});
