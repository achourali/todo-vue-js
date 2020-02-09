import { createStore } from 'vuex';

export default createStore({
	state: {
		todos: [
			{
				title: 'fdgdfg',
				description: 'dfgfdgdf',
				complete: false,
				tags: ['work'],
				id: 1
			},
			{
				title: 'todo 2',
				description: 'test todo 2',
				complete: false,
				tags: ['work', 'familly'],
				id: 2
			},
			{
				title: 'todo 3',
				description: 'test todo 3',
				complete: false,
				tags: ['study', 'work'],
				id: 3
			}
		],
		showModal: false,
		filtersCurrentChoices: [],
		filterMessage: '',
		isEdit: false
	},
	getters: {
		filteredTodos: (state) => {
			if (!state.filtersCurrentChoices.length) {
				if (!state.filterMessage == '') {
					state.filterMessage = '';
				}
				return state.todos;
			}

			const currentArr = state.todos.filter((todo) =>
				state.filtersCurrentChoices.every((filter) => todo.tags.includes(filter))
			);

			if (!currentArr.length) {
				state.filterMessage = 'no result for the filter';
				return;
			}

			state.filterMessage = '';
			return currentArr;
		}
	},
	mutations: {
		OPEN_MODAL(state) {
			state.showModal = true;
			document.body.style.overflow = 'hidden';
		},
		CLOSE_MODAL(state) {
			state.showModal = false;
			document.body.style.overflow = 'auto';
		}
	},
	actions: {
		handleStatutModal({ commit, state }) {
			if (!state.showModal) {
				commit('OPEN_MODAL');
			} else {
				commit('CLOSE_MODAL');
			}
		}
	},
	modules: {}
});
