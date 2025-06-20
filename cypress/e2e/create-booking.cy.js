import { faker } from '@faker-js/faker'
import { generateBookingDates } from '../support/utils'

describe('Create a booking', () => {
  let accessToken

  beforeEach(() => {
    cy.auth().then((token) => {
      accessToken = token
    })
  })

  it('Should create a booking', () => {
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
      expect(response.body).to.have.property('bookingid').and.be.a('number')
      expect(response.body).to.have.property('booking').and.be.an('object')
      expect(response.body.booking).to.have.property('bookingdates').and.be.an('object').and.not.be.empty
    })
  })
})