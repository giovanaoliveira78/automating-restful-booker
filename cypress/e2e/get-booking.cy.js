import { faker } from '@faker-js/faker'
let accessToken

beforeEach(() => {
  cy.auth().then((token) => {
    accessToken = token
  })
})

describe('Get a booking by ID', () => {
  it('should fetch the booking ID dynamically', () => {
    cy.getRamdomBookingId().then((bookingId) => {
      cy.api({
        method: 'GET',
        url: `${Cypress.config('baseUrl')}/booking/${bookingId}`,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`
        },
        failOnStatusCode: false
      }).then((response) => {
        expect(response.status).to.eq(200)
        expect(response.body).to.have.property('firstname')
        expect(response.body.bookingdates).to.be.an('object')
      })
    })
  })
})

describe('Get a booking by ID - Negative scenarios', () => {
  it('should fail to fetch a non-existent booking ID', () => {
    const invalidId = faker.number.int({ min: 99999, max: 999999 })
    cy.api({
      method: 'GET',
      url: `${Cypress.config('baseUrl')}/booking/${invalidId}`,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`
      },
      failOnStatusCode: false
    }).then((response) => {
      expect(response.status).to.eq(404)
    })
  })
})