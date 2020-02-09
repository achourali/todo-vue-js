<template>
	<div class="flex flex-col items-center justify-center h-full">
		<h1 class="text-5xl text-center">
			<span>t</span>
			<span>o</span>
			<span>d</span>
			<span>o</span>
		</h1>
		<p class="text-center py-10">
			Lorem ipsum dolor sit, amet consectetur adipisicing elit. Totam, sed quasi consequatur placeat
			aut molestias consequuntur veritatis.
		</p>
		<Button @click="openModal" class="mt-12">Get Started</Button>
		<div class="flex items-center">
			<div class="img-wrapper">
				<img src="@/assets/images/image-1.png" alt="" />
			</div>
			<div class="img-wrapper">
				<img src="@/assets/images/image-2.png" alt="" />
			</div>
			<div class="img-wrapper">
				<img src="@/assets/images/image-3.png" alt="" />
			</div>
		</div>
		<Todo class="w-[80%]" :todo="todo" />
	</div>

	<template v-if="showModal">
		<div class="modal-overlay w-full h-full"></div>
		<div class="modal-form rounded-lg w-[600px] fixed top-2/4 left-2/4 p-5">
			<TodoForm :closeModal="closeModal" :class="{ isOpen: showModal }" :todosList="todosList" />
		</div>
	</template>
</template>
<script>
import Todo from '@/components/Todo.vue';
import TodoForm from '@/components/TodoForm.vue';
import Button from '@/components/Button.vue';

export default {
	props: ['todosList'],
	name: 'HelloApp',
	components: {
		Todo,
		TodoForm,
		Button
	},
	data() {
		return {
			todo: {
				title: 'Download todo app',
				description: 'he first step for better life',
				complete: true,
				tags: ['work', 'study']
			},
			colors: ['#D2CEFF', '#FFCECE', '#D1E5F7', '#DAF2D6'],
			color: null,
			showModal: false
		};
	},
	methods: {
		randomColor() {
			document.querySelectorAll('h1 span').forEach((letter) => {
				this.color = this.colors[Math.floor(Math.random() * this.colors.length)];
				letter.style.color = this.color;
			});
		},
		openModal() {
			console.log('open modal child component');
			this.showModal = !this.showModal;
			document.body.style.overflow = 'hidden';
		},
		closeModal() {
			this.showModal = false;
			document.body.style.overflow = 'auto';
		}
	},
	mounted() {
		this.randomColor();
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
</style>
