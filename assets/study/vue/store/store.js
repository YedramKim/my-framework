import Vue from 'vue';
import Vuex, { Store } from 'vuex';

Vue.use(Vuex);
export default new Store({
	state: {
		count: 0
	},
	mutations: {
		increment (state, ...payloads) {
			console.log(payloads);
			state.count++;
		}
	}
});