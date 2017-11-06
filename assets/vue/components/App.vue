<template>
	<div class="app" @click="increment">
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
	import { mapState } from 'vuex';
	import subComponent from './sub-component.vue';

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
		mounted () {
			// console.log(this.$route);
			// console.log(this.$router);
		},
		components: {
			subComponent
		}
	};
</script>

<style lang="less" scoped>
	
</style>
