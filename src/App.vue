<template>
	<Loader />
	<div class="container p-3.5 h-screen">
		<router-view />
	</div>
</template>

<script>
import Loader from '@/components/Loader.vue';
import HelloApp from '@/components/HelloApp.vue';

export default {
	components: {
		Loader,
		HelloApp
	},
	data() {
		return {
			todos: []
		};
	}
};
</script>

<style></style>
