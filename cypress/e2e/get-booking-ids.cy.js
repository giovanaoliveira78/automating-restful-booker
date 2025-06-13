describe('Get a booking by id', () => {
  let accessToken;

  beforeEach(() => {
    cy.auth().then((token) => {
      accessToken = token
    })
  })

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