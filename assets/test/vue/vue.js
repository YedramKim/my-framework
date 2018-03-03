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

import styled from 'vue-styled-components';
const h1 = styled('h1', {
	color: String
})`
	color: ${props => props.color};
`;

new Vue({
	el: '#app',
	router,
	store,
	components: {
		h1c: h1
	},
	render: (h) => h ? (<div>
		<h1c color="gold">h1 gold</h1c>
		<h1c color="red">h1 red</h1c>
	</div>) : ''
});