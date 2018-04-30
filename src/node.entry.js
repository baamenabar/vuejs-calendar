
import vueCalendar from './entry.js';

export default function(context) {
	return vueCalendar(context.events);
}