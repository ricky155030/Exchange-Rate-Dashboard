import { format, subDays, isWeekend } from 'date-fns'

export function getRecentlyBusinessDay() {
  let first = format(new Date(), 'yyyy-MM-dd')

  while(isWeekend(first)) {
    first = format(subDays(new Date(), 1), 'yyyy-MM-dd')
  }

  let second = format(subDays(first, 1), 'yyyy-MM-dd')

  while(isWeekend(second)) {
    first = format(subDays(new Date(), 1), 'yyyy-MM-dd')
  }

  return {
    first,
    second
  }
}
