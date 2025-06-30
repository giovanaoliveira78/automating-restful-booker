import { faker } from '@faker-js/faker'
import { generateBookingDates } from '../support/utils'

let accessToken
let firstName, lastName, checkin, checkout, totalPrice

beforeEach(() => {
  cy.auth().then((token) => {
    accessToken = token
  })
  firstName = faker.person.firstName()
  lastName = faker.person.lastName()
  totalPrice = faker.number.int({ min: 100, max: 1000 })
  const dates = generateBookingDates()
  checkin = dates.checkin
  checkout = dates.checkout
})

describe('Create a booking', () => {
  it('should create a booking', () => {
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
      expect(response.body).to.have.property('bookingid').and.be.a('number')
      expect(response.body).to.have.property('booking').and.be.an('object')
      expect(response.body.booking.totalprice).to.be.within(100, 1000)
      expect(response.body.booking).to.have.property('bookingdates').and.be.an('object').and.not.be.empty
    })
  })
})

describe('Create a booking - Negative scenarios', () => {
  it('should fail to create a booking when the name is not provided', () => {
    cy.api({
      method: 'POST',
      url: '/booking',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`
      },
      body: {
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
      expect(response.status).to.eq(500)
    })
  })

  it('should fail to create a booking when the booking dates are not provided', () => {
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
        "bookingdates": {},
        "additionalneeds": "Breakfast"
      },
      failOnStatusCode: false
    }).then((response) => {
      expect(response.status).to.eq(500)
    })
  })
})