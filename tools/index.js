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

export const formatTime = (time, format) => {
  const [, weekDay, month, date, year, hour, minutes, second, timeZone] = new Date(time).toString().match(/(\w{3})\s(\w{3})\s(\d{2})\s(\d{4})\s(\d{2}):(\d{2}):(\d{2})\s(.*)/)
  return {
    weekDay,
    month,
    date,
    year,
    hour,
    minutes,
    second,
    timeZone
  }
}