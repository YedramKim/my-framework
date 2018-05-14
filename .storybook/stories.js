import Vue from 'vue';

import {storiesOf} from '@storybook/vue';
import { action } from '@storybook/addon-actions';

import VueMario from '../assets/components/atoms/vue-mario/index.vue';

Vue.component('mario', VueMario);
storiesOf('marios', module)
	.add('super mario', () => '<mario></mario>')
	.add('mexico mario', () => ({
		template: '<vue-mario :avatar="\'mexico\'" @click="tap"></vue-mario>',
		// methods: {
		// 	tap: action('clicked')
		// },
		components: {
			VueMario
		}
	}))
	.add('winter mario', () => ({
		template: '<vue-mario :avatar="\'winter\'"></vue-mario>',
		components: {
			VueMario
		}
	}))
	.add('amiibo mario', () => ({
		template: '<vue-mario :avatar="\'amiibo\'"></vue-mario>',
		components: {
			VueMario
		}
	}));