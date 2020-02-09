<template>
	<Loader />
	<div class="container mx-auto p-3.5 h-screen">
		<template v-if="todos.length">
			<TodosList :todosList="todos" />
		</template>
		<template v-else>
			<HelloApp :todosList="todos" />
		</template>
	</div>
</template>

<script>
import Loader from '@/components/Loader.vue';
import HelloApp from '@/components/HelloApp.vue';
import TodosList from '@/components/TodosList.vue';

export default {
	components: {
		Loader,
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
			.then((data) => {
				this.todos = data;
			})
			.catch((err) => console.log(err));

		console.log(this.todos);
	}
};
</script>

<style></style>
