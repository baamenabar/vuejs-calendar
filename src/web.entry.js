import './style.scss';
import moment from 'moment-timezone';
moment.tz.setDefault('UTC');

const events = window.__INITIAL_EVENTS__.map(event => {
	return {
		title: event.title,
		date: moment(event.date),
	};
});

import vueCalendar from './entry.js';

vueCalendar(events).$mount('#app');