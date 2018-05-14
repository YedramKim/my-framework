import {configure} from '@storybook/vue';

import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

import mario from '../assets/components/atoms/vue-mario/index.vue';

function loadStories() {
	require('./stories');
}

configure(loadStories, module);