import {
  useState,
  useActionState,
  useOptimistic,
  useRef,
  useEffect,
} from "react";
import TodoInput from "./TodoInput";
import TodoListItems from "./TodoListItems";
import { generateId } from "../utils/helpers";
import TodoListSize from "./TodoListSize";

export interface Todo {
  body: string;
  isComplete: boolean;
  createdAt: Date;
  id: string;
}

const TodoList = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isBlurred] = useState(false);

  console.log(isBlurred);

  const [optimisticTodos, setOptimisticTodos] = useOptimistic<Todo[], Todo>(
    todos,
    (_oldData, newData) => _oldData.concat(newData)
  );

  const [error, addTodo] = useActionState(
    async (_error: string | null, formData: FormData) => {
      const todo = formData.get("todo") as string;

      const newTodo = {
        body: todo,
        isComplete: false,
        createdAt: new Date(),
        id: generateId(),
      };

      setOptimisticTodos({ ...newTodo, id: newTodo.id + "-optimistic" });

      await new Promise((resolve) => setTimeout(resolve, 1000));

      if (!todo) {
        return "Todo cannot be empty.";
      }

      if (todos.some((t) => t.body === todo)) {
        return "Todo already exists.";
      }

      setTodos([...todos, newTodo]);

      return null;
    },

    null
  );

  const deleteTodo = (id: string) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const toggleTodo = async (id: string) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, isComplete: !todo.isComplete } : todo
      )
    );
  };

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  return (
    <div className="flex flex-col gap-8 w-full max-w-xl">
      <div className="flex flex-col px-5  py-4  bg-white w-full border gap-8">
        <h1 className="text-2xl font-semibold">Todo List</h1>

        <form action={addTodo} className="flex flex-col gap-4">
          <TodoInput ref={inputRef} />

          {error && !isBlurred && <p className="text-red-500">{error}</p>}
        </form>

        <TodoListItems
          todos={optimisticTodos}
          toggleTodo={toggleTodo}
          deleteTodo={deleteTodo}
        />
      </div>
      <TodoListSize />
    </div>
  );
};

export default TodoList;
