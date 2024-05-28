export const runFn = (fn, ...args) => {
  if (typeof fn === 'function') fn(...args)
}
