/**
 * counter variant №1
 */
const useCounter = () => {
  const counter = ref(0);

  const increment = () => {
    counter.value++
  };

  const decrement = () => {
    counter.value--;
  }

  const reset = () => {
    counter.value = 0
  };

  return { counter, increment, decrement, reset };
};

/**
 * counter variant №2
 */
const useCounter = (isNegativeValue: boolean = false) => {
  const counter = ref(0);

  const setCounter = (value: number) => {
    counter.value = isNegativeValue ? Math.max(0, value) : value;
  };

  const increment = () => {
    setCounter(counter.value + 1);
  };

  const decrement = () => {
    setCounter(counter.value - 1);
  };

  const reset = () => {
    setCounter(0);
  };

  return { counter, increment, decrement, reset };
};

/**
 * counter variant №3
 */
const useCounter = (defaultValue: number = 0, isNegativeValue: boolean = false) => {
  const counter = ref(defaultValue);

  const setCounter = (value: number) => {
    counter.value = isNegativeValue ? Math.max(0, value) : value;
  };

  const increment = () => {
    setCounter(counter.value + 1);
  };

  const decrement = () => {
    setCounter(counter.value - 1);
  };

  const reset = () => {
    setCounter(defaultValue);
  };

  return { counter, increment, decrement, reset };
};