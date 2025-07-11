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

export function generateBookingBody({ firstname, lastname, totalprice, bookingdates } = {}) {
  const dates = generateBookingDates()
  const body = {
    firstname: faker.person.firstName(),
    lastname: faker.person.lastName(),
    totalprice: faker.number.int({ min: 100, max: 1000 }),
    depositpaid: true,
    bookingdates: {
      checkin: dates.checkin,
      checkout: dates.checkout
    },
    additionalneeds: getRandomMeal()
  }

  if (!firstname && firstname?.trim() === '') {
    delete body.firstname
  }

  if (!lastname && lastname?.trim() === '') {
    delete body.lastname
  }

  if (totalprice) {
    delete body.totalprice
  }

  if (bookingdates && Object.keys(bookingdates).length === 0) {
    delete body.bookingdates
  }

  return body
}

function getRandomMeal() {
  const meals = ['Breakfast', 'Lunch', 'Dinner']
  return meals[Math.floor(Math.random() * meals.length)]
}