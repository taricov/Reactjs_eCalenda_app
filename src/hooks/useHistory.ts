import { useCallback, useState } from "react";

//value for the initial value, is either T or a function that returns T
type InitialValueType<T> = T | any | ((prev?: T) => T);

//the return value type it's an array with an element
//of type T, a setter for the element, two functions (undo and redo)
//the array of history and the current value
type ReturnValueType<T> = [
  T,
  (value: InitialValueType<T>) => void,
  () => void,
  () => void,
  InitialValueType<T>[],
  number
];

const useHistory: <T>(
  initialValue?: InitialValueType<T>
) => ReturnValueType<T> = <T>(initialValue?: InitialValueType<T>) => {
  const [state, _setState] = useState<T>(initialValue);
  const [history, setHistory] = useState<InitialValueType<T>[]>(
    initialValue !== undefined && initialValue !== null ? [initialValue] : []
  );
  const [pointer, setPointer] = useState<number>(
    initialValue !== undefined && initialValue !== null ? 0 : -1
  );

  const setState: (value: InitialValueType<T>) => void = useCallback(
    (value: InitialValueType<T>) => {
      let valueToAdd = value;
      if (typeof value === "function") {
        valueToAdd = (value as (prev?: T) => T)(state);
      }
      setHistory((prev) => [...prev.slice(0, pointer + 1), valueToAdd]);
      setPointer((prev) => prev + 1);
      _setState(value);
    },
    [setHistory, setPointer, _setState, state, pointer]
  );

  const undo: () => void = useCallback(() => {
    if (pointer <= 0) return;
    _setState(history[pointer - 1]);
    setPointer((prev) => prev - 1);
  }, [history, pointer, setPointer]);

  const redo: () => void = useCallback(() => {
    if (pointer + 1 >= history.length) return;
    _setState(history[pointer + 1]);
    setPointer((prev) => prev + 1);
  }, [pointer, history, setPointer]);

  return [state, setState, undo, redo, history, pointer];
};

export default useHistory;
