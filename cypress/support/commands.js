import { faker } from '@faker-js/faker'
import { generateBookingDates } from '../support/utils'

Cypress.Commands.add('auth', () => {
  cy.fixture('users').then((data) => {
    cy.api({
      method: 'POST',
      url: `${Cypress.config('baseUrl')}/auth`,
      headers: {
        'Content-Type': 'application/json'
      },
      body: data.userAuth
    }).then((response) => {
      return response.body.token
    })
  })
})

Cypress.Commands.add('getRamdomBookingId', () => {
  cy.auth().then((token) => {
    return cy.api({
      method: 'GET',
      url: `${Cypress.config('baseUrl')}/booking`,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      failOnStatusCode: false
    }).then((response) => {
      expect(response.status).to.eq(200)
      expect(response.body).to.be.an('array').and.not.be.empty

      const randomIndex = Math.floor(Math.random() * response.body.length)
      const bookingId = response.body[randomIndex].bookingid
      return bookingId
    })
  })
})

Cypress.Commands.add('createBooking', () => {
  const firstName = faker.person.firstName()
  const lastName = faker.person.lastName()
  const totalPrice = faker.number.int({ min: 100, max: 1000 })
  const dates = generateBookingDates()
  const checkin = dates.checkin
  const checkout = dates.checkout

  return cy.auth().then((token) => {
    cy.api({
      method: 'POST',
      url: `${Cypress.config('baseUrl')}/booking`,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: {
        "firstname": firstName,
        "lastname": lastName,
        "totalprice": totalPrice,
        "depositpaid": true,
        "bookingdates": {
          checkin,
          checkout,
        },
        "additionalneeds": "Breakfast"
      },
      failOnStatusCode: false
    }).then((response) => {
      expect(response.status).to.eq(200)

      return response.body.bookingid
    })
  })
})