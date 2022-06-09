import React, { useEffect, useRef, useState } from 'react';
import { AiFillDelete, AiFillEdit } from 'react-icons/ai';
import { MdDone } from 'react-icons/md';
import { Todo } from '../model';
import './styles.scss';

type Props = {
	todo: Todo;
	todos: Todo[];
	setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
};

const SingleTodo: React.FC<Props> = ({ todo, todos, setTodos }) => {
	const [edit, setEdit] = useState<boolean>(false);
	const [editTodo, setEditTodo] = useState<string>(todo.todo);
	const inputRef = useRef<HTMLInputElement>(null);
	
	useEffect(() => {
		inputRef.current?.focus();
	}, [edit]);

	const handleDone = (id: number) => {
		setTodos(todos.map(todo => (todo.id === id ? { ...todo, isDone: !todo.isDone } : todo)));
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
		<li>
			<form className="todos__single" onSubmit={e => handleEdit(e, todo.id)}>
				{edit ? (
					<input
						type="text"
						className="todos__single--text"
						ref={inputRef}
						value={editTodo}
						onChange={e => setEditTodo(e.target.value)}
					/>
				) : (
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
				)}
				<div>
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
					<span className="icon" onClick={() => handleDelete(todo.id)}>
						<AiFillDelete />
					</span>
					<span className="icon" onClick={() => handleDone(todo.id)}>
						<MdDone />
					</span>
				</div>
			</form>
		</li>
	);
};

export default SingleTodo;
