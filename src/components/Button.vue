<template>
	<button class="btn">
		<slot></slot>
	</button>
</template>

<script>
export default {
	props: ['openModal', 'closeModal'],
	data() {
		return {
			showModal: false
		};
	},
	methods: {}
};
</script>

<style></style>
