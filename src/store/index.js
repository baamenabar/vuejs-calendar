import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);

import moment from 'moment-timezone';
moment.tz.setDefault('UTC');

export default new Vuex.Store({
    state: {
        currentYear: 2018,
        currentMonth: 2,
        formPosition: {
            x: 500,
            y: 500,
        },
        eventFormActive: false,
        activeDate: null,
        events: [
                {title: 'Some event', date: moment('2018-02-06', 'YYYY-MM-DD')},
                {title: 'Some other event', date: moment('2018-02-12', 'YYYY-MM-DD')},
                {title: 'No event', date: moment('2018-03-14', 'YYYY-MM-DD')},
                {title: 'Cumpleaños Agustín', date: moment('2018-03-14', 'YYYY-MM-DD')},
                {title: 'Remember that', date: moment('2018-03-26', 'YYYY-MM-DD')},
            ]
    },
    mutations: {
        changeMonth(storeState, payload) {
            if (storeState.currentMonth + payload > 12) {
                storeState.currentMonth = 1;
                storeState.currentYear++;
            } else if (storeState.currentMonth + payload < 1) {
                storeState.currentMonth = 12;
                storeState.currentYear--;
            } else {
                storeState.currentMonth += payload;
            }
        },
        eventFormPosition(storeState, payload) {
            storeState.formPosition.x = payload.x;
            storeState.formPosition.y = payload.y;
        },
        eventFormActive(storeState, payload) {
            storeState.eventFormActive = payload;
        },
        addEvent(storeState, payload) {
            storeState.events.push({
                title: payload,
                date: moment(storeState.activeDate),
            });
        },
        activeDate(storeState, payload) {
            storeState.activeDate = payload;
        },
    }
});