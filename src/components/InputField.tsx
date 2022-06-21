import React, { useRef, useState } from 'react';
import { TodosState } from '../context/Context';
import { AppContextInterface } from '../model';
import './styles.scss';

// interface Props {
// 	todo: string;
// 	setTodo: React.Dispatch<React.SetStateAction<string>>;
// 	handleAdd: (e: React.FormEvent) => void;
// }

const InputField = () => {
	const { dispatch } = TodosState() as AppContextInterface;
	// const { state, dispatch } = TodosState() as AppContextInterface;
	const [to, setTo] = useState<string>('');
	const handleAdd = (e: React.FormEvent, dispatch: React.Dispatch<any>) => {
		e.preventDefault();
		dispatch({
			type: 'add',
			payload: to,
		});
		setTo('');
	};
	const inputRef = useRef<HTMLInputElement>(null);

	return (
		<form
			className="input"
			onSubmit={(e) => {
				handleAdd(e, dispatch);
				inputRef.current?.blur();
			}}>
			<input
				ref={inputRef}
				type="text"
				value={to}
				onChange={(e) => setTo(e.target.value)}
				placeholder="Enter a task"
				className="input__box"
			/>

			<button
				type="submit"
				className="input__submit">
				Go
			</button>
		</form>
	);
};

export default InputField;
