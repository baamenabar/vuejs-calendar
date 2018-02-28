import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        currentYear: 2018,
        currentMonth: 2,
    },
    mutations: {
        changeMonth(store, payload) {
            if (store.currentMonth + payload > 12) {
                store.currentMonth = 1;
                store.currentYear++;
            } else if (store.currentMonth + payload < 1) {
                store.currentMonth = 12;
                store.currentYear--;
            } else {
                store.currentMonth += payload;
            }
        }
    }
});