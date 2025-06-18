describe('Create a booking', () => {
  let accessToken

  beforeEach(() => {
    cy.auth().then((token) => {
      accessToken = token
    })
  })

  it('Should create a booking', () => {
    cy.api({
      method: 'POST',
      url: '/booking',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`
      },
      body: {
        "firstname": "Jim",
        "lastname": "Brown",
        "totalprice": 111,
        "depositpaid": true,
        "bookingdates": {
          "checkin": "2018-01-01",
          "checkout": "2019-01-01"
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