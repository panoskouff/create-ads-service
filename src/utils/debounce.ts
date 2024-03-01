export function debounce<T extends any[], R>(
  fn: (...args: T) => R,
  delay: number = 250,
): (...args: T) => void {
  let timeout: ReturnType<typeof setTimeout>

  return (...args: T) => {
    clearTimeout(timeout)
    timeout = setTimeout(() => {
      fn(...args)
    }, delay)
  }
}
