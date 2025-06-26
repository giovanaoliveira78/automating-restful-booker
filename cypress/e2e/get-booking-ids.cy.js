describe('List and filter bookings', () => {
  let accessToken

  beforeEach(() => {
    cy.auth().then((token) => {
      accessToken = token
    })
  })
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

  it('Should filter bookings by checkin date', () => {
    cy.api({
      method: 'GET',
      url: '/booking?checkin=2014-03-13&checkout=2014-05-21',
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