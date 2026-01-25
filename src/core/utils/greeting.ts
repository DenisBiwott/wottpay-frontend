export function getGreeting(name: string = '') {
  const now = new Date()
  const hour = now.getHours()
  const minute = now.getMinutes()

  // Standard greetings
  let timeGreeting = ''
  if (hour >= 5 && hour < 12) timeGreeting = 'Good morning'
  else if (hour >= 12 && hour < 17) timeGreeting = 'Good afternoon'
  else if (hour >= 17 && hour < 21) timeGreeting = 'Good evening'
  else timeGreeting = 'Good night'

  const isMidnightOil = hour === 2 && minute >= 50 && minute < 60
  if (isMidnightOil) {
    return `Rest, ${name} 👋`
  }

  // Combine everything
  return `${timeGreeting}, ${name} 👋`
}
