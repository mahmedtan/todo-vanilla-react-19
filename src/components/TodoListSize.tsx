import { use } from "react";
import { FontSizeContext } from "../App";

interface Props {}

function TodoListSize({}: Props) {
  const { size, increment, decrement } = use(FontSizeContext);

  return (
    <div className="flex items-center gap-4 mx-auto">
      <span>Font Size:</span>
      <button
        onClick={decrement}
        disabled={size === "text-sm"}
        className="bg-black hover:bg-slate-700 px-3 text-white disabled:opacity-50"
      >
        -
      </button>
      <span className="capitalize font-medium border px-2 py-0.5">
        {size.split("-")[1]}
      </span>

      <button
        onClick={increment}
        disabled={size === "text-xl"}
        className="bg-black hover:bg-slate-700 px-3 text-white disabled:opacity-50"
      >
        +
      </button>
    </div>
  );
}

export default TodoListSize;
