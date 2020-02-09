<template>
	<div
		class="flex flex-wrap items-center justify-between gap-y-2 mb-10 -mx-3.5 p-3.5 sticky top-0"
		:class="{ isSticky: scrollPosition > 0 }"
	>
		<h2 class="font-semibold text-2xl">todo</h2>
		<PlusIcon class="h-7 w-7" @click="openModal" />
		<FilterNav :getFilters="getFiltersChoices" />
	</div>

	<template v-if="showModal">
		<div class="modal-overlay w-full h-full"></div>
		<div class="modal-form rounded-lg w-[600px] fixed top-2/4 left-2/4 p-5">
			<TodoForm :closeModal="closeModal" :class="{ isOpen: showModal }" :todosList="todos" />
		</div>
	</template>

	<ul class="todos-list flex flex-col gap-y-5">
		<p v-if="filterMessage !== ''" class="self-center uppercase font-semibold">{{ filterMessage }}</p>
		<li v-for="(todo, index) in filteredTodos" :key="index" class="todos-item">
			<Todo
				class="w-full"
				:todo="todo"
				@delete="handleDelete"
				@complete="handleComplete"
				:index="index"
			/>
		</li>
	</ul>
</template>

<script>
import { PlusIcon } from '@heroicons/vue/solid';
import Todo from '@/components/Todo.vue';
import FilterNav from '@/components/FilterNav.vue';
import TodoForm from '@/components/TodoForm.vue';

export default {
	name: 'TodoList',
	props: ['todosList'],
	components: {
		PlusIcon,
		TodoForm,
		Todo,
		FilterNav
	},
	data() {
		return {
			todos: [],
			filtersCurrentChoices: [],
			filterMessage: '',
			scrollPosition: null,
			showModal: false
		};
	},
	mounted() {
		this.todos = this.todosList;

		window.addEventListener('scroll', this.updateScroll);
	},
	methods: {
		openModal() {
			this.showModal = !this.showModal;
			document.body.style.overflow = 'hidden';
		},
		closeModal() {
			this.showModal = false;
			document.body.style.overflow = 'auto';
		},
		handleDelete(id) {
			// if (!(this.todos.length - 1)) {
			// 	this.$router.go();
			// }

			this.todos = this.todos.filter((todo) => {
				return todo.id !== id;
			});
		},
		handleComplete(id) {
			let t = this.todos.find((todo) => {
				return todo.id === id;
			});

			t.complete = !t.complete;
		},
		getFiltersChoices(filterName) {
			const tagsChoiceIndex = this.filtersCurrentChoices.findIndex((t) => t === filterName);

			if (tagsChoiceIndex === -1) {
				this.filtersCurrentChoices.push(filterName);
			} else {
				this.filtersCurrentChoices.splice(tagsChoiceIndex, 1);
			}
		},
		updateScroll() {
			this.scrollPosition = window.pageYOffset;
		}
	},
	computed: {
		filteredTodos() {
			if (!this.filtersCurrentChoices.length) {
				if (!this.filterMessage == '') {
					this.filterMessage = '';
				}
				return this.todos;
			}

			const currentArr = this.todos.filter((todo) =>
				this.filtersCurrentChoices.every((filter) => todo.tags.includes(filter))
			);

			if (!currentArr.length) {
				this.filterMessage = 'no result for the filter';
				return;
			}

			this.filterMessage = '';
			return currentArr;
		}
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
