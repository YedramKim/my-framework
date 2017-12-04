<template>
	<div class="app" @click="increment">
		<vue-mario></vue-mario>
		<h1>Vue다 냥</h1>
		<ul class="links">
			<li>
				<router-link to="/">Home</router-link>
			</li>
			<li>
				<router-link to="/Foo">foo</router-link>
			</li>
			<li>
				<router-link to="/Bar">bar</router-link>
			</li>
		</ul>
		<router-view></router-view>
	</div>
</template>

<script>
	import Vue from 'vue';
	import { mapState, Store } from 'vuex';
	import subComponent from './sub-component.vue';
	import VueMario from './common/vue-mario.vue';

	export default {
		name: 'App',
		computed: {
			...mapState(['count'])
		},
		methods: {
			increment () {
				this.$store.commit('increment', 2, 1, 2);
			}
		},
		components: {
			subComponent,
			VueMario
		}
	};
</script>

<style lang="less" scoped>
	
</style>
