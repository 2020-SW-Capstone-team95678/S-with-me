export function debounce(func, delay) {
  let inDebounce;
  return function(...args) {
    const context = this;
    if (inDebounce) {
      clearTimeout(inDebounce);
    }
    inDebounce = setTimeout(() => func.call(context, ...args), delay);
  };
}
