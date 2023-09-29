import { ReactNode } from "react";
// import { CounterContext } from "./context/CounterContext";
import { useCounter, useCounterText } from "./context/CounterContext";

type ChildrenType = {
  children: (num: number) => ReactNode;
};

const Counter = ({ children }: ChildrenType) => {
  //   const [count, setCount] = useState<number>(1);
  //   const {state, increment, decrement, handleTextInput} = useContext(CounterContext);
  const { count, increment, decrement } = useCounter();
  const { text, handleTextInput } = useCounterText();

  return (
    <>
      <h1>{children(count)}</h1>
      <div>
        <button onClick={increment}>+</button>
        <button onClick={decrement}>-</button>
      </div>
      <input type="text" onChange={handleTextInput} />
      <div>{text}</div>
    </>
  );
};

// type PropsType = {
//   displayCount: (num: number) => ReactNode;
// };

// const Counter = ({ displayCount }: PropsType) => {
//   const [count, setCount] = useState<number>(1);

//   const increment = () => setCount((prev) => prev + 1);
//   const decrement = () => setCount((prev) => prev - 1);

//   return (
//     <>
//       <h1>{displayCount(count)}</h1>
//       <div>
//         <button onClick={increment}>+</button>
//         <button onClick={decrement}>-</button>
//       </div>
//     </>
//   );
// };

export default Counter;
