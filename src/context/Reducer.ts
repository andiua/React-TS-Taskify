import { Todo, State } from '../model';
import { DropResult } from 'react-beautiful-dnd';

type Actions =
	| { type: 'add'; payload: string }
	| { type: 'remove'; payload: number }
	| { type: 'done'; payload: Todo }
	| { type: 'edit'; payload: Todo }
	| { type: 'drop&drag'; payload: DropResult };

// export const TodoReducer = (state: Todo[], action: Actions) => {
// 	switch (action.type) {
// 		case 'add':
// 			return [...state, { id: Date.now(), todo: action.payload, isDone: false }];
// 		case 'remove':
// 			return state.filter((todo) => todo.id !== action.payload);
// 		case 'done':
// 			return state.map((todo) => todo.id === action.payload ? {...todo, isDone: !todo.isDone} : todo);
// 		default:
// 			return state;
// 	 }
// };

export const TodoReducer = (state: State, action: Actions) => {
	console.log(action.payload);
	switch (action.type) {
		case 'add':
			return {
				...state,
				todos: [...state.todos, { id: Date.now(), todo: action.payload, isDone: false }],
			};
		case 'remove':
			return {
				...state,
				todos: state.todos.filter((todo) => todo.id !== action.payload),
				completedTodos: state.completedTodos.filter((todo) => todo.id !== action.payload),
			};
		case 'done':
			if (action.payload.isDone === false) {
				return {
					...state,
					todos: state.todos.filter((todo) => todo.id !== action.payload.id),
					completedTodos: [
						...state.completedTodos,
						{ ...action.payload, isDone: !action.payload.isDone },
					],
				};
			} else {
				return {
					...state,
					todos: [...state.todos, { ...action.payload, isDone: !action.payload.isDone }],
					completedTodos: state.completedTodos.filter((todo) => todo.id !== action.payload.id),
				};
			}
		case 'edit':
			return {
				...state,
				todos: state.todos.map((todo) =>
					todo.id === action.payload.id ? { ...todo, todo: action.payload.todo } : todo
				),
			};
		case 'drop&drag':
			const { source, destination } = action.payload;

			if (!destination) return state;

			if (destination.droppableId === source.droppableId && destination.index === source.index)
				return state;

			let add,
				active = state.todos,
				complete = state.completedTodos;

			if (source.droppableId === 'TodosList') {
				add = active[source.index];
				active.splice(source.index, 1);
			} else {
				add = complete[source.index];
				complete.splice(source.index, 1);
			}
			if (
				destination.droppableId !== source.droppableId ||
				source.droppableId !== destination.droppableId
			) {
				add.isDone = !add.isDone;
			}
			if (destination.droppableId === 'TodosList') {
				active.splice(destination.index, 0, add);
			} else {
				complete.splice(destination.index, 0, add);
			}
			console.log(complete);
			return {
				...state,
				todos: active,
				completedTodos: complete,
			};
		default:
			console.error(`Unhandled action type ${action}`);
			return state;
	}
};
