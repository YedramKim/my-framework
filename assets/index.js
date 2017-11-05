import Vue from 'vue';
import Vuex from 'vuex';
import VueLibrary from './vue';
import App from './components/App.vue';
const {
	store
} = VueLibrary;

new Vue({
	render: (h) => h(App),
	store,
	el: '#app'
});