let accessToken

beforeEach(() => {
  cy.auth().then((token) => {
    accessToken = token
  })
})

describe('Get a booking by ID', () => {
  it('Should fetch the booking ID dynamically', () => {
    cy.getRamdomBookingId().then((bookingId) => {
      cy.log(bookingId),
        cy.api({
          method: 'GET',
          url: `/booking/${bookingId}`,
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`
          },
          failOnStatusCode: false
        }).then((response) => {
          expect(response.status).to.eq(200)
        })
    })
  })
})