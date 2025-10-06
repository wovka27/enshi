export const throttle = (func: (...args: unknown[]) => void, delay: number) => {
  let lastCalled = 0;
  return (...args: unknown[]) => {
    const now = performance.now();
    if (now - lastCalled >= delay) {
      func(...args);
      lastCalled = now;
    }
  };
};
