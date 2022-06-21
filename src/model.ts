export interface Todo {
	id: number;
	todo: string;
	isDone: boolean;
}
export type State = {
	todos: Todo[] | [];
	completedTodos: Todo[] | [];
};
export type AppContextInterface = {
	state: State;
	dispatch: React.Dispatch<any>;
};

