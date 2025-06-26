import { faker } from '@faker-js/faker'
import { generateBookingDates } from '../support/utils'
let accessToken

beforeEach(() => {
  cy.auth().then((token) => {
    accessToken = token
  })
})

describe('List and filter bookings', () => {
  const firstName = faker.person.firstName()
  const lastName = faker.person.lastName()
  const { checkin, checkout } = generateBookingDates()

  it('Should return a list of bookings', () => {
    cy.api({
      method: 'GET',
      url: '/booking',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`
      },
      failOnStatusCode: false
    }).then((response) => {
      expect(response.status).to.eq(200)
      expect(response.body).to.be.an('array').and.not.be.empty
    })
  })

  it('Should filter bookings by name', () => {
    cy.api({
      method: 'GET',
      url: `/booking?firstname=${firstName}&lastname=${lastName}`,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`
      },
      failOnStatusCode: false
    }).then((response) => {
      expect(response.status).to.eq(200)
    })
  })

  it('Should filter bookings by checkin date', () => {
    cy.api({
      method: 'GET',
      url: `/booking?checkin=${checkin}&checkout=${checkout}`,
      headers: {
        'Content-type': 'application/json',
        'Authorization': `Bearer ${accessToken}`
      },
      failOnStatusCode: false
    }).then((response) => {
      expect(response.status).to.eq(200)
    })
  })
})

describe('List and filter bookings - Negative scenarios', () => {
  it('Should fail to list bookings with invalid date parameters', () => {
    cy.api({
      method: 'GET',
      url: `/booking?checkin=invalidDate&checkout=invalidDate`,
      headers: {
        'Content-type': 'application/json',
        'Authorization': `Bearer ${accessToken}`
      },
      failOnStatusCode: false
    }).then((response) => {
      expect(response.status).to.eq(500)
    })
  })
})