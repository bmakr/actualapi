export function nowInSeconds() {
  const now = Date.now()
  return Math.floor(now/1000)
}
