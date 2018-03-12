<template>
	<div class="vue-mario">
		<div
			class="mario"
			:class="{
				default: avatar === '',
				mexico: avatar === 'mexico',
				amiibo: avatar === 'amiibo',
				winter: avatar === 'winter'
			}"></div>
	</div>
</template>

<script>
	export default {
		name: 'vue-mario',
		props: {
			avatar: {
				type: String,
				default: 'winter'
			}
		},
		watch: {
			avatar (newVal, oldVal) {
				if (!this.avatarList.includes(newVal)) {
					this.avatar = oldVal;
				}
			}
		},
		data () {
			return {
				avatarList: ['', 'mexico', 'amiibo', 'winter']
			};
		}
	};
</script>

<style lang="less" scoped>
	.vue-mario {
		display: inline-block;
	}

	@keyframes mario-animation-default {
		0% {
			background-position: 0px 0px;
		}
		33.9% {
			background-position: 0px 0px;
		}
		34% {
			background-position: -36px 0px;
		}
		66.9% {
			background-position: -36px 0px;
		}
		67% {
			background-position: -72px 0px;
		}
		99.9% {
			background-position: -72px 0px;
		}
		100% {
			background-position: 0px 0px;
		}
	}

	@keyframes mario-animation-mexico {
		0% {
			background-position: 0px 0px;
		}
		33.9% {
			background-position: 0px 0px;
		}
		34% {
			background-position: -44px 0px;
		}
		66.9% {
			background-position: -44px 0px;
		}
		67% {
			background-position: -88px 0px;
		}
		99.9% {
			background-position: -88px 0px;
		}
		100% {
			background-position: 0px 0px;
		}
	}

	@keyframes mario-animation-amiibo {
		0% {
			background-position: 0px 0px;
		}
		33.9% {
			background-position: 0px 0px;
		}
		34% {
			background-position: -38px 0px;
		}
		66.9% {
			background-position: -38px 0px;
		}
		67% {
			background-position: -76px 0px;
		}
		99.9% {
			background-position: -76px 0px;
		}
		100% {
			background-position: 0px 0px;
		}
	}

	@keyframes mario-animation-winter {
		0% {
			background-position: 0px 0px;
		}
		33.9% {
			background-position: 0px 0px;
		}
		34% {
			background-position: -36px 0px;
		}
		66.9% {
			background-position: -36px 0px;
		}
		67% {
			background-position: -72px 0px;
		}
		99.9% {
			background-position: -72px 0px;
		}
		100% {
			background-position: 0px 0px;
		}
	}

	.mario {
		background-repeat: no-repeat;
		animation-duration: 0.2s;
		animation-iteration-count: infinite;

		display: inline-block;
		width: 36px;
		height: 64px;

		&.default {
			background-image: url(../../../img/top_mario_walk.png);
			animation-name: mario-animation-default;
		}

		&.mexico {
			width: 38px;
			height: 74px;

			background-image: url(../../../img/adventure_mario_walk.png);
			animation-name: mario-animation-mexico;
		}

		&.amiibo {
			width: 38px;
			height: 70px;

			background-image: url(../../../img/amiibo_mario_walk.png);
			animation-name: mario-animation-amiibo;
		}

		&.winter {
			width: 36px;
			height: 68px;

			background-image: url(../../../img/action_mario_walk.png);
			animation-name: mario-animation-winter;
		}
	}
</style>
