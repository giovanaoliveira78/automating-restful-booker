import { faker } from '@faker-js/faker'
import dayjs from 'dayjs'

export function generateBookingDates() {
  const checkInDate = faker.date.soon({ days: 5 })
  const stayLength = faker.number.int({ min: 1, max: 10 })
  const checkOutDate = dayjs(checkInDate).add(stayLength, 'day').toDate()

  return {
    checkin: dayjs(checkInDate).format('YYYY-MM-DD'),
    checkout: dayjs(checkOutDate).format('YYYY-MM-DD'),
  }
}