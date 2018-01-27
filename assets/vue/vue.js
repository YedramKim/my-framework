import Vue from 'vue';
import store from './store';
import router from './vue-router';
import App from './components/App';

export default {
	store,
	router
};

new Vue({
	el: '#app',
	router,
	store,
	render: (h) => h(App)
});