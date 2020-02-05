<template>
	<div v-if="!isLoading">
		<div class="h-screen w-screen fixed top-0 z-10 flex justify-center items-center">
			<h1 class="text-3xl">TODO</h1>
		</div>
	</div>
</template>

<script>
export default {
	name: 'Loader',
	data() {
		return {
			isLoading: false
		};
	},
	mounted() {
		setTimeout(() => {
			this.isLoading = true;
		}, 2500);
	},
	unmounted() {
		this.isLoading = false;
	}
};
</script>

<style scoped>
div {
	background: theme('colors.milk');
	color: theme('colors.gray');
}

h1 {
	position: relative;
}
h1::before {
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	content: '';
	height: 3px;
	width: 0%;
	background: theme('colors.gray');
	animation: line 1s ease-in forwards 0.5s;
}

@keyframes line {
	from {
		width: 0%;
	}
	to {
		width: 120%;
	}
}
</style>
