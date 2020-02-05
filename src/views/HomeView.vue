<template>
	<template v-if="todos.length">
		<TodosList :todosList="todos" />
	</template>
	<template v-else>
		<HelloApp />
	</template>
</template>

<script>
import HelloApp from '@/components/HelloApp.vue';
import TodosList from '@/components/TodosList.vue';

export default {
	name: 'HomeView',
	components: {
		HelloApp,
		TodosList
	},
	data() {
		return {
			todos: []
		};
	},
	mounted() {
		fetch('http://localhost:3000/todos')
			.then((res) => res.json())
			.then((data) => (this.todos = data))
			.catch((err) => console.log(err));
	}
};
</script>

<style></style>
