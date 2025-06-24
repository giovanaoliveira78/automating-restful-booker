import { faker } from '@faker-js/faker'
import { generateBookingDates } from '../support/utils'

describe('Update a booking', () => {
  let accessToken
  let bookingId

  before(() => {
    cy.auth().then((token) => {
      accessToken = token

      const firstName = faker.person.firstName()
      const lastName = faker.person.lastName()
      const { checkin, checkout } = generateBookingDates()
      const totalPrice = faker.number.int({ min: 100, max: 1000 })

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

  it('Should update a booking', () => {
    const firstName = faker.person.firstName()
    const lastName = faker.person.lastName()
    const { checkin, checkout } = generateBookingDates()
    const totalPrice = faker.number.int({ min: 100, max: 1000 })

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
  let accessToken
  let bookingId

  beforeEach(() => {
    cy.auth().then((token) => {
      accessToken = token

      const firstName = faker.person.firstName()
      const lastName = faker.person.lastName()
      const { checkin, checkout } = generateBookingDates()
      const totalPrice = faker.number.int({ min: 100, max: 1000 })

      return cy.api({
        method: 'POST',
        url: '/booking',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`
        },
        body: {
          firstname: firstName,
          lastname: lastName,
          totalprice: totalPrice,
          depositpaid: true,
          bookingdates: { checkin, checkout },
          additionalneeds: 'Breakfast'
        },
        failOnStatusCode: false
      })
    }).then((response) => {
      bookingId = response.body.bookingid
    })
  })

  it('Should fail to update a booking when the booking ID is not provided', () => {
    const invalidId = faker.number.int({ min: 99999, max: 999999 })
    const firstName = faker.person.firstName()
    const lastName = faker.person.lastName()
    const totalPrice = faker.number.int({ min: 100, max: 1000 })

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
    const firstName = faker.person.firstName()
    const lastName = faker.person.lastName()
    const { checkin, checkout } = generateBookingDates()

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
    const firstName = faker.person.firstName()
    const lastName = faker.person.lastName()
    const totalPrice = faker.number.int({ min: 100, max: 1000 })

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