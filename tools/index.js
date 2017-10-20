export const throttle = (fn, interval) => {
  let last = Date.now()
  return (...args) => {
    const now = Date.now()
    if (now - last > interval) {
      last = now
      return fn(...args)
    }
  }
}

export const debounce = (fn, delay) => {
  let timer
  return (...args) => {
    if (timer) {
      return
    } else if (!timer) {
      timer = setTimeout(() => {
        timer = null
        return fn(...args)
      }, delay)
    }
  }
}