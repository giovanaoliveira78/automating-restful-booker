let accessToken

beforeEach(() => {
  cy.auth().then((token) => {
    accessToken = token
  })
})

describe('Get a booking by ID', () => {
  it('Should get a bokking by ID', () => {
    cy.api({
      method: 'GET',
      url: '/booking/1',
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