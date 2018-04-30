import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);

import moment from 'moment-timezone';
moment.tz.setDefault('UTC');

import Axios from 'axios';

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
        events: [],
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
            storeState.events.push(payload);
        },
        activeDate(storeState, payload) {
            storeState.activeDate = payload;
        },
    },
    actions: {
        addEvent(context, payload) {
            return new Promise((resolve, reject)=>{
                const evt = {
                    title: payload,
                    date: moment(context.state.activeDate),
                };
                Axios.post('/event',evt)
                .then((response)=>{
                    if(response.status==200){
                        context.commit('addEvent',evt);
                        resolve();
                    } else {
                        console.error('Got unexpected response from serever')
                        reject();
                    }
                })
            })
        }
    }
});