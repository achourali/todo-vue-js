<template>
	<div class="todo rounded-lg p-3.5" ref="todoStatus">
		<div class="todo_header flex items-center justify-between mb-2">
			<p class="todo_title font-semibold" :class="{ isComplete: todo.complete }">{{ todo.title }}</p>
			<div v-clickOutside="closeModal">
				<DotsHorizontalIcon class="h-5 w-5" @click="openModal" />
				<div class="todo_actions flex flex-col rounded-lg" v-if="showModal">
					<div class="px-3.5 py-2 border-b-2 flex items-center justify-between">
						<p>Edit</p>
						<PencilAltIcon class="h-5 w-5" />
					</div>
					<div class="px-3.5 py-2 flex items-center justify-between" @click="deleteTodo">
						<p>Delete</p>
						<TrashIcon class="h-5 w-5" />
					</div>
				</div>
			</div>
		</div>
		<p class="todo_desc" :class="{ isComplete: todo.complete }">{{ todo.description }}</p>
		<div class="todo_footer flex items-center justify-between mt-3">
			<div class="todo_footer_tags flex items-center justify-center gap-x-1">
				<template v-for="(tag, index) in todo.tags" :key="index">
					<Tag :tagName="tag" />
				</template>
			</div>
			<div class="checkox-box">
				<label :for="'checkbox' + index" class="checkbox-label">done</label>
				<input
					class="checkbox"
					type="checkbox"
					:id="'checkbox' + index"
					ref="todoInput"
					v-model="todo.complete"
					@click="toggleComplete"
				/>
			</div>
		</div>
	</div>
</template>

<script>
import { DotsHorizontalIcon, PencilAltIcon, TrashIcon } from '@heroicons/vue/solid';
import Tag from '@/components/Tag.vue';

const clickOutside = {
	mounted(el, binding) {
		el.clickOutsideEvent = (event) => {
			if (!(el === event.target || el.contains(event.target))) {
				binding.instance.closeModal();
			}
		};
		document.body.addEventListener('click', el.clickOutsideEvent);
	},
	unmounted(el) {
		document.body.removeEventListener('click', el.clickOutsideEvent);
	}
};

export default {
	name: 'Todo',
	props: ['todo', 'index'],
	components: {
		DotsHorizontalIcon,
		PencilAltIcon,
		TrashIcon,
		Tag
	},
	data() {
		return {
			showModal: false,
			uri: 'http://localhost:3000/todos/' + this.todo.id
		};
	},
	directives: {
		clickOutside
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
		deleteTodo() {
			fetch(this.uri, {
				method: 'DELETE'
			})
				.then(() => this.$emit('delete', this.todo.id))
				.catch((err) => console.log(err));
		},
		toggleComplete() {
			fetch(this.uri, {
				method: 'PATCH',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					complete: !this.todo.complete
				})
			})
				.then(() => {
					this.$emit('complete', this.todo.id);
				})
				.catch((err) => console.log(err));
		}
	},
	mounted() {
		if (this.$refs.todoInput.checked) {
			this.$refs.todoStatus.classList.add('isComplete');
		}
		return;
	}
};
</script>

<style scoped>
.todo {
	background: theme('colors.milk');
}

.todo_title.isComplete,
.todo_desc.isComplete {
	text-decoration: line-through !important;
}

.todo_header {
	position: relative;
}

.todo_title,
.todo_desc {
	color: theme('colors.gray-light');
}

.todo_actions {
	position: absolute;
	right: 0;
	bottom: -80px;
	background: theme('colors.white');
	width: 150px;
	box-shadow: 5px 5px 10px 1px theme('colors.shadow');
}

.todo_actions a {
	border-color: theme('colors.border');
}

.checkox-box .checkbox-label {
	padding-right: 0.5rem;
	font-size: 14px;
}
</style>
