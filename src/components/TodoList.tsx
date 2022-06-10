import React from 'react';
import { Droppable } from 'react-beautiful-dnd';
import { Todo } from '../model';
import SingleTodo from './SingleTodo';
import './styles.scss';

interface Props {
	todos: Todo[];
	setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
	completedTodos: Todo[];
	setCompletedTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
}

const TodoList: React.FC<Props> = ({ todos, setTodos, completedTodos, setCompletedTodos }) => {
	return (
		<div className="container">
			<Droppable droppableId="TodosList">
				{(provided, snapshot) => {
					return (
						<ul
							className={`todos ${snapshot.isDraggingOver ? 'dragactive' : ''}`}
							ref={provided.innerRef}
							{...provided.droppableProps}
						>
							<span className="todos__heading">Active Tasks</span>
							{todos?.map((todo, index) => (
								<SingleTodo
									index={index}
									todo={todo}
									key={todo.id}
									todos={todos}
									setTodos={setTodos}
									completedTodos={completedTodos}
									setCompletedTodos={setCompletedTodos}
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
									todos={completedTodos}
									setTodos={setCompletedTodos}
									remove={true}
									completedTodos={completedTodos}
									setCompletedTodos={setCompletedTodos}
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
