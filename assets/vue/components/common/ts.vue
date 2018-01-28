<template>
	<h1>Hello, <span @click="onClick">typescript</span></h1>
</template>

<script lang="ts">
	import Vue from 'vue';
	import Component from 'vue-class-component';

	@Component({
		name: 'ts'
	})
	export default class TsComponent extends Vue {
		prop1: string = 'abc'
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
