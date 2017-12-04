<template>
	<div class="typescript-component">
		typescript
	</div>
</template>

<style lang="less" scoped>
	.typescript-component {
		display: block;
	}
</style>


<script lang="ts">
	import Vue from 'vue';
	import Component from 'vue-class-component';

	@component({
		template
	})
	export default class TypescriptComponent extends Vue {
		message:string = 'a'
	}
</script>
