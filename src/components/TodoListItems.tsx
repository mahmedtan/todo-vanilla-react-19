import { Todo } from "./TodoList";

interface Props {
  todos: Todo[];
  toggleTodo: (id: string) => void;
  deleteTodo: (index: string) => void;
}

const TodoListItems = ({ todos, toggleTodo, deleteTodo }: Props) => {
  return (
    <ul className="flex flex-col gap-4">
      {todos.length ? (
        todos
          .toSorted((a, b) => (a.createdAt > b.createdAt ? 1 : -1))
          .toSorted((a, b) =>
            a.isComplete === b.isComplete ? 0 : a.isComplete ? 1 : -1
          )
          .map((todo) => (
            <li key={todo.id} className="flex items-center  gap-4">
              <input
                type="checkbox"
                checked={todo.isComplete}
                onChange={() => toggleTodo(todo.id)}
                className="w-4 h-4"
                name="toggle"
                id={`toggle-${todo.id}`}
              />
              <label
                htmlFor={`toggle-${todo.id}`}
                className={`text-lg ${
                  todo.isComplete ? "line-through" : ""
                } select-none`}
              >
                {todo.body}
              </label>

              <button
                onClick={() => deleteTodo(todo.id)}
                className={`bg-red-600 hover:bg-red-800 ml-auto text-white px-3 py-1`}
              >
                Delete
              </button>
            </li>
          ))
      ) : (
        <li className="text-gray-500">No todos yet.</li>
      )}
    </ul>
  );
};

export default TodoListItems;
