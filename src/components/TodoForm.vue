<template>
	<form @submit.prevent="handleSubmit" class="flex flex-col h-full">
		<div class="form-actions flex items-center justify-between">
			<a @click="closeModal" class="text-2xl">cancel</a>
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
			<ul class="tags-list flex flex-col md:flex-row gap-y-4 md:gap-x-2">
				<li
					v-for="(tag, index) in tagsData"
					:key="index"
					ref="items"
					@click="toggleTag(tag, index)"
					class="tags-item flex items-center gap-x-2 w-full py-1 px-3 rounded-lg"
				>
					<Tag :tagName="tag">
						<p>{{ tag }}</p>
					</Tag>
				</li>
			</ul>
		</div>
	</form>
	{{ tagsChoice }}
</template>

<script>
import Tag from '@/components/Tag.vue';
import Button from '@/components/Button.vue';

export default {
	name: 'Form',
	props: ['todosList', 'isEdit', 'closeModal'],
	components: {
		Tag,
		Button
	},
	data() {
		return {
			title: '',
			description: '',
			tagsData: ['work', 'study', 'entertainment', 'familly'],
			tagsChoice: [],
			isEdit: false
		};
	},
	methods: {
		handleSubmit() {
			let todo = {
				title: this.title,
				description: this.description,
				complete: false,
				tags: this.tagsChoice
			};

			fetch('http://localhost:3000/todos', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(todo)
			})
				.then(() => {
					if (!this.todosList.length) {
						setTimeout(() => {
							window.location.reload();
						}, 1000);
					}
					this.closeModal();
				})
				.catch((err) => {
					console.log(err);
				});
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
	}
	// mounted() {
	// 	if (this.isEdit) {
	// 		this.title = todo.title;
	// 		this.description = todo.description;
	// 		this.tags = todo.tags;

	// 		this.tagsChoice.some((tag, idx) => {
	// 			if (this.tagsData.includes(tag)) {
	// 				this.$refs.items[idx].classList.add('tag-active');
	// 			}
	// 		});
	// 	}
	// }
};
</script>

<style>
.tags-item {
	cursor: pointer;
}

.tags-item:hover {
	background: theme('colors.white-smoke');
}

.tag-active {
	background: theme('colors.white-smoke');
}
</style>
