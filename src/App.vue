<template>
	<Loader />
	<div class="container p-3.5 h-screen">
		<router-view />
	</div>
</template>

<script>
import Loader from '@/components/Loader.vue';

export default {
	components: {
		Loader
	},
	data() {
		return {
			todos: []
		};
	}
};
</script>

<style></style>
