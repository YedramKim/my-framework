import vue from 'vue';
import App from './components/App.vue';

new vue({
	render: (h) => h(App),
	el: '#app'
});