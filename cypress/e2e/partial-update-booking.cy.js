import { faker } from '@faker-js/faker'

let accessToken
let bookingId
let firstName, lastName

beforeEach(() => {
  cy.auth().then((token) => {
    accessToken = token
  })

  firstName = faker.person.firstName()
  lastName = faker.person.lastName()
})
describe('Partial update a booking', () => {
  it('Should partial update a booking', () => {
    cy.getRamdomBookingId().then((id) => {
      bookingId = id

      cy.api({
        method: 'PATCH',
        url: `booking/${bookingId}`,
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