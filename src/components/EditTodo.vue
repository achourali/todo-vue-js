<template>
	<Form :isEdit="true" :todo="todo" />
</template>

<script>
import Tag from '@/components/Tag.vue';

export default {
	props: ['id'],
	components: {
		Tag
	}
};
</script>

<style></style>
