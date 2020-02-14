<template>
	<div
		class="flex flex-wrap items-center justify-between gap-y-2 mb-10 -mx-3.5 p-3.5 sticky top-0"
		:class="{ isSticky: scrollPosition > 0 }"
	>
		<h2 class="font-semibold text-2xl">todo</h2>
		<PlusIcon class="h-7 w-7" @click="handleFormModal" />
		<FilterNav />
	</div>

	<ul class="todos-list flex flex-col gap-y-5">
		<p v-if="filterMessage !== ''" class="self-center uppercase font-semibold">{{ filterMessage }}</p>
		<li v-for="(todo, index) in displayTodo" :key="index" class="todos-item">
			<Todo ref="todosRef" class="w-full" :todo="todo" :index="index" />
		</li>
	</ul>
</template>

<script>
import { mapState } from 'vuex';
import { PlusIcon } from '@heroicons/vue/solid';
import Todo from '@/components/Todo.vue';
import FilterNav from '@/components/FilterNav.vue';

export default {
	name: 'TodoList',
	components: {
		PlusIcon,
		Todo,
		FilterNav
	},
	data() {
		return {
			scrollPosition: null
		};
	},
	mounted() {
		window.addEventListener('scroll', this.updateScroll);
	},
	methods: {
		handleFormModal() {
			this.$store.dispatch('handleFormStatusModal');
		},
		updateScroll() {
			this.scrollPosition = window.pageYOffset;
		}
	},
	computed: {
		displayTodo() {
			return this.$store.getters.filteredTodos;
		},

		...mapState(['todos', 'filterMessage', 'filtersCurrentChoices'])
	}
};
</script>
<style scoped>
.isSticky {
	background: rgba(255, 249, 222, 1);
	box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
	backdrop-filter: blur(20px);
	-webkit-backdrop-filter: blur(20px);
	z-index: 99;
}
</style>
