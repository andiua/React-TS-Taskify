export interface Todo {
	id: number;
	todo: string;
	isDone: boolean;
}
export type AppContextInterface = {
	state: Todo[];
	dispatch: React.Dispatch<any>;
};