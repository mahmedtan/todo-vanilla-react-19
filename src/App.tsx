import { createContext, useState } from "react";
import TodoList from "./components/TodoList";

type FontSize = "text-sm" | "text-base" | "text-lg" | "text-xl";

export const FontSizeContext = createContext({
  size: "small" as FontSize,
  increment: () => {},
  decrement: () => {},
});

const App = () => {
  const [fontSizeValue, setFontSizeValue] = useState("text-base" as FontSize);

  return (
    <FontSizeContext
      value={{
        size: fontSizeValue,
        increment: () =>
          setFontSizeValue(
            fontSizeValue === "text-sm"
              ? "text-base"
              : fontSizeValue === "text-base"
              ? "text-lg"
              : "text-xl"
          ),

        decrement: () =>
          setFontSizeValue(
            fontSizeValue === "text-xl"
              ? "text-lg"
              : fontSizeValue === "text-lg"
              ? "text-base"
              : "text-sm"
          ),
      }}
    >
      <div
        className={`mx-auto bg-slate-100 flex  dark:bg-slate-800 p-8 h-screen  items-center justify-center
          ${fontSizeValue}`}
      >
        <TodoList />
      </div>
    </FontSizeContext>
  );
};

export default App;
