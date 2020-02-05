import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import AddTodo from '../views/AddTodo.vue';

const routes = [
	{
		path: '/',
		name: 'Home',
		component: HomeView
	},
	{
		path: '/add',
		name: 'AddTodo',
		component: AddTodo
	}
];

const router = createRouter({
	history: createWebHistory(process.env.BASE_URL),
	routes
});

export default router;
