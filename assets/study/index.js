// vue 애플리케이션 설정
import Vue from 'vue';
import store from '@asset/js/store/store';
import router from '@asset/js/router/router';
Vue.config.devtools = process.env.NODE_ENV !== 'production';

// vuetify 설정
import Vuetify from 'vuetify';
Vue.use(Vuetify);
import 'vuetify/dist/vuetify.min.css';

// 기본 설정
import '@asset/style/main.css';

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
	methods: {
		ab() {
			console.log('성공~~~');
		}
	},
	data() {
		return {
			a: 10
		};
	},
	render (h) { // eslint-disable-line
		return (<div>
			<h1c nativeOnClick={this.ab} color="gold">h1 gold</h1c>
			<h1c color="red">h1 red</h1c>
		</div>);
	}
});