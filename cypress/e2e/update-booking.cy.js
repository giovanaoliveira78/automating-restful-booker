import { faker } from '@faker-js/faker'
import { generateBookingDates } from '../support/utils'

let accessToken
let bookingId
let firstName, lastName, checkin, checkout, totalPrice

beforeEach(() => {
  cy.auth().then((token) => {
    accessToken = token

    firstName = faker.person.firstName()
    lastName = faker.person.lastName()
    totalPrice = faker.number.int({ min: 100, max: 1000 })
    const dates = generateBookingDates()
    checkin = dates.checkin
    checkout = dates.checkout

    cy.api({
      method: 'POST',
      url: '/booking',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`
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

      bookingId = response.body.bookingid
    })
  })
})
describe('Update a booking', () => {
  it('Should update a booking', () => {
    cy.api({
      method: 'PUT',
      url: `booking/${bookingId}`,
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Cookie': `token=${accessToken}`
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
    })
  })
})

describe('Update a booking - Negative scenarios', () => {
  it('Should fail to update a booking when the booking ID is not provided', () => {
    const invalidId = faker.number.int({ min: 99999, max: 999999 })

    cy.api({
      method: 'PUT',
      url: `/booking/${invalidId}`,
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Cookie': `token=${accessToken}`
      },
      body: {
        firstname: firstName,
        lastname: lastName,
        totalprice: totalPrice,
        depositpaid: true,
        bookingdates: {},
        additionalneeds: 'Breakfast'
      },
      failOnStatusCode: false
    }).then((response) => {
      expect(response.status).to.eq(400)
    })
  })

  it('Should fail to update a booking when total price is not provided', () => {
    cy.api({
      method: 'PUT',
      url: `booking/${bookingId}`,
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Cookie': `token=${accessToken}`
      },
      body: {
        "firstname": firstName,
        "lastname": lastName,
        "depositpaid": true,
        "bookingdates": {
          checkin,
          checkout,
        },
        "additionalneeds": "Breakfast"
      },
      failOnStatusCode: false
    }).then((response) => {
      expect(response.status).to.eq(400)
    })
  })

  it('Should fail to update a booking when the booking dates are not provided', () => {
    cy.api({
      method: 'PUT',
      url: `/booking/${bookingId}`,
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Cookie': `token=${accessToken}`
      },
      body: {
        firstname: firstName,
        lastname: lastName,
        totalprice: totalPrice,
        depositpaid: true,
        bookingdates: {},
        additionalneeds: 'Breakfast'
      },
      failOnStatusCode: false
    }).then((response) => {
      expect(response.status).to.eq(400)
    })
  })
})