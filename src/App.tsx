// import { ReactNode } from "react"
import Counter from "./Counter";
import { CounterProvider } from "./context/CounterContext";
import { initState } from "./context/CounterContext";

function App() {
  // const displayCount = (num: number): ReactNode => {
  //   return (<>Current Count is: {num}</>)
  // }

  return (
    <>
      {/* <Counter displayCount={displayCount} /> */}
      <CounterProvider count={initState.count} text={initState.text}>
        <Counter>{(num: number) => <>Count is: {num}</>}</Counter>
      </CounterProvider>
    </>
  );
}

export default App;
