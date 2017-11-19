export const IsNightTime = () => {
  const hours = new Date().getHours()
  return hours >= 18 || hours <= 7
}
