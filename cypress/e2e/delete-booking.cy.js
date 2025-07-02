import { faker } from '@faker-js/faker'

let accessToken

beforeEach(() => {
  cy.auth().then((token) => {
    accessToken = token
  })
})

describe('Delete a booking', () => {
  it('should delete a booking', () => {
    cy.createBooking().then((bookingId) => {
      cy.api({
        method: 'DELETE',
        url: `${Cypress.config('baseUrl')}/booking/${bookingId}`,
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Cookie': `token=${accessToken}`
        },
        failOnStatusCode: false
      }).then((response) => {
        expect(response.status).to.eq(201)
      })
    })
  })
})

describe('Delete a booking - Negative scenarios', () => {
  it('hould fail to delete a booking when the booking ID does not exist', () => {
    const invalidId = faker.number.int({ min: 99999, max: 999999 })

    cy.api({
      method: 'DELETE',
      url: `${Cypress.config('baseUrl')}/booking/${invalidId}`,
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Cookie': `token=${accessToken}`
      },
      failOnStatusCode: false
    }).then((response) => {
      expect(response.status).to.eq(405)
    })
  })
})