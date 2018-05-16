// vue 애플리케이션 설정
import Vue from 'vue';
import createStore from './js/store/store';
import createRouter from './js/router/router';
Vue.config.devtools = process.env.NODE_ENV !== 'production';

// vuetify 설정
import Vuetify from 'vuetify';
Vue.use(Vuetify);
import 'vuetify/dist/vuetify.min.css';

// 기본 설정
import './style/main.css';
import liveCoding from './components/atoms/live-coding.vue';

export default () => {
	const store = createStore();
	const router = createRouter();
	return {
		app: new Vue({
			store,
			router,
			render: h => h(liveCoding)
		}),
		store,
		router
	};
};