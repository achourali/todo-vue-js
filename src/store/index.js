import { createStore } from 'vuex';

export default createStore({
	state: {
		todos: [],
		currentEditTodo: {},
		showFormModal: false,
		filtersCurrentChoices: [],
		filterMessage: '',
		isEdit: false
	},
	getters: {
		getTodos: (state) => state.todos,
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
		},
		getCurrentEditTodo: (state) => {
			let currentTodoInfo = {};
			currentTodoInfo = {
				isEdit: state.isEdit,
				currentEditTodo: state.currentEditTodo
			};

			return currentTodoInfo;
		}
	},
	mutations: {
		OPEN_FORM_MODAL(state) {
			state.showFormModal = true;
			document.body.style.overflow = 'hidden';
		},
		CLOSE_FORM_MODAL(state) {
			state.showFormModal = false;
			document.body.style.overflow = 'auto';
		},
		SET_CURRENT_EDIT_TODO(state, todo) {
			state.currentEditTodo = todo;
		},
		SET_TODOS_LIST(state, payload) {
			state.todos = payload;
		},
		ADD_TODO(state, payload) {
			state.todos.unshift(payload);
		},
		UPDATE_TODO(state, todo) {
			const todIndex = state.todos.findIndex((item) => item.id == todo.id);
			state.todos.splice(todIndex, 1, {
				id: todo.id,
				title: todo.title,
				completed: todo.completed,
				editing: todo.editing
			});
		},
		DELETE_TODO(state, todoToBeDeleted) {
			const todos = [...state.todos];
			const index = todos.findIndex((todo) => todo.id === todoToBeDeleted.id);
			todos.splice(index, 1);
			state.todos = todos;
		},
		GET_FILTER_CHOICE(state, filterName) {
			const tagsChoiceIndex = state.filtersCurrentChoices.findIndex((t) => t === filterName);

			if (tagsChoiceIndex === -1) {
				state.filtersCurrentChoices.push(filterName);
			} else {
				state.filtersCurrentChoices.splice(tagsChoiceIndex, 1);
			}
		}
	},
	actions: {
		async fetchTodo({ commit }) {
			try {
				const response = await fetch('http://localhost:3000/todos');
				const data = await response.json();
				commit('SET_TODOS_LIST', data);
			} catch (error) {
				console.log(error);
			}
		},
		async postTodo({ commit }, payload) {
			let postConfig = {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(payload)
			};
			try {
				const response = await fetch('http://localhost:3000/todos', postConfig);
				const data = await response.json();

				if (response.status === 201) {
					commit('CLOSE_FORM_MODAL');
				}
				commit('ADD_TODO', data);
			} catch (error) {
				console.log(error);
			}
		},
		async deleteTodo({ commit }, payload) {
			let deleteConfig = {
				method: 'DELETE'
			};
			try {
				const response = await fetch('http://localhost:3000/todos/' + payload.todoID, deleteConfig);
				const data = await response.json();
				commit('DELETE_TODO', data);
			} catch (error) {
				console.log(error);
			}
		},
		async updateComplete({ commit }, todoID) {
			let options = {
				method: 'PATCH',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					complete: !todoID.complete
				})
			};

			try {
				const response = await fetch('http://localhost:3000/todos/' + todoID.id, options);
				const data = await response.json();
			} catch (error) {
				console.log(error);
			}
		},
		async updateTodo({ commit, state }, payload) {
			let options = {
				method: 'PATCH',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					title: payload.todo.title,
					description: payload.todo.description,
					tags: payload.todo.tags,
					complete: payload.todo.complete
				})
			};

			try {
				const response = await fetch('http://localhost:3000/todos/' + payload.todoID, options);
				const data = await response.json();

				if (response.status === 200) {
					state.isEdit = false;
					commit('CLOSE_FORM_MODAL');
				}
			} catch (error) {
				console.log(error);
			}
		},
		handleFormStatusModal({ commit, state }, payload) {
			if (!state.showFormModal) {
				if (payload?.editTodoStatus) {
					state.isEdit = payload.editTodoStatus;
					state.currentEditTodo = payload.todo;
				}
				commit('OPEN_FORM_MODAL');
			} else {
				commit('CLOSE_FORM_MODAL');
			}
		}
	},
	modules: {}
});
