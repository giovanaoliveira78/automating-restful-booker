import { faker } from '@faker-js/faker'
import { generateBookingBody } from '../support/utils'

let accessToken

beforeEach(() => {
  cy.auth().then((token) => {
    accessToken = token
  })
})

describe('Update a booking', () => {
  it('should update a booking', () => {
    cy.createBooking().then((bookingId) => {
      cy.api({
        method: 'PUT',
        url: `${Cypress.config('baseUrl')}/booking/${bookingId}`,
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Cookie': `token=${accessToken}`
        },
        body: generateBookingBody(),
        failOnStatusCode: false
      }).then((response) => {
        expect(response.status).to.eq(200)
      })
    })
  })
})

describe('Update a booking - Negative scenarios', () => {
  it('should fail to update a booking when the booking ID does not exist', () => {
    const invalidId = faker.number.int({ min: 99999, max: 999999 })

    cy.api({
      method: 'PUT',
      url: `${Cypress.config('baseUrl')}/booking/${invalidId}`,
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Cookie': `token=${accessToken}`
      },
      body: generateBookingBody(),
      failOnStatusCode: false
    }).then((response) => {
      expect(response.status).to.eq(405)
    })
  })

  it('should fail to update a booking when total price is not provided', () => {
    cy.createBooking().then((bookingId) => {
      cy.api({
        method: 'PUT',
        url: `${Cypress.config('baseUrl')}/booking/${bookingId}`,
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Cookie': `token=${accessToken}`
        },
        body: generateBookingBody({
          totalprice: true
        }),
        failOnStatusCode: false
      }).then((response) => {
        expect(response.status).to.eq(400)
      })
    })
  })

  it('should fail to update a booking when the booking dates are not provided', () => {
    cy.createBooking().then((bookingId) => {
      cy.api({
        method: 'PUT',
        url: `${Cypress.config('baseUrl')}/booking/${bookingId}`,
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Cookie': `token=${accessToken}`
        },
        body: generateBookingBody({
          bookingdates: {}
        }),
        failOnStatusCode: false
      }).then((response) => {
        expect(response.status).to.eq(400)
      })
    })
  })
})