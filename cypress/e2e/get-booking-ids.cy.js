let accessToken;

beforeEach(() => {
  cy.auth().then((token) => {
    accessToken = token
  })
})

describe('Get a booking by id', () => {
  it('Should get a booking by id', () => {
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
})

describe('Filter bookings by name', () => {
  it('Should filter bookings by name', () => {
    cy.api({
      method: 'GET',
      url: '/booking?firstname=sally&lastname=brown',
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