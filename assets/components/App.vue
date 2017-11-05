<template>
	<div class="app" @click="increment">
		개발 페이지라고 냥.ss <span>asas</span>
		<p>
			Vuex.store.count: <b>{{count}}</b>
		</p>
	</div>
</template>

<script>
	import { mapState } from 'vuex';

	export default {
		name: 'App',
		computed: {
			...mapState(['count'])
		},
		methods: {
			increment () {
				this.$store.commit('increment', 2, 1, 2);
			}
		}
	};
</script>

<style lang="less" scoped>
	.app {
		font-size: 30px;
		span {
			color: #f00;
			font-weight: bold;
		}
	}
</style>
