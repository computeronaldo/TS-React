import {
  createContext,
  useReducer,
  ChangeEvent,
  ReactElement,
  useCallback,
  useContext,
} from "react";

type StateType = {
  count: number;
  text: string;
};

export const initState: StateType = {
  count: 0,
  text: ``,
};

type ReducerAction = {
  type: REDUCER_ACTION_TYPE;
  payload?: string;
};

const enum REDUCER_ACTION_TYPE {
  INCREMENT,
  DECREMENT,
  NEW_INPUT,
}

const reducer = (state: StateType, action: ReducerAction): StateType => {
  switch (action.type) {
    case REDUCER_ACTION_TYPE.INCREMENT:
      return { ...state, count: state.count + 1 };
      break;
    case REDUCER_ACTION_TYPE.DECREMENT:
      return { ...state, count: state.count - 1 };
      break;
    case REDUCER_ACTION_TYPE.NEW_INPUT:
      return { ...state, text: action.payload ?? "" };
      break;
    default:
      throw new Error();
  }
};

const useCounterContext = (initState: StateType) => {
  const [state, dispatch] = useReducer(reducer, initState);

  const increment = useCallback(
    () => dispatch({ type: REDUCER_ACTION_TYPE.INCREMENT }),
    []
  );
  const decrement = useCallback(
    () => dispatch({ type: REDUCER_ACTION_TYPE.DECREMENT }),
    []
  );
  const handleTextInput = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    dispatch({ type: REDUCER_ACTION_TYPE.NEW_INPUT, payload: e.target.value });
  }, []);

  return { state, increment, decrement, handleTextInput };
};

type useCounterContextType = ReturnType<typeof useCounterContext>;

const initContextState: useCounterContextType = {
  state: initState,
  increment: () => {},
  decrement: () => {},
  handleTextInput: (e: ChangeEvent<HTMLInputElement>) => {},
};

export const CounterContext =
  createContext<useCounterContextType>(initContextState);

type ChildrenType = {
  children: ReactElement | ReactElement[] | null;
};

export const CounterProvider = ({
  children,
  ...initState
}: ChildrenType & StateType): ReactElement => {
  return (
    <CounterContext.Provider value={useCounterContext(initState)}>
      {children}
    </CounterContext.Provider>
  );
};

type UseCounterHookType = {
  count: number;
  increment: () => void;
  decrement: () => void;
};

export const useCounter = (): UseCounterHookType => {
  const {
    state: { count },
    increment,
    decrement,
  } = useContext(CounterContext);
  return { count, increment, decrement };
};

type UseCounterTextHookType = {
  text: string;
  handleTextInput: (e: ChangeEvent<HTMLInputElement>) => void;
};

export const useCounterText = (): UseCounterTextHookType => {
  const {
    state: { text },
    handleTextInput,
  } = useContext(CounterContext);
  return { text, handleTextInput };
};
