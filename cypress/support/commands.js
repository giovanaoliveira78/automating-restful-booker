Cypress.Commands.add('auth', () => {
  cy.fixture('users').then((data) => {
    cy.api({
      method: 'POST',
      url: '/auth',
      headers: {
        'Content-Type': 'application/json'
      },
      body: data.userAuth
    }).then((response) => {
      return response.body.token
    })
  })
})

Cypress.Commands.add('getRamdomBookingId', () => {
  cy.auth().then((token) => {
    return cy.api({
      method: 'GET',
      url: '/booking',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      failOnStatusCode: false
    }).then((response) => {
      expect(response.status).to.eq(200)
      expect(response.body).to.be.an('array').and.not.be.empty

      const randomIndex = Math.floor(Math.random() * response.body.length)
      const bookingId = response.body[randomIndex].bookingid
      return bookingId
    })
  })
})