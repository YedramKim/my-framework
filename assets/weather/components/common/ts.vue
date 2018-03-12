<template>
	<h1>
		Hello, <span @click="onClick">typescript{{count}}</span>
	</h1>
</template>

<script lang="ts">
	import Vue from 'vue';
	import { mapState } from 'vuex';
	import Component from 'vue-class-component';

	@Component({
		name: 'ts',
		computed: {
			...mapState(['count'])
		}
	})
	export default class TsComponent extends Vue {
		count!: number;
		prop1: string = 'abc';
		onClick ():void {
			console.log(this.prop1);
		}
	};
</script>

<style lang="less" scoped>
	h1 {
		color: gold;
		span {
			font-size: 1.5em;
		}
	}
</style>
