import React, { useEffect, useRef, useState } from 'react';
import { Draggable } from 'react-beautiful-dnd';
import { AiFillDelete, AiFillEdit } from 'react-icons/ai';
import { MdDone } from 'react-icons/md';
import { TodosState } from '../context/Context';
import { AppContextInterface, Todo } from '../model';
import './styles.scss';

type Props = {
	todo: Todo;
	index: number;
	remove?: boolean;
};

const SingleTodo: React.FC<Props> = ({ todo, index, remove }) => {
	const { dispatch } = TodosState() as AppContextInterface;
	const [edit, setEdit] = useState<boolean>(false);
	const [editTodo, setEditTodo] = useState<string>(todo.todo);
	const inputRef = useRef<HTMLInputElement>(null);

	useEffect(() => {
		inputRef.current?.focus();
	}, [edit]);

	const handleDone = (id: number) => {
		dispatch({
			type: 'done',
			payload: todo,
		});
	};
	const handleDelete = (id: number) => {
		dispatch({
			type: 'remove',
			payload: id,
		});
	};
	const handleEdit = (e: React.FormEvent | React.MouseEvent) => {
		e.preventDefault();
		todo.todo = editTodo;
		dispatch({
			type: 'edit',
			payload: todo,
		});
		setEdit(false);
	};

	return (
		<Draggable
			draggableId={todo.id.toString()}
			index={index}>
			{(provided, snapshot) => (
				<li
					{...provided.draggableProps}
					{...provided.dragHandleProps}
					ref={provided.innerRef}>
					<form
						className={`todos__single ${snapshot.isDragging ? 'drag' : ''}`}
						onSubmit={(e) => handleEdit(e)}>
						{(() => {
							if (edit) {
								return (
									<input
										type="text"
										className="todos__single--text"
										ref={inputRef}
										value={editTodo}
										onBlur={(e) => handleEdit(e)}
										onChange={(e) => setEditTodo(e.target.value)}
									/>
								);
							} else if (!todo.isDone) {
								return (
									<span
										className={`todos__single--text ${todo.isDone ? 'strike' : ''}`}
										onClick={(e) => {
											if (!edit && !todo.isDone) {
												setEdit(!edit);
											}
										}}>
										{todo.todo}
									</span>
								);
							} else {
								return <span className="todos__single--text strike">{todo.todo}</span>;
							}
						})()}
						<div>
							{!todo.isDone ? (
								<>
									<span
										className="icon"
										onClick={(e) => {
											if (!edit && !todo.isDone) {
												setEdit(!edit);
											} else {
												handleEdit(e);
											}
										}}>
										<AiFillEdit />
									</span>
								</>
							) : (
								''
							)}
							<span
								className="icon"
								onClick={() => handleDone(todo.id)}>
								<MdDone />
							</span>
							<span
								className="icon"
								onClick={() => handleDelete(todo.id)}>
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
