<template>
	<div class="modal-overlay w-full h-full"></div>
	<div
		class="modal-form rounded-lg w-screen h-screen md:w-[600px] md:h-auto fixed top-2/4 left-2/4 p-5"
	>
		<form @submit.prevent="handleSubmit" class="flex flex-col h-full">
			<div class="form-actions flex items-center justify-between">
				<a @click="handleFormModal" class="text-2xl">cancel</a>
				<Button type="submit">Add</Button>
			</div>

			<div class="flex flex-col gap-y-10 mt-20 md:mt-10">
				<div class="input-box">
					<label class="input-label">Title</label>
					<input type="text" class="input-text p-3.5" v-model="title" placeholder="add title..." />
				</div>
				<div class="input-box">
					<label class="input-label">Description</label>
					<textarea
						type="text"
						class="input-text p-3.5 min-h-[110px]"
						v-model="description"
						placeholder="add description..."
					/>
				</div>
			</div>

			<div class="tags flex-col mt-10">
				<p class="input-label mb-2">Tags</p>
				<ul class="tags-list flex flex-wrap gap-y-4 md:gap-x-2">
					<li
						v-for="(tag, index) in tagsData"
						:key="index"
						ref="items"
						@click="toggleTag(tag, index)"
						class="tags-item flex items-center gap-x-2 w-full md:w-auto py-1 px-3 rounded-lg"
					>
						<Tag :tagName="tag">
							<p>{{ tag }}</p>
						</Tag>
					</li>
				</ul>
			</div>
		</form>
	</div>
</template>

<script>
import { mapGetters } from 'vuex';
import Tag from '@/components/Tag.vue';
import Button from '@/components/Button.vue';

export default {
	name: 'Form',
	components: {
		Tag,
		Button
	},
	data() {
		return {
			title: '',
			description: '',
			tagsChoice: [],
			complete: false,
			tagsData: ['work', 'study', 'entertainment', 'familly'],
			isEdit: false
		};
	},
	methods: {
		handleFormModal() {
			this.$store.dispatch('handleFormStatusModal');
		},
		handleSubmit() {
			let todo = {
				title: this.title,
				description: this.description,
				complete: this.complete,
				tags: this.tagsChoice
			};

			if (this.isEdit) {
				const { currentEditTodo } = this.getCurrentEditTodo;
				this.$store
					.dispatch('updateTodo', { todo: todo, todoID: currentEditTodo.id })
					.then((response) => {
						this.isEdit = false;
						this.complete = false;
						this.title = '';
						this.description = '';
						this.tagsChoice = [];
					});
			} else {
				this.$store.dispatch('postTodo', todo).then((response) => {
					this.isEdit = false;
					this.complete = false;
					this.title = '';
					this.description = '';
					this.tagsChoice = [];
				});
			}
		},
		toggleTag(tag, index) {
			const tagsChoiceIndex = this.tagsChoice.findIndex((t) => t === tag);

			if (tagsChoiceIndex === -1) {
				this.tagsChoice.push(tag);
			} else {
				this.tagsChoice.splice(tagsChoiceIndex, 1);
			}

			this.$refs.items[index].classList.toggle('tag-active');
		}
	},
	computed: {
		...mapGetters(['getCurrentEditTodo'])
	},
	mounted() {
		const { isEdit, currentEditTodo } = this.getCurrentEditTodo;
		this.isEdit = isEdit;
		if (this.isEdit) {
			this.title = currentEditTodo.title;
			this.description = currentEditTodo.description;
			this.tagsChoice = currentEditTodo.tags;
			this.complete = currentEditTodo.complete;
			this.tagsChoice.forEach((tag) => {
				const tagIndex = this.tagsData.findIndex((t) => t === tag);
				this.$refs.items[tagIndex].classList.toggle('tag-active');
			});
		}
	}
};
</script>

<style>
.modal-overlay {
	background: theme('colors.gray-light');
	opacity: 0.5;
	position: fixed;
	top: 0;
	left: 0;
	pointer-events: none;
}
.modal-form {
	background: theme('colors.white');
	transform: translate(-50%, -50%);
	z-index: 100;
}
.tags-item {
	flex: 0 auto;
	cursor: pointer;
}

.tags-item:hover {
	background: theme('colors.white-smoke');
}

.tag-active {
	background: theme('colors.white-smoke');
}
</style>
