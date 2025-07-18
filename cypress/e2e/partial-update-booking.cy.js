import { faker } from '@faker-js/faker'

let accessToken
let firstName, lastName

beforeEach(() => {
  cy.auth().then((token) => {
    accessToken = token
  })

  firstName = faker.person.firstName()
  lastName = faker.person.lastName()
})
describe('Partial update a booking', () => {
  it('should partial update a booking', () => {
    cy.getRamdomBookingId().then((bookingId) => {
      cy.api({
        method: 'PATCH',
        url: `${Cypress.config('baseUrl')}/booking/${bookingId}`,
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Cookie': `token=${accessToken}`
        },
        body: {
          "firstname": firstName,
          "lastname": lastName
        },
        failOnStatusCode: false
      }).then((response) => {
        expect(response.status).to.eq(200)
        expect(response.body).to.have.property('firstname').and.equal(firstName)
        expect(response.body).to.have.property('lastname').and.equal(lastName)
      })
    })
  })
})

describe('Partial update a booking - Negative scenarios', () => {
  it('should fail to partial update a booking when the booking ID does not exist', () => {
    const invalidId = faker.number.int({ min: 99999, max: 999999 })

    cy.api({
      method: 'PATCH',
      url: `${Cypress.config('baseUrl')}/booking/${invalidId}`,
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Cookie': `token=${accessToken}`
      },
      body: {
        "firstname": firstName,
        "lastname": lastName
      },
      failOnStatusCode: false
    }).then((response) => {
      expect(response.status).to.eq(405)
    })
  })
})