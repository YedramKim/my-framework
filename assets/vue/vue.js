import Vue from 'vue';
import store from './store/store';
import router from './router/router';
import App from './components/common/ts';

Vue.config.devtools = process.env.NODE_ENV !== 'production';
new Vue({
	el: '#app',
	router,
	store,
	render: (h) => h(App)
});