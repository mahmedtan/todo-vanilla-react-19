import { Ref } from "react";
import { useFormStatus } from "react-dom";

const TodoInput = ({ ref }: { ref: Ref<HTMLInputElement> }) => {
  const { pending, data } = useFormStatus();

  const todoValue = data?.get("todo") as string;

  return (
    <div className="flex gap-4">
      <input
        name="todo"
        type="text"
        disabled={pending}
        ref={ref}
        className="border disabled:opacity-50 focus:outline-none  focus:border-slate-500 px-2.5 py-1 w-full"
        placeholder="Add a new todo"
      />

      <button
        type="submit"
        disabled={pending}
        className={`bg-black hover:bg-slate-700 font-medium whitespace-nowrap text-white px-3 py-0.5 ${
          pending ? "cursor-not-allowed animate-pulse" : ""
        }`}
      >
        {pending ? "Adding..." : "Add Todo"}

        {todoValue}
      </button>
    </div>
  );
};

export default TodoInput;
