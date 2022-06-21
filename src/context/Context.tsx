import React, { createContext, useContext, useReducer } from 'react';
import { TodoReducer } from './Reducer';
import { AppContextInterface } from '../model';

type Props = {
	children: React.ReactNode;
};

const TodosList = createContext<AppContextInterface | null>(null);

const Context: React.FC<Props> = ({ children }) => {
	const [state, dispatch] = useReducer(TodoReducer, { todos: [], completedTodos: [] });
	return <TodosList.Provider value={{ state, dispatch }}>{children}</TodosList.Provider>;
};

export default Context;

export const TodosState = () => {
	return useContext(TodosList);
};
