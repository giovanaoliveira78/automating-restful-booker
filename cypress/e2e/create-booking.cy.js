import { generateBookingBody } from '../support/utils'

let accessToken

beforeEach(() => {
  cy.auth().then((token) => {
    accessToken = token
  })
})

describe('Create a booking', () => {
  it('should create a booking', () => {
    cy.api({
      method: 'POST',
      url: `${Cypress.config('baseUrl')}/booking`,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`
      },
      body: generateBookingBody(),
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
      url: `${Cypress.config('baseUrl')}/booking`,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`
      },
      body: generateBookingBody({
        firstname: '',
        lastname: ''
      }),
      failOnStatusCode: false
    }).then((response) => {
      expect(response.status).to.eq(500)
    })
  })

  it('should fail to create a booking when the booking dates are not provided', () => {
    cy.api({
      method: 'POST',
      url: `${Cypress.config('baseUrl')}/booking`,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`
      },
      body: generateBookingBody({
        bookingdates: {}
      }),
      failOnStatusCode: false
    }).then((response) => {
      expect(response.status).to.eq(500)
    })
  })
})