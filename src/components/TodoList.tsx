import React from 'react';
import { Droppable } from 'react-beautiful-dnd';
import { TodosState } from '../context/Context';
import { AppContextInterface } from '../model';
import SingleTodo from './SingleTodo';
import './styles.scss';


const TodoList: React.FC = () => {
	const { state: {todos, completedTodos} } = TodosState() as AppContextInterface; 
	return (
		<div className="container">
			<Droppable droppableId="TodosList">
				{(provided, snapshot) => {
					return (
						<ul
							className={`todos ${snapshot.isDraggingOver ? 'dragactive' : ''}`}
							ref={provided.innerRef}
							{...provided.droppableProps}>
							<span className="todos__heading">Active Tasks</span>
							{todos?.map((todo, index) => (
								<SingleTodo
									index={index}
									todo={todo}
									key={todo.id}
								/>
							))}
							{provided.placeholder}
						</ul>
					);
				}}
			</Droppable>

			<Droppable droppableId="TodosRemove">
				{(provided, snapshot) => {
					return (
						<ul
							className={`todos remove ${snapshot.isDraggingOver ? 'dragcomplete' : ''}`}
							ref={provided.innerRef}
							{...provided.droppableProps}
						>
							<span className="todos__heading">Completed Tasks</span>
							{completedTodos?.map((todo, index) => (
								<SingleTodo
									index={index}
									todo={todo}
									key={todo.id}
								/>
							))}
							{provided.placeholder}
						</ul>
					);
				}}
			</Droppable>
		</div>
	);
};

export default TodoList;
