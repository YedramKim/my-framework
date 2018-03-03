// vue 애플리케이션 설정
import Vue from 'vue';
import store from '@/vue/store/store';
import router from '@/vue/router/router';
Vue.config.devtools = process.env.NODE_ENV !== 'production';

// vuetify 설정
import Vuetify from 'vuetify';
Vue.use(Vuetify);
import 'vuetify/dist/vuetify.min.css';

// 기본 설정
import '@/style/main.css';

new Vue({
	el: '#app',
	router,
	store,
	render: (h) => h('div', null, 'a')
});