<template>
	<Loader />
	<div class="container mx-auto p-3.5 h-screen">
		<template v-if="todosList.length">
			<TodosList />
		</template>
		<template v-else>
			<HelloApp />
		</template>

		<template v-if="showFormModal">
			<TodoForm :class="{ isOpen: showFormModal }" />
		</template>
	</div>
</template>

<script>
import { mapGetters, mapState } from 'vuex';
import TodoForm from '@/components/TodoForm.vue';
import Loader from '@/components/Loader.vue';
import HelloApp from '@/components/HelloApp.vue';
import TodosList from '@/components/TodosList.vue';

export default {
	components: {
		Loader,
		HelloApp,
		TodosList,
		TodoForm
	},
	mounted() {
		this.$store.dispatch('fetchTodo');
	},
	computed: {
		...mapState(['showFormModal']),
		...mapGetters({
			todosList: 'getTodos'
		})
	}
};
</script>

<style></style>
