import { format, subDays, subHours, isWeekend } from 'date-fns'

export function getRecentlyBusinessDay() {
  let first = format(subHours(new Date(), 9), 'yyyy-MM-dd')

  while(isWeekend(first)) {
    first = format(subDays(first, 1), 'yyyy-MM-dd')
  }

  let second = format(subDays(first, 1), 'yyyy-MM-dd')

  while(isWeekend(second)) {
    second = format(subDays(second, 1), 'yyyy-MM-dd')
  }

  return {
    first,
    second
  }
}
