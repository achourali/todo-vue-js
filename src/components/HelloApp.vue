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
		<router-link to="/add" class="btn mb-12">Get Started</router-link>
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
		<Todo class="w-full" :todo="todo" />
	</div>
</template>

<script>
import Todo from '@/components/Todo.vue';

export default {
	name: 'HelloApp',
	components: {
		Todo
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
			color: null
		};
	},
	methods: {
		randomColor() {
			document.querySelectorAll('h1 span').forEach((letter) => {
				this.color = this.colors[Math.floor(Math.random() * this.colors.length)];
				letter.style.color = this.color;
			});
		}
	},
	mounted() {
		this.randomColor();
	}
};
</script>

<style></style>
