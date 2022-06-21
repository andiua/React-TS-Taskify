import React from 'react';
import './App.css';
import InputField from './components/InputField';
import { AppContextInterface } from './model';
import TodoList from './components/TodoList';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';
import { TodosState } from './context/Context';


const App: React.FC = () => {
	const { dispatch } = TodosState() as AppContextInterface;

	const onDragEnd = (result: DropResult) => {


		dispatch({
			type: 'drop&drag',
			payload: result,
		});
	};

	return (
		<DragDropContext onDragEnd={onDragEnd}>
			<div className="App">
				<span className="heading">Taskify</span>
				<InputField
				/>
				<TodoList
				/>
			</div>
		</DragDropContext>
	);
};

export default App;
