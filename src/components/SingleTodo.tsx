import React, { useEffect, useRef, useState } from 'react';
import { Draggable } from 'react-beautiful-dnd';
import { AiFillDelete, AiFillEdit } from 'react-icons/ai';
import { MdDone } from 'react-icons/md';
import { Todo } from '../model';
import './styles.scss';

type Props = {
	todo: Todo;
	todos: Todo[];
	setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
	index: number;
	remove?: boolean;
	completedTodos: Todo[];
	setCompletedTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
};

const SingleTodo: React.FC<Props> = ({
	todo,
	todos,
	setTodos,
	index,
	remove,
	completedTodos,
	setCompletedTodos,
}) => {
	const [edit, setEdit] = useState<boolean>(false);
	const [editTodo, setEditTodo] = useState<string>(todo.todo);
	const inputRef = useRef<HTMLInputElement>(null);

	useEffect(() => {
		inputRef.current?.focus();
	}, [edit]);

	const handleDone = (id: number) => {
		setTodos(prevState => prevState.filter(todo => todo.id !== id));
		let newArr = completedTodos;
		newArr.push(todo);
		setCompletedTodos(newArr);
	};
	const handleDelete = (id: number) => {
		setTodos(prevState => prevState.filter(todo => todo.id !== id));
	};
	const handleEdit = (e: React.FormEvent | React.MouseEvent, id: number) => {
		e.preventDefault();
		setTodos(prevState =>
			prevState.map(todo => (todo.id === id ? { ...todo, todo: editTodo } : todo))
		);
		setEdit(false);
	};

	return (
		<Draggable draggableId={todo.id.toString()} index={index}>
			{(provided, snapshot) => (
				<li {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef}>
					<form
						className={`todos__single ${snapshot.isDragging ? 'drag' : ''}`}
						onSubmit={e => handleEdit(e, todo.id)}
					>
						{(() => {
							if (edit) {
								return (
									<input
										type="text"
										className="todos__single--text"
										ref={inputRef}
										value={editTodo}
										onChange={e => setEditTodo(e.target.value)}
									/>
								);
							} else if (!remove) {
								return (
									<span
										className={`todos__single--text ${todo.isDone ? 'strike' : ''}`}
										onClick={e => {
											if (!edit && !todo.isDone) {
												setEdit(!edit);
											}
										}}
									>
										{todo.todo}
									</span>
								);
							} else {
								return <span className="todos__single--text strike">{todo.todo}</span>;
							}
						})()}
						<div>
							{!remove ? (
								<>
									<span
										className="icon"
										onClick={e => {
											if (!edit && !todo.isDone) {
												setEdit(!edit);
											} else {
												handleEdit(e, todo.id);
											}
										}}
									>
										<AiFillEdit />
									</span>
									<span className="icon" onClick={() => handleDone(todo.id)}>
										<MdDone />
									</span>
								</>
							) : (
								''
							)}
							<span className="icon" onClick={() => handleDelete(todo.id)}>
								<AiFillDelete />
							</span>
						</div>
					</form>
				</li>
			)}
		</Draggable>
	);
};

export default SingleTodo;
